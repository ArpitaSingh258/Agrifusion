-- Create user roles enum
CREATE TYPE public.user_role AS ENUM ('farmer', 'buyer', 'admin');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  role user_role NOT NULL,
  location TEXT,
  crop_type TEXT,
  profile_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create devices table
CREATE TABLE public.devices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  farmer_id UUID NOT NULL,
  device_name TEXT NOT NULL,
  device_type TEXT NOT NULL,
  qr_code TEXT NOT NULL UNIQUE,
  status TEXT DEFAULT 'active',
  registered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create listings table
CREATE TABLE public.listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  farmer_id UUID NOT NULL,
  crop_name TEXT NOT NULL,
  quantity DECIMAL NOT NULL,
  unit TEXT NOT NULL,
  price_per_unit DECIMAL NOT NULL,
  description TEXT,
  image_url TEXT,
  status TEXT DEFAULT 'available',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create transactions table
CREATE TABLE public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  buyer_id UUID NOT NULL,
  farmer_id UUID NOT NULL,
  listing_id UUID REFERENCES public.listings(id),
  amount DECIMAL NOT NULL,
  status TEXT DEFAULT 'pending',
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid()::text = user_id::text);

-- Devices policies
CREATE POLICY "Farmers can view their own devices"
  ON public.devices FOR SELECT
  USING (auth.uid()::text = farmer_id::text);

CREATE POLICY "Farmers can insert their own devices"
  ON public.devices FOR INSERT
  WITH CHECK (auth.uid()::text = farmer_id::text);

CREATE POLICY "Farmers can update their own devices"
  ON public.devices FOR UPDATE
  USING (auth.uid()::text = farmer_id::text);

CREATE POLICY "Admins can view all devices"
  ON public.devices FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE user_id::text = auth.uid()::text
      AND role = 'admin'
    )
  );

-- Listings policies
CREATE POLICY "Everyone can view available listings"
  ON public.listings FOR SELECT
  USING (status = 'available');

CREATE POLICY "Farmers can insert their own listings"
  ON public.listings FOR INSERT
  WITH CHECK (auth.uid()::text = farmer_id::text);

CREATE POLICY "Farmers can update their own listings"
  ON public.listings FOR UPDATE
  USING (auth.uid()::text = farmer_id::text);

CREATE POLICY "Farmers can delete their own listings"
  ON public.listings FOR DELETE
  USING (auth.uid()::text = farmer_id::text);

CREATE POLICY "Admins can view all listings"
  ON public.listings FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE user_id::text = auth.uid()::text
      AND role = 'admin'
    )
  );

-- Transactions policies
CREATE POLICY "Buyers can view their own purchases"
  ON public.transactions FOR SELECT
  USING (auth.uid()::text = buyer_id::text);

CREATE POLICY "Farmers can view their sales"
  ON public.transactions FOR SELECT
  USING (auth.uid()::text = farmer_id::text);

CREATE POLICY "Buyers can create transactions"
  ON public.transactions FOR INSERT
  WITH CHECK (auth.uid()::text = buyer_id::text);

CREATE POLICY "Admins can view all transactions"
  ON public.transactions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE user_id::text = auth.uid()::text
      AND role = 'admin'
    )
  );

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add trigger to profiles
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();