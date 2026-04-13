import { Smartphone, Wifi, Zap, Tv, ShieldCheck, Gamepad2, GraduationCap, MoreHorizontal } from "lucide-react";
import { motion } from "motion/react";

const services = [
  { icon: Smartphone, label: "Airtime", color: "bg-blue-100 text-blue-600" },
  { icon: Wifi, label: "Data", color: "bg-purple-100 text-purple-600" },
  { icon: Zap, label: "Electricity", color: "bg-yellow-100 text-yellow-600" },
  { icon: Tv, label: "TV", color: "bg-red-100 text-red-600" },
  { icon: ShieldCheck, label: "Insurance", color: "bg-green-100 text-green-600" },
  { icon: Gamepad2, label: "Betting", color: "bg-orange-100 text-orange-600" },
  { icon: GraduationCap, label: "Education", color: "bg-indigo-100 text-indigo-600" },
  { icon: MoreHorizontal, label: "More", color: "bg-gray-100 text-gray-600" },
];

export function ServicesGrid() {
  return (
    <div className="px-4 py-6">
      <div className="bg-card rounded-3xl p-4 border border-border/50 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-base font-bold">Daily Services</h2>
          <button className="text-xs font-semibold text-primary px-3 py-1 bg-primary/5 rounded-full">View All</button>
        </div>
        <div className="grid grid-cols-4 gap-y-8 gap-x-2">
          {services.map((service, index) => (
            <motion.div
              key={service.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="flex flex-col items-center gap-2"
            >
              <div className={`h-12 w-12 rounded-2xl ${service.color} flex items-center justify-center shadow-sm hover:scale-105 transition-transform cursor-pointer`}>
                <service.icon className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-semibold text-center text-muted-foreground">{service.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
