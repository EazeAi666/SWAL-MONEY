import { motion } from "motion/react";
import { ArrowLeft, Search, User, Landmark, Smartphone, History, ChevronRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { useAuth } from "./AuthContext";
import { makeTransfer } from "../lib/transactions";

export function TransferView({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { user, userData } = useAuth();

  const handleTransfer = async () => {
    if (!user || !amount || !recipient) return;
    setIsProcessing(true);
    try {
      await makeTransfer(user.uid, parseFloat(amount), recipient);
      setStep(3);
    } catch (error) {
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 bg-background z-[60] flex flex-col"
    >
      <header className="p-4 flex items-center gap-4 border-b border-border/50">
        <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full">
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h2 className="text-xl font-bold">Transfer</h2>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-2 gap-4">
              <Card className="border-primary/20 bg-primary/5 cursor-pointer hover:bg-primary/10 transition-colors" onClick={() => setStep(2)}>
                <CardContent className="p-4 flex flex-col items-center gap-2">
                  <div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center">
                    <User className="h-6 w-6" />
                  </div>
                  <p className="text-sm font-bold">To SWAL User</p>
                  <p className="text-[10px] text-muted-foreground">Free & Instant</p>
                </CardContent>
              </Card>
              <Card className="border-border/50 cursor-pointer hover:bg-muted/50 transition-colors">
                <CardContent className="p-4 flex flex-col items-center gap-2">
                  <div className="h-12 w-12 rounded-full bg-blue-500 text-white flex items-center justify-center">
                    <Landmark className="h-6 w-6" />
                  </div>
                  <p className="text-sm font-bold">To Other Banks</p>
                  <p className="text-[10px] text-muted-foreground">Fast & Secure</p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Recent Recipients</h3>
              <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                {["Sarah", "John", "Mike", "Emma"].map((name) => (
                  <div key={name} className="flex flex-col items-center gap-2 min-w-[70px]">
                    <div className="h-14 w-14 rounded-full bg-accent/10 flex items-center justify-center text-accent text-lg font-bold">
                      {name[0]}
                    </div>
                    <span className="text-xs font-medium">{name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">All Contacts</h3>
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-card border border-border/50">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                      <User className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-bold">Contact {i}</p>
                      <p className="text-xs text-muted-foreground">0812 345 678{i}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Recipient Name/Number</label>
                <Input 
                  placeholder="Enter SWAL account number" 
                  className="h-14 rounded-2xl text-lg"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Amount (₦)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-muted-foreground">₦</span>
                  <Input 
                    type="number" 
                    placeholder="0.00" 
                    className="h-16 rounded-2xl text-3xl font-bold pl-10"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <p className="text-xs text-muted-foreground px-1">
                  Available Balance: ₦{userData?.balance.toLocaleString() || "0.00"}
                </p>
              </div>
            </div>

            <Card className="bg-primary/5 border-primary/10">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <History className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold">Transaction Fee: ₦0.00</p>
                  <p className="text-[10px] text-muted-foreground">SWAL to SWAL transfers are always free.</p>
                </div>
              </CardContent>
            </Card>

            <Button 
              className="w-full h-14 rounded-2xl text-lg font-bold"
              disabled={!amount || !recipient || isProcessing || (userData?.balance || 0) < parseFloat(amount)}
              onClick={handleTransfer}
            >
              {isProcessing ? "Processing..." : "Confirm Transfer"}
            </Button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center justify-center py-10 text-center space-y-6"
          >
            <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center text-green-600">
              <CheckCircle2 className="h-16 w-16" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Transfer Successful!</h3>
              <p className="text-muted-foreground mt-2">You have successfully sent ₦{parseFloat(amount).toLocaleString()} to {recipient}.</p>
            </div>
            <div className="w-full space-y-3">
              <Button className="w-full h-14 rounded-2xl font-bold" onClick={onBack}>Done</Button>
              <Button variant="outline" className="w-full h-14 rounded-2xl font-bold">Share Receipt</Button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
