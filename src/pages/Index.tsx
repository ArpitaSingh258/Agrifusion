import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { User, ShoppingCart, Shield, CheckCircle, ArrowRight, BarChart3, Users, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-agriculture.jpg";
import iotFarming from "@/assets/iot-farming.jpg";
import marketplaceCrops from "@/assets/marketplace-crops.jpg";
import aiAdvisory from "@/assets/ai-advisory.jpg";
import logo from "@/assets/agrifusion-logo.png";
import stepSignup from "@/assets/step-signup.jpg";
import stepConnect from "@/assets/step-connect.jpg";
import stepInsights from "@/assets/step-insights.jpg";
import stepGrowSell from "@/assets/step-grow-sell.jpg";
import benefitYield from "@/assets/benefit-yield.jpg";
import benefitCosts from "@/assets/benefit-costs.jpg";
import benefitMarket from "@/assets/benefit-market.jpg";
import benefitSustainable from "@/assets/benefit-sustainable.jpg";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  const navigate = useNavigate();

  const roleCards = [
    {
      title: "Farmer Login",
      description: "Manage IoT devices, list crops, access AI advisory",
      icon: User,
      path: "/auth?mode=login&role=farmer",
      gradient: "from-primary to-primary/80",
    },
    {
      title: "Buyer Login",
      description: "Browse marketplace, purchase crops, track orders",
      icon: ShoppingCart,
      path: "/auth?mode=login&role=buyer",
      gradient: "from-secondary to-secondary/80",
    },
    {
      title: "Admin Login",
      description: "Monitor platform, manage users and devices",
      icon: Shield,
      path: "/auth?mode=login&role=admin",
      gradient: "from-accent to-accent/80",
    },
  ];

  const benefits = [
    { title: "Increase Crop Yield", description: "Data-driven insights help farmers increase productivity by up to 40%", image: benefitYield },
    { title: "Reduce Costs", description: "Optimize resource usage and reduce input costs through precision farming", image: benefitCosts },
    { title: "Better Market Access", description: "Connect directly with buyers and get fair prices for your produce", image: benefitMarket },
    { title: "Sustainable Farming", description: "Eco-friendly practices with reduced water usage and carbon footprint", image: benefitSustainable },
  ];

  const howItWorks = [
    { step: "01", title: "Sign Up", description: "Create your account as a farmer, buyer, or join our platform", image: stepSignup },
    { step: "02", title: "Connect Devices", description: "Install IoT sensors and connect them to your farm dashboard", image: stepConnect },
    { step: "03", title: "Get Insights", description: "Receive AI-powered recommendations and real-time data analytics", image: stepInsights },
    { step: "04", title: "Grow & Sell", description: "Optimize your farming and sell directly on our marketplace", image: stepGrowSell },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/30 via-blue-50/20 to-amber-50/30">
      <Navbar />
      <ChatbotWidget />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Smart Agriculture - Modern farming with technology"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background/98 to-background/95" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-transparent" />
        </div>
        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="container mx-auto relative z-10 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <img 
              src={logo} 
              alt="AgriFusion Logo" 
              className="w-48 h-48 md:w-56 md:h-56 object-contain drop-shadow-2xl mb-6 bg-white/5 backdrop-blur-sm rounded-3xl p-4"
            />
            <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium">
              🌱 The Future of Agriculture
            </Badge>
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent leading-tight">
            AgriFusion
          </h1>
          
          <p className="text-2xl md:text-3xl font-semibold text-foreground mb-4 max-w-3xl mx-auto">
            Smart Farming with AI, IoT & Blockchain
          </p>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Revolutionizing agriculture through cutting-edge technology. Empowering farmers with precision farming, 
            real-time insights, and direct market access for sustainable prosperity.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              onClick={() => navigate("/auth?mode=signup")} 
              className="shadow-elegant text-lg px-8 py-6 group"
            >
              Get Started Today
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-lg px-8 py-6"
            >
              Learn More
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Decorative Visual Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            <div className="bg-card/80 backdrop-blur-sm border-2 border-primary/20 rounded-2xl p-8 text-center shadow-elegant hover:shadow-xl transition-all hover:-translate-y-2">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">Empowering Farmers</h3>
              <p className="text-muted-foreground">Connecting smallholder farmers to modern technology</p>
            </div>
            <div className="bg-card/80 backdrop-blur-sm border-2 border-secondary/20 rounded-2xl p-8 text-center shadow-elegant hover:shadow-xl transition-all hover:-translate-y-2">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-secondary to-secondary/60 flex items-center justify-center">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">Data-Driven Growth</h3>
              <p className="text-muted-foreground">Real-time insights for smarter farming decisions</p>
            </div>
            <div className="bg-card/80 backdrop-blur-sm border-2 border-accent/20 rounded-2xl p-8 text-center shadow-elegant hover:shadow-xl transition-all hover:-translate-y-2">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">Future-Ready Tech</h3>
              <p className="text-muted-foreground">AI, IoT, and blockchain powering agriculture</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section with Images */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="mb-4">Features</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Powerful Platform Features</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              AgriFusion combines cutting-edge technology with traditional farming wisdom to create a
              sustainable, efficient, and profitable agricultural ecosystem.
            </p>
          </motion.div>

          {/* Featured Image Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className="overflow-hidden hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/30">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={iotFarming} 
                    alt="IoT Integration - Smart sensors and devices for modern farming"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white text-xl font-bold">IoT Integration</h3>
                  </div>
                </div>
                <CardContent className="pt-6">
                  <CardDescription className="text-base">Real-time sensor data monitoring with smart devices for soil, weather, and crop health tracking</CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group"
            >
              <Card className="overflow-hidden hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/30">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={aiAdvisory} 
                    alt="AI Advisory - Smart farming recommendations powered by machine learning"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white text-xl font-bold">AI Advisory</h3>
                  </div>
                </div>
                <CardContent className="pt-6">
                  <CardDescription className="text-base">Smart farming recommendations powered by machine learning for optimal crop management</CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group"
            >
              <Card className="overflow-hidden hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/30">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={marketplaceCrops} 
                    alt="Marketplace - Direct farmer-to-buyer sales platform"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white text-xl font-bold">Marketplace</h3>
                  </div>
                </div>
                <CardContent className="pt-6">
                  <CardDescription className="text-base">Direct farmer-to-buyer sales platform eliminating middlemen and maximizing profits</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="mb-4">Process</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">How It Works</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Get started with AgriFusion in four simple steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {howItWorks.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="relative"
              >
                <Card className="h-full overflow-hidden hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/30">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={`${item.title} - ${item.description}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-white/90 flex items-center justify-center text-xl font-bold text-primary shadow-lg">
                      {item.step}
                    </div>
                  </div>
                  <CardContent className="pt-6 text-center">
                    <h3 className="text-xl font-bold mb-2 text-foreground">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
                {idx < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-24 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="mb-4">Benefits</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Why Choose AgriFusion?</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="h-full overflow-hidden hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/30">
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={benefit.image} 
                      alt={`${benefit.title} - ${benefit.description}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <CheckCircle className="w-8 h-8 text-white mb-2 drop-shadow-lg" />
                      <h3 className="text-white text-2xl font-bold">{benefit.title}</h3>
                    </div>
                  </div>
                  <CardContent className="pt-6">
                    <CardDescription className="text-base leading-relaxed">{benefit.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Login Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="mb-4">Get Started</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Choose Your Role</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Select your role to access your personalized dashboard and start your journey
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {roleCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                  whileHover={{ y: -8 }}
                  className="h-full"
                >
                  <Card
                    className="cursor-pointer hover:shadow-elegant transition-all duration-300 overflow-hidden h-full flex flex-col border-2 hover:border-primary/30"
                    onClick={() => navigate(card.path)}
                  >
                    <div className={`h-48 bg-gradient-to-br ${card.gradient} flex items-center justify-center relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-black/10" />
                      <Icon className="w-20 h-20 text-white relative z-10 drop-shadow-lg" />
                    </div>
                    <CardHeader className="flex-grow">
                      <CardTitle className="text-2xl mb-3">{card.title}</CardTitle>
                      <CardDescription className="text-base">{card.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full group" size="lg">
                        Login as {card.title.split(" ")[0]}
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t bg-card">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
              <div className="flex items-center gap-3 mb-4">
                <img src={logo} alt="AgriFusion Logo" className="w-10 h-10 object-contain drop-shadow-lg" />
                <span className="text-xl font-bold text-primary">AgriFusion</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Revolutionizing agriculture through AI, IoT, and Blockchain technology.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-foreground">Platform</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="hover:text-primary cursor-pointer transition-colors">Features</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Pricing</li>
                <li className="hover:text-primary cursor-pointer transition-colors">IoT Devices</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Marketplace</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-foreground">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="hover:text-primary cursor-pointer transition-colors">Documentation</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Help Center</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Contact Us</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Community</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-foreground">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="hover:text-primary cursor-pointer transition-colors">Privacy Policy</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Terms of Service</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Cookie Policy</li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t text-center text-sm text-muted-foreground">
            <p>&copy; 2025 AgriFusion. Empowering farmers, feeding the future. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
