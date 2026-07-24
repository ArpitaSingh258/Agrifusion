import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Sprout, User, ShoppingCart, Shield } from "lucide-react";
import { authService, UserRole } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [mode, setMode] = useState<"login" | "signup">(
    searchParams.get("mode") === "signup" ? "signup" : "login"
  );
  const [selectedRole, setSelectedRole] = useState<UserRole>("farmer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if already logged in
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        const profile = await authService.getProfile(data.session.user.id);
        if (profile) {
          navigate(`/${profile.role}`);
        }
      }
    };
    checkAuth();
  }, [navigate]);

  const handleAuth = async () => {
    if (!email || !password) {
      toast({
        title: "Please fill all fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      if (mode === "signup") {
        await authService.signUp(email, password, selectedRole);
        toast({
          title: "Account created successfully!",
          description: "Please complete your profile.",
        });
        navigate(`/${selectedRole}`);
      } else {
        const { user } = await authService.signIn(email, password);
        const profile = await authService.getProfile(user.id);
        toast({
          title: "Welcome back!",
        });
        navigate(`/${profile?.role}`);
      }
    } catch (error: any) {
      toast({
        title: "Authentication failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const roles = [
    { value: "farmer", label: "Farmer", icon: User, color: "text-primary" },
    { value: "buyer", label: "Buyer", icon: ShoppingCart, color: "text-secondary" },
    { value: "admin", label: "Admin", icon: Shield, color: "text-accent" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sprout className="w-10 h-10 text-primary" />
            <h1 className="text-3xl font-bold text-primary">AgriFusion</h1>
          </div>
          <p className="text-muted-foreground">Smart Farming with AI, IoT & Blockchain</p>
        </div>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>{mode === "login" ? "Welcome Back" : "Create Account"}</CardTitle>
            <CardDescription>
              {mode === "login"
                ? "Sign in to access your dashboard"
                : "Choose your role and get started"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={mode} onValueChange={(v) => setMode(v as "login" | "signup")}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="signup" className="space-y-4">
                <div>
                  <Label>Select Your Role</Label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {roles.map((role) => {
                      const Icon = role.icon;
                      return (
                        <motion.div
                          key={role.value}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            type="button"
                            variant={selectedRole === role.value ? "default" : "outline"}
                            className="w-full h-20 flex flex-col gap-1"
                            onClick={() => setSelectedRole(role.value as UserRole)}
                          >
                            <Icon className={`w-5 h-5 ${role.color}`} />
                            <span className="text-xs">{role.label}</span>
                          </Button>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="farmer@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <Button onClick={handleAuth} disabled={loading} className="w-full">
                  {loading ? "Creating Account..." : "Sign Up"}
                </Button>
              </TabsContent>

              <TabsContent value="login" className="space-y-4">
                <div>
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <Button onClick={handleAuth} disabled={loading} className="w-full">
                  {loading ? "Signing In..." : "Sign In"}
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Auth;
