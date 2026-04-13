import { Eye, EyeOff, Plus, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

export function BalanceCard() {
  const [showBalance, setShowBalance] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="px-4 py-2"
    >
      <Card className="bg-primary text-primary-foreground overflow-hidden relative border-none shadow-xl shadow-primary/20">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <div className="w-32 h-32 rounded-full bg-white" />
        </div>
        <CardContent className="p-6 relative z-10">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium opacity-80">Total Balance</p>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-primary-foreground hover:bg-white/10"
              onClick={() => setShowBalance(!showBalance)}
            >
              {showBalance ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </Button>
          </div>
          <div className="flex items-baseline gap-1 mb-6">
            <span className="text-2xl font-bold">₦</span>
            <span className="text-4xl font-bold tracking-tight">
              {showBalance ? "124,500.00" : "****.**"}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center gap-2">
              <Button size="icon" className="rounded-full bg-white text-primary hover:bg-white/90 h-12 w-12 shadow-lg">
                <Plus className="h-6 w-6" />
              </Button>
              <span className="text-xs font-medium">Add Money</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Button size="icon" className="rounded-full bg-white text-primary hover:bg-white/90 h-12 w-12 shadow-lg">
                <ArrowUpRight className="h-6 w-6" />
              </Button>
              <span className="text-xs font-medium">Transfer</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Button size="icon" className="rounded-full bg-white text-primary hover:bg-white/90 h-12 w-12 shadow-lg">
                <ArrowDownLeft className="h-6 w-6" />
              </Button>
              <span className="text-xs font-medium">Withdraw</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
