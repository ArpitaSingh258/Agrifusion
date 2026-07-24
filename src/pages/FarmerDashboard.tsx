import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navbar } from "@/components/Navbar";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { ProfileModal } from "@/components/ProfileModal";
import { User, Cpu, Store, Activity, Brain, Leaf, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { authService, Profile } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { FarmerProfile } from "@/components/farmer/FarmerProfile";
import { FarmerDevices } from "@/components/farmer/FarmerDevices";
import { FarmerMarketplace } from "@/components/farmer/FarmerMarketplace";
import { ComingSoon } from "@/components/ComingSoon";

const FarmerDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [showProfileModal, setShowProfileModal] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate("/auth");
        return;
      }

      const userProfile = await authService.getProfile(data.session.user.id);
      if (!userProfile) {
        navigate("/auth");
        return;
      }

      if (userProfile.role !== "farmer") {
        navigate(`/${userProfile.role}`);
        return;
      }

      setProfile(userProfile);
      setShowProfileModal(!userProfile.profile_completed);
    } catch (error) {
      toast({
        title: "Error loading profile",
        variant: "destructive",
      });
      navigate("/auth");
    } finally {
      setLoading(false);
    }
  };

  if (loading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated userName={profile.full_name || profile.email} />
      <ChatbotWidget />

      <ProfileModal
        open={showProfileModal}
        profile={profile}
        onComplete={() => {
          setShowProfileModal(false);
          checkAuth();
        }}
      />

      <div className="container mx-auto px-4 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-foreground mb-2">Farmer Dashboard</h1>
          <p className="text-muted-foreground">Manage your farm, devices, and marketplace</p>
        </motion.div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-7 mb-8">
            <TabsTrigger value="profile">
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="devices">
              <Cpu className="w-4 h-4 mr-2" />
              Devices
            </TabsTrigger>
            <TabsTrigger value="marketplace">
              <Store className="w-4 h-4 mr-2" />
              Marketplace
            </TabsTrigger>
            <TabsTrigger value="iot">
              <Activity className="w-4 h-4 mr-2" />
              IoT Data
            </TabsTrigger>
            <TabsTrigger value="ai">
              <Brain className="w-4 h-4 mr-2" />
              AI Advisory
            </TabsTrigger>
            <TabsTrigger value="traceability">
              <Leaf className="w-4 h-4 mr-2" />
              Traceability
            </TabsTrigger>
            <TabsTrigger value="carbon">
              <DollarSign className="w-4 h-4 mr-2" />
              Carbon Credits
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <FarmerProfile profile={profile} onUpdate={checkAuth} />
          </TabsContent>

          <TabsContent value="devices">
            <FarmerDevices farmerId={profile.user_id} />
          </TabsContent>

          <TabsContent value="marketplace">
            <FarmerMarketplace farmerId={profile.user_id} />
          </TabsContent>

          <TabsContent value="iot">
            <ComingSoon
              title="IoT Live Data"
              description="Real-time sensor data from your connected devices"
              phase={2}
            />
          </TabsContent>

          <TabsContent value="ai">
            <ComingSoon
              title="AI Advisory"
              description="Personalized farming recommendations powered by AI"
              phase={2}
            />
          </TabsContent>

          <TabsContent value="traceability">
            <ComingSoon
              title="Blockchain Traceability"
              description="Track your produce from farm to table"
              phase={3}
            />
          </TabsContent>

          <TabsContent value="carbon">
            <ComingSoon
              title="Carbon Credits"
              description="Earn and trade carbon credits for sustainable farming"
              phase={3}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FarmerDashboard;
