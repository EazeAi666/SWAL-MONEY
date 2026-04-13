import { Eye, EyeOff, Plus, ArrowUpRight, ArrowDownLeft, Loader2 } from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { useAuth } from "./AuthContext";
import { addMoney, makeTransfer } from "../lib/transactions";

export function BalanceCard({ onTransferClick }: { onTransferClick?: () => void }) {
  const [showBalance, setShowBalance] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const { user, userData } = useAuth();

  const handleAddMoney = async () => {
    if (!user) return;
    setIsProcessing(true);
    try {
      // For demo purposes, we add a random amount between 1000 and 5000
      const amount = Math.floor(Math.random() * 4000) + 1000;
      await addMoney(user.uid, amount);
    } catch (error) {
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleTransfer = async () => {
    if (onTransferClick) {
      onTransferClick();
      return;
    }
    if (!user || !userData || userData.balance < 500) return;
    setIsProcessing(true);
    try {
      // For demo purposes, we transfer 500
      await makeTransfer(user.uid, 500, "Sarah");
    } catch (error) {
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const balance = userData?.balance ?? 0;

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
              {showBalance ? balance.toLocaleString(undefined, { minimumFractionDigits: 2 }) : "****.**"}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center gap-2">
              <Button 
                size="icon" 
                disabled={isProcessing}
                onClick={handleAddMoney}
                className="rounded-full bg-white text-primary hover:bg-white/90 h-12 w-12 shadow-lg"
              >
                {isProcessing ? <Loader2 className="h-6 w-6 animate-spin" /> : <Plus className="h-6 w-6" />}
              </Button>
              <span className="text-xs font-medium">Add Money</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Button 
                size="icon" 
                disabled={isProcessing || balance < 500}
                onClick={handleTransfer}
                className="rounded-full bg-white text-primary hover:bg-white/90 h-12 w-12 shadow-lg disabled:opacity-50"
              >
                {isProcessing ? <Loader2 className="h-6 w-6 animate-spin" /> : <ArrowUpRight className="h-6 w-6" />}
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
