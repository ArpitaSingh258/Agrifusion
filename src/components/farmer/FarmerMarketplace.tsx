import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Package, DollarSign } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Listing {
  id: string;
  crop_name: string;
  quantity: number;
  unit: string;
  price_per_unit: number;
  description: string;
  status: string;
  created_at: string;
}

interface FarmerMarketplaceProps {
  farmerId: string;
}

export const FarmerMarketplace = ({ farmerId }: FarmerMarketplaceProps) => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [addListingOpen, setAddListingOpen] = useState(false);
  const [cropName, setCropName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("kg");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    loadListings();
  }, [farmerId]);

  const loadListings = async () => {
    try {
      const { data, error } = await supabase
        .from("listings")
        .select("*")
        .eq("farmer_id", farmerId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setListings(data || []);
    } catch (error) {
      toast({
        title: "Error loading listings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddListing = async () => {
    if (!cropName || !quantity || !price) {
      toast({
        title: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase.from("listings").insert({
        farmer_id: farmerId,
        crop_name: cropName,
        quantity: parseFloat(quantity),
        unit,
        price_per_unit: parseFloat(price),
        description,
        status: "available",
      });

      if (error) throw error;

      toast({
        title: "Listing added successfully!",
      });
      setAddListingOpen(false);
      setCropName("");
      setQuantity("");
      setPrice("");
      setDescription("");
      loadListings();
    } catch (error: any) {
      toast({
        title: "Error adding listing",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading marketplace...</div>;
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
              <CardTitle>My Listings</CardTitle>
              <CardDescription>Manage your crop listings</CardDescription>
            </div>
            <Dialog open={addListingOpen} onOpenChange={setAddListingOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Listing
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Listing</DialogTitle>
                  <DialogDescription>List your crop for sale</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Crop Name *</Label>
                    <Input
                      value={cropName}
                      onChange={(e) => setCropName(e.target.value)}
                      placeholder="e.g., Organic Rice"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Quantity *</Label>
                      <Input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="100"
                      />
                    </div>
                    <div>
                      <Label>Unit</Label>
                      <Input
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                        placeholder="kg"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Price per {unit} *</Label>
                    <Input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="50"
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe your crop..."
                      rows={3}
                    />
                  </div>
                  <Button onClick={handleAddListing} className="w-full">
                    Add Listing
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {listings.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground mb-4">No listings yet</p>
              <Button onClick={() => setAddListingOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Listing
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {listings.map((listing) => (
                <Card key={listing.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <Package className="w-8 h-8 text-primary" />
                      <Badge variant={listing.status === "available" ? "default" : "secondary"}>
                        {listing.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{listing.crop_name}</CardTitle>
                    <CardDescription>
                      {listing.quantity} {listing.unit} available
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-1 mb-2">
                      <DollarSign className="w-4 h-4 text-primary" />
                      <span className="text-lg font-bold text-primary">
                        ₹{listing.price_per_unit}/{listing.unit}
                      </span>
                    </div>
                    {listing.description && (
                      <p className="text-sm text-muted-foreground mb-2">{listing.description}</p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Listed: {new Date(listing.created_at).toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
