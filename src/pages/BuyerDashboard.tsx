import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Navbar";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { ProfileModal } from "@/components/ProfileModal";
import { ComingSoon } from "@/components/ComingSoon";
import { Store, History, Leaf, Package, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { authService, Profile } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

const BuyerDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    loadListings();
  }, []);

  const checkAuth = async () => {
    try {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate("/auth");
        return;
      }
      const userProfile = await authService.getProfile(data.session.user.id);
      if (!userProfile || userProfile.role !== "buyer") {
        navigate("/");
        return;
      }
      setProfile(userProfile);
    } catch (error) {
      navigate("/auth");
    } finally {
      setLoading(false);
    }
  };

  const loadListings = async () => {
    const { data } = await supabase.from("listings").select("*").eq("status", "available");
    setListings(data || []);
  };

  if (loading || !profile) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated userName={profile.full_name || profile.email} />
      <ChatbotWidget />
      <ProfileModal open={!profile.profile_completed} profile={profile} onComplete={checkAuth} />

      <div className="container mx-auto px-4 pt-24 pb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold mb-2">Buyer Dashboard</h1>
          <p className="text-muted-foreground">Browse and purchase quality crops</p>
        </motion.div>

        <Tabs defaultValue="marketplace" className="w-full mt-8">
          <TabsList>
            <TabsTrigger value="marketplace"><Store className="w-4 h-4 mr-2" />Marketplace</TabsTrigger>
            <TabsTrigger value="history"><History className="w-4 h-4 mr-2" />Purchase History</TabsTrigger>
            <TabsTrigger value="health"><Leaf className="w-4 h-4 mr-2" />Crop Health</TabsTrigger>
          </TabsList>

          <TabsContent value="marketplace">
            <Card>
              <CardHeader>
                <CardTitle>Available Crops</CardTitle>
                <CardDescription>Browse fresh crops from verified farmers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {listings.map((listing) => (
                    <Card key={listing.id}>
                      <CardHeader>
                        <Package className="w-8 h-8 text-primary mb-2" />
                        <CardTitle className="text-lg">{listing.crop_name}</CardTitle>
                        <CardDescription>{listing.quantity} {listing.unit}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold text-primary mb-4">₹{listing.price_per_unit}/{listing.unit}</p>
                        <Button className="w-full"><DollarSign className="w-4 h-4 mr-2" />Buy Now</Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <ComingSoon title="Purchase History" description="View your past orders and transactions" phase={1} />
          </TabsContent>

          <TabsContent value="health">
            <ComingSoon title="Crop Health" description="Check quality reports of purchased crops" phase={2} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BuyerDashboard;
