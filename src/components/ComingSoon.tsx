import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

interface ComingSoonProps {
  title: string;
  description: string;
  phase: number;
}

export const ComingSoon = ({ title, description, phase }: ComingSoonProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-2 border-dashed">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-primary animate-pulse" />
          </div>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription className="text-lg">{description}</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Badge variant="secondary" className="text-sm">
            Coming in Phase {phase}
          </Badge>
          <p className="text-sm text-muted-foreground mt-4">
            This exciting feature is currently under development and will be available soon!
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};
