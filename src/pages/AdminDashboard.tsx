import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navbar } from "@/components/Navbar";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { ComingSoon } from "@/components/ComingSoon";
import { Users, Cpu, Store } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { authService, Profile } from "@/lib/supabase";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) return navigate("/auth");
      const userProfile = await authService.getProfile(data.session.user.id);
      if (!userProfile || userProfile.role !== "admin") return navigate("/");
      setProfile(userProfile);
    };
    checkAuth();
  }, []);

  if (!profile) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated userName={profile.full_name || profile.email} />
      <ChatbotWidget />

      <div className="container mx-auto px-4 pt-24 pb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage platform operations</p>
        </motion.div>

        <Tabs defaultValue="users" className="mt-8">
          <TabsList>
            <TabsTrigger value="users"><Users className="w-4 h-4 mr-2" />Users</TabsTrigger>
            <TabsTrigger value="devices"><Cpu className="w-4 h-4 mr-2" />Devices</TabsTrigger>
            <TabsTrigger value="marketplace"><Store className="w-4 h-4 mr-2" />Marketplace</TabsTrigger>
          </TabsList>
          <TabsContent value="users"><ComingSoon title="User Management" description="Manage farmers, buyers, and admins" phase={1} /></TabsContent>
          <TabsContent value="devices"><ComingSoon title="Device Management" description="Monitor all IoT devices" phase={1} /></TabsContent>
          <TabsContent value="marketplace"><ComingSoon title="Marketplace Admin" description="Oversee all listings and transactions" phase={1} /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
