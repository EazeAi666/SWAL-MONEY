import { motion } from "motion/react";
import { CreditCard, Plus, Shield, Lock, Eye, EyeOff, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAuth } from "./AuthContext";

export function CardsView() {
  const [showDetails, setShowDetails] = useState(false);
  const { user } = useAuth();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="px-4 py-6 space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Cards</h2>
        <Button variant="outline" size="sm" className="rounded-full gap-2 border-primary text-primary hover:bg-primary/5">
          <Plus className="h-4 w-4" />
          Add Card
        </Button>
      </div>

      {/* Virtual Card */}
      <div className="relative group perspective-1000">
        <motion.div
          whileHover={{ rotateY: 5, rotateX: 5 }}
          className="w-full aspect-[1.6/1] rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <CreditCard className="h-40 w-40" />
          </div>
          
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-white/20 flex items-center justify-center">
                  <Shield className="h-5 w-5" />
                </div>
                <span className="text-sm font-bold tracking-widest">SWAL VIRTUAL</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-white/10"
                onClick={() => setShowDetails(!showDetails)}
              >
                {showDetails ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>

            <div className="space-y-4">
              <p className="text-xl font-mono tracking-[0.3em]">
                {showDetails ? "5412 8800 1234 5678" : "**** **** **** 5678"}
              </p>
              <div className="flex items-center gap-8">
                <div>
                  <p className="text-[10px] opacity-60 uppercase">Expiry</p>
                  <p className="text-sm font-medium">12/26</p>
                </div>
                <div>
                  <p className="text-[10px] opacity-60 uppercase">CVV</p>
                  <p className="text-sm font-medium">{showDetails ? "123" : "***"}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{user?.displayName?.toUpperCase() || "SWAL USER"}</p>
              <div className="flex gap-1">
                <div className="h-6 w-10 bg-red-500/80 rounded-sm" />
                <div className="h-6 w-10 bg-yellow-500/80 rounded-sm -ml-4" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card className="border-border/50 hover:border-primary/20 transition-all cursor-pointer">
          <CardContent className="p-4 flex flex-col items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Lock className="h-5 w-5" />
            </div>
            <p className="text-xs font-bold">Freeze Card</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 hover:border-primary/20 transition-all cursor-pointer">
          <CardContent className="p-4 flex flex-col items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Shield className="h-5 w-5" />
            </div>
            <p className="text-xs font-bold">Card Limits</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Physical Cards</h3>
        <Card className="border-dashed border-2 border-border/50 bg-muted/20">
          <CardContent className="p-8 flex flex-col items-center text-center gap-4">
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
              <Plus className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-bold">Get a Physical Card</p>
              <p className="text-xs text-muted-foreground">Enjoy zero maintenance fees and instant withdrawals.</p>
            </div>
            <Button className="rounded-full px-8">Apply Now</Button>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
