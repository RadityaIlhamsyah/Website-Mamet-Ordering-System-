import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Settings</h2>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Store Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="store-name">Store Name</Label>
              <Input id="store-name" defaultValue="Warkop Digital" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" defaultValue="Jl. Kopi No. 123, Jakarta" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" defaultValue="+62 812 3456 7890" />
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Store Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Accepting Orders</Label>
                <p className="text-sm text-muted-foreground">
                  Turn off to stop receiving new orders temporarily
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto-print Receipts</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically print receipt when order is confirmed
                </p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
