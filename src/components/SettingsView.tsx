import { Sun, Moon, Monitor, ChevronRight, Shield, Bell, Lock, HelpCircle, LogOut } from "lucide-react";
import { useTheme } from "./ThemeContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "motion/react";
import { logout } from "../lib/firebase";

export function SettingsView() {
  const { theme, setTheme } = useTheme();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const themeOptions = [
    { id: "light", label: "Light", icon: Sun },
    { id: "dark", label: "Dark", icon: Moon },
    { id: "system", label: "System", icon: Monitor },
  ] as const;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="px-4 py-6 space-y-8"
    >
      <div>
        <h2 className="text-2xl font-bold mb-6">Settings</h2>
        
        <div className="space-y-4">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Appearance</p>
          <div className="grid grid-cols-3 gap-3">
            {themeOptions.map((option) => {
              const isActive = theme === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => setTheme(option.id)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                    isActive 
                      ? "border-primary bg-primary/5 text-primary" 
                      : "border-border bg-card text-muted-foreground hover:border-primary/50"
                  }`}
                >
                  <option.icon className="h-6 w-6" />
                  <span className="text-xs font-medium">{option.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Account & Security</p>
        <Card className="border-border/50">
          <CardContent className="p-0 divide-y divide-border/50">
            <SettingItem icon={Shield} label="Privacy & Security" />
            <SettingItem icon={Bell} label="Notifications" />
            <SettingItem icon={Lock} label="Change PIN" />
            <SettingItem icon={HelpCircle} label="Help & Support" />
          </CardContent>
        </Card>
      </div>

      <Button 
        variant="destructive" 
        className="w-full h-14 rounded-2xl gap-2 font-bold"
        onClick={handleLogout}
      >
        <LogOut className="h-5 w-5" />
        Log Out
      </Button>

      <div className="text-center pb-10">
        <p className="text-xs text-muted-foreground">SWAL Money v1.0.2 (Beta)</p>
      </div>
    </motion.div>
  );
}

function SettingItem({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <button className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <span className="text-sm font-semibold">{label}</span>
      </div>
      <ChevronRight className="h-5 w-5 text-muted-foreground" />
    </button>
  );
}
