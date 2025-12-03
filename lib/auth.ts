import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const secret = new TextEncoder().encode(JWT_SECRET);

export interface SessionPayload {
  username: string;
  email: string;
  expiresAt: Date;
}

export async function createSession(username: string, email: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
  
  const token = await new SignJWT({ username, email })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret);

  const cookieStore = await cookies();
  cookieStore.set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });

  return token;
}

export async function verifySession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('session')?.value;

  if (!token) {
    return null;
  }

  try {
    const verified = await jwtVerify(token, secret);
    return {
      username: verified.payload.username as string,
      email: verified.payload.email as string,
      expiresAt: new Date((verified.payload.exp || 0) * 1000),
    };
  } catch (error) {
    console.error('[v0] Session verification failed:', error);
    return null;
  }
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
}
