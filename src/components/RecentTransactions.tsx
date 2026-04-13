import { ArrowUpRight, ArrowDownLeft, ShoppingBag, Coffee, Smartphone, Tv } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { subscribeToTransactions } from "../lib/transactions";

export function RecentTransactions() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    const unsubscribe = subscribeToTransactions(user.uid, (txs) => {
      setTransactions(txs);
    });
    return () => unsubscribe();
  }, [user]);

  const getIcon = (category: string, type: string) => {
    if (type === 'credit') return ArrowDownLeft;
    switch (category) {
      case 'airtime': return Smartphone;
      case 'transfer': return ArrowUpRight;
      case 'tv': return Tv;
      default: return Coffee;
    }
  };

  const getColor = (category: string, type: string) => {
    if (type === 'credit') return "bg-green-100 text-green-600";
    switch (category) {
      case 'airtime': return "bg-blue-100 text-blue-600";
      case 'transfer': return "bg-purple-100 text-purple-600";
      default: return "bg-orange-100 text-orange-600";
    }
  };

  if (transactions.length === 0) {
    return (
      <div className="px-4 py-6 pb-24 text-center">
        <p className="text-muted-foreground text-sm">No transactions yet.</p>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 pb-24">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">Recent Transactions</h2>
        <button className="text-sm font-medium text-primary">See All</button>
      </div>
      <div className="space-y-4">
        {transactions.map((tx, index) => {
          const Icon = getIcon(tx.category, tx.type);
          const color = getColor(tx.category, tx.type);
          return (
            <motion.div
              key={tx.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 rounded-2xl bg-card border border-border/50 hover:border-primary/20 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className={`h-12 w-12 rounded-xl ${color} flex items-center justify-center`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{tx.description}</p>
                  <p className="text-xs text-muted-foreground">
                    {tx.timestamp.toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-bold ${tx.type === 'credit' ? 'text-green-600' : 'text-foreground'}`}>
                  {tx.type === 'credit' ? '+' : '-'}₦{tx.amount.toLocaleString()}
                </p>
                <p className="text-[10px] text-muted-foreground uppercase font-medium tracking-wider">{tx.status}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
