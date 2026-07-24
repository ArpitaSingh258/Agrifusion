import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Cpu, Plus, QrCode, ShoppingBag } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Device {
  id: string;
  device_name: string;
  device_type: string;
  qr_code: string;
  status: string;
  registered_at: string;
}

interface FarmerDevicesProps {
  farmerId: string;
}

export const FarmerDevices = ({ farmerId }: FarmerDevicesProps) => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [addDeviceOpen, setAddDeviceOpen] = useState(false);
  const [qrScanOpen, setQrScanOpen] = useState(false);
  const [deviceName, setDeviceName] = useState("");
  const [deviceType, setDeviceType] = useState("");
  const [qrCode, setQrCode] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    loadDevices();
  }, [farmerId]);

  const loadDevices = async () => {
    try {
      const { data, error } = await supabase
        .from("devices")
        .select("*")
        .eq("farmer_id", farmerId)
        .order("registered_at", { ascending: false });

      if (error) throw error;
      setDevices(data || []);
    } catch (error) {
      toast({
        title: "Error loading devices",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddDevice = async () => {
    if (!deviceName || !deviceType || !qrCode) {
      toast({
        title: "Please fill all fields",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase.from("devices").insert({
        farmer_id: farmerId,
        device_name: deviceName,
        device_type: deviceType,
        qr_code: qrCode,
        status: "active",
      });

      if (error) throw error;

      toast({
        title: "Device added successfully!",
      });
      setAddDeviceOpen(false);
      setDeviceName("");
      setDeviceType("");
      setQrCode("");
      loadDevices();
    } catch (error: any) {
      toast({
        title: "Error adding device",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleQRScan = () => {
    // Simulate QR code scan
    const mockQR = `QR-${Date.now()}`;
    setQrCode(mockQR);
    setQrScanOpen(false);
    toast({
      title: "QR Code Scanned!",
      description: `Code: ${mockQR}`,
    });
  };

  if (loading) {
    return <div className="text-center py-8">Loading devices...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>IoT Devices</CardTitle>
              <CardDescription>Manage your registered devices</CardDescription>
            </div>
            <div className="flex gap-2">
              <Dialog open={qrScanOpen} onOpenChange={setQrScanOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <QrCode className="w-4 h-4 mr-2" />
                    Scan QR
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Scan Device QR Code</DialogTitle>
                    <DialogDescription>
                      Position the QR code within the frame
                    </DialogDescription>
                  </DialogHeader>
                  <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
                    <div className="text-center">
                      <QrCode className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-4">QR Scanner Placeholder</p>
                      <Button onClick={handleQRScan}>Simulate Scan</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog open={addDeviceOpen} onOpenChange={setAddDeviceOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Device
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Device</DialogTitle>
                    <DialogDescription>Register a new IoT device</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Device Name</Label>
                      <Input
                        value={deviceName}
                        onChange={(e) => setDeviceName(e.target.value)}
                        placeholder="e.g., Soil Sensor A"
                      />
                    </div>
                    <div>
                      <Label>Device Type</Label>
                      <Input
                        value={deviceType}
                        onChange={(e) => setDeviceType(e.target.value)}
                        placeholder="e.g., Soil Moisture Sensor"
                      />
                    </div>
                    <div>
                      <Label>QR Code</Label>
                      <Input
                        value={qrCode}
                        onChange={(e) => setQrCode(e.target.value)}
                        placeholder="Enter or scan QR code"
                      />
                    </div>
                    <Button onClick={handleAddDevice} className="w-full">
                      Add Device
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {devices.length === 0 ? (
            <div className="text-center py-12">
              <Cpu className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground mb-4">No devices registered yet</p>
              <Button onClick={() => setAddDeviceOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Device
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {devices.map((device) => (
                <Card key={device.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <Cpu className="w-8 h-8 text-primary" />
                      <Badge variant={device.status === "active" ? "default" : "secondary"}>
                        {device.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{device.device_name}</CardTitle>
                    <CardDescription>{device.device_type}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground">QR: {device.qr_code}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Registered: {new Date(device.registered_at).toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Device Store</CardTitle>
          <CardDescription>Purchase IoT device sets for your farm</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { name: "Starter Kit", price: "₹15,000", items: "2 Sensors + Gateway" },
              { name: "Pro Kit", price: "₹35,000", items: "5 Sensors + Gateway + Camera" },
              { name: "Enterprise Kit", price: "₹75,000", items: "10 Sensors + 2 Gateways + Drone" },
            ].map((kit, idx) => (
              <Card key={idx} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{kit.name}</CardTitle>
                  <CardDescription>{kit.items}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-primary mb-4">{kit.price}</p>
                  <Button className="w-full">
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Buy Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
