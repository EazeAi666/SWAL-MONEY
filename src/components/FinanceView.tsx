import { motion } from "motion/react";
import { PieChart, TrendingUp, Target, Lock, ChevronRight, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "./AuthContext";

export function FinanceView() {
  const { userData } = useAuth();
  
  const savingsOptions = [
    { title: "OWealth", desc: "15% Annual Interest, Daily Pay", icon: TrendingUp, color: "text-green-500", bg: "bg-green-50", balance: 5000.45 },
    { title: "Fixed Deposit", desc: "Up to 18% Annual Interest", icon: Lock, color: "text-blue-500", bg: "bg-blue-50", balance: 0 },
    { title: "Target Savings", desc: "Save for your goals", icon: Target, color: "text-orange-500", bg: "bg-orange-50", balance: 12000 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="px-4 py-6 space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Finance</h2>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Plus className="h-6 w-6" />
        </Button>
      </div>

      <Card className="bg-gradient-to-br from-green-600 to-green-500 text-white border-none shadow-lg shadow-green-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium opacity-80">Total Savings Balance</p>
            <TrendingUp className="h-5 w-5 opacity-80" />
          </div>
          <div className="flex items-baseline gap-1 mb-2">
            <span className="text-xl font-bold">₦</span>
            <span className="text-3xl font-bold tracking-tight">17,000.45</span>
          </div>
          <p className="text-xs opacity-80">+₦4.52 Interest earned today</p>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Savings Products</h3>
        {savingsOptions.map((option, i) => (
          <motion.div
            key={option.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="border-border/50 hover:border-primary/20 transition-all cursor-pointer group">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`h-12 w-12 rounded-2xl ${option.bg} flex items-center justify-center ${option.color}`}>
                    <option.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">{option.title}</p>
                    <p className="text-xs text-muted-foreground">{option.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right mr-2">
                    <p className="text-sm font-bold">₦{option.balance.toLocaleString()}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
            <TrendingUp className="h-4 w-4" />
          </div>
          <p className="text-sm font-bold">Investment Tips</p>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Consistent saving is the key to financial freedom. Start with as little as ₦100 daily in OWealth.
        </p>
      </div>
    </motion.div>
  );
}
