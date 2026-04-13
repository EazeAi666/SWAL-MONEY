import { Home, Gift, PieChart, CreditCard, User } from "lucide-react";
import { motion } from "motion/react";

const navItems = [
  { icon: Home, label: "Home", id: "home" },
  { icon: Gift, label: "Rewards", id: "rewards" },
  { icon: PieChart, label: "Finance", id: "finance" },
  { icon: CreditCard, label: "Cards", id: "cards" },
  { icon: User, label: "Me", id: "settings" },
];

export function BottomNav({ active, onViewChange }: { active: string; onViewChange: (id: string) => void }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-xl border-t border-border px-6 py-3 z-50">
      <div className="flex items-center justify-between max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className="flex flex-col items-center gap-1 relative group"
            >
              <div className={`p-2 rounded-xl transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}`}>
                <item.icon className={`h-6 w-6 ${isActive ? 'fill-primary/10' : ''}`} />
              </div>
              <span className={`text-[10px] font-medium transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute -top-3 w-1 h-1 bg-primary rounded-full"
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
