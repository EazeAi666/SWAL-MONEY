import { ArrowUpRight, ArrowDownLeft, ShoppingBag, Coffee, Smartphone } from "lucide-react";
import { motion } from "motion/react";

const transactions = [
  {
    id: 1,
    name: "Netflix Subscription",
    type: "debit",
    amount: "4,500.00",
    date: "Today, 10:45 AM",
    icon: Tv,
    color: "bg-red-100 text-red-600",
  },
  {
    id: 2,
    name: "Transfer from Sarah",
    type: "credit",
    amount: "25,000.00",
    date: "Yesterday, 08:20 PM",
    icon: ArrowDownLeft,
    color: "bg-green-100 text-green-600",
  },
  {
    id: 3,
    name: "Airtime Purchase",
    type: "debit",
    amount: "1,000.00",
    date: "12 Apr, 02:15 PM",
    icon: Smartphone,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 4,
    name: "Starbucks Coffee",
    type: "debit",
    amount: "2,400.00",
    date: "11 Apr, 09:10 AM",
    icon: Coffee,
    color: "bg-orange-100 text-orange-600",
  },
];

import { Tv } from "lucide-react";

export function RecentTransactions() {
  return (
    <div className="px-4 py-6 pb-24">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">Recent Transactions</h2>
        <button className="text-sm font-medium text-primary">See All</button>
      </div>
      <div className="space-y-4">
        {transactions.map((tx, index) => (
          <motion.div
            key={tx.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-3 rounded-2xl bg-card border border-border/50 hover:border-primary/20 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className={`h-12 w-12 rounded-xl ${tx.color} flex items-center justify-center`}>
                <tx.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-semibold">{tx.name}</p>
                <p className="text-xs text-muted-foreground">{tx.date}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`text-sm font-bold ${tx.type === 'credit' ? 'text-green-600' : 'text-foreground'}`}>
                {tx.type === 'credit' ? '+' : '-'}₦{tx.amount}
              </p>
              <p className="text-[10px] text-muted-foreground uppercase font-medium tracking-wider">{tx.type}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
