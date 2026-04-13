import { Smartphone, Wifi, Zap, Tv, ShieldCheck, Gamepad2, Landmark, Heart, Car, GraduationCap, MoreHorizontal } from "lucide-react";
import { motion } from "motion/react";

const services = [
  { icon: Landmark, label: "To Bank", color: "text-blue-500", bg: "bg-blue-50" },
  { icon: Smartphone, label: "Airtime", color: "text-green-500", bg: "bg-green-50" },
  { icon: Wifi, label: "Data", color: "text-cyan-500", bg: "bg-cyan-50" },
  { icon: Tv, label: "TV", color: "text-orange-500", bg: "bg-orange-50" },
  { icon: Zap, label: "Electricity", color: "text-yellow-600", bg: "bg-yellow-50" },
  { icon: Gamepad2, label: "Betting", color: "text-red-500", bg: "bg-red-50" },
  { icon: Heart, label: "Insurance", color: "text-pink-500", bg: "bg-pink-50" },
  { icon: Car, label: "Transport", color: "text-indigo-500", bg: "bg-indigo-50" },
];

export function ServicesGrid() {
  return (
    <div className="px-4">
      <div className="grid grid-cols-4 gap-y-6 gap-x-2">
        {services.map((service, i) => (
          <motion.button
            key={service.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center gap-2 group"
          >
            <div className={`h-14 w-14 rounded-2xl ${service.bg} flex items-center justify-center ${service.color} transition-all group-hover:shadow-md`}>
              <service.icon className="h-7 w-7" />
            </div>
            <span className="text-[11px] font-semibold text-foreground/80 text-center leading-tight">
              {service.label}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
