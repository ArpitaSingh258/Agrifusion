import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authService, Profile, UserRole } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

interface ProfileModalProps {
  open: boolean;
  profile: Profile;
  onComplete: () => void;
}

export const ProfileModal = ({ open, profile, onComplete }: ProfileModalProps) => {
  const [fullName, setFullName] = useState(profile.full_name || "");
  const [phone, setPhone] = useState(profile.phone || "");
  const [location, setLocation] = useState(profile.location || "");
  const [cropType, setCropType] = useState(profile.crop_type || "");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!fullName || !phone) {
      toast({
        title: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    if (profile.role === "farmer" && !location) {
      toast({
        title: "Location is required for farmers",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      await authService.updateProfile(profile.user_id, {
        full_name: fullName,
        phone,
        location: location || undefined,
        crop_type: cropType || undefined,
        profile_completed: true,
      });

      toast({
        title: "Profile completed successfully!",
      });
      onComplete();
    } catch (error) {
      toast({
        title: "Error updating profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Complete Your Profile</DialogTitle>
          <DialogDescription>
            Please provide your details to continue using AgriFusion
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 XXXXXXXXXX"
            />
          </div>

          {profile.role === "farmer" && (
            <>
              <div>
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="City, State"
                />
              </div>

              <div>
                <Label htmlFor="cropType">Primary Crop Type</Label>
                <Input
                  id="cropType"
                  value={cropType}
                  onChange={(e) => setCropType(e.target.value)}
                  placeholder="e.g., Rice, Wheat, Vegetables"
                />
              </div>
            </>
          )}

          {profile.role === "buyer" && (
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City, State (Optional)"
              />
            </div>
          )}

          <Button onClick={handleSubmit} disabled={loading} className="w-full">
            {loading ? "Saving..." : "Complete Profile"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
