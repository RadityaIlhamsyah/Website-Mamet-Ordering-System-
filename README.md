# Setup Instructions

## Prerequisites

1. Node.js 18+ installed
2. MongoDB database (MongoDB Atlas recommended)

## Installation Steps

### 1. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 2. Setup Environment Variables

Create a `.env.local` file in the root directory:

\`\`\`bash
cp .env.local.example .env.local
\`\`\`

Then edit `.env.local` and add your values:

\`\`\`env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
\`\`\`

#### Getting MongoDB URI:

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account and cluster
3. Click "Connect" → "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database password
6. Replace `<dbname>` with `warkop`

Example:
\`\`\`
mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/warkop?retryWrites=true&w=majority
\`\`\`

#### JWT Secret:

Use any random string, for example:
\`\`\`
JWT_SECRET=my-super-secret-key-12345
\`\`\`

### 3. Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Default Admin Credentials

- **Username:** `admin`
- **Password:** `admin123`

Access admin panel at: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

## Troubleshooting

### Error: "Please add your MONGODB_URI to environment variables"

Make sure you have created `.env.local` file with the correct `MONGODB_URI` value.

### MongoDB Connection Failed

1. Check if your IP address is whitelisted in MongoDB Atlas
2. Verify the connection string is correct
3. Ensure your database user has proper permissions
