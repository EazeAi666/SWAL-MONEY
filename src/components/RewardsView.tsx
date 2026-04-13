import { motion } from "motion/react";
import { Gift, Star, Zap, ChevronRight, Trophy, Coins, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export function RewardsView() {
  const dailyCheckIn = [
    { day: "Mon", points: 5, active: true },
    { day: "Tue", points: 5, active: true },
    { day: "Wed", points: 10, active: false },
    { day: "Thu", points: 5, active: false },
    { day: "Fri", points: 5, active: false },
    { day: "Sat", points: 20, active: false },
    { day: "Sun", points: 50, active: false },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="px-4 py-6 space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Rewards</h2>
        <div className="flex items-center gap-2 bg-yellow-100 text-yellow-700 px-3 py-1.5 rounded-full">
          <Coins className="h-4 w-4" />
          <span className="text-sm font-bold">1,250</span>
        </div>
      </div>

      {/* Daily Check-in */}
      <Card className="border-none bg-gradient-to-br from-yellow-500 to-orange-500 text-white shadow-lg shadow-orange-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold">Daily Check-in</h3>
              <p className="text-xs opacity-80">Earn points every day</p>
            </div>
            <Trophy className="h-8 w-8 opacity-80" />
          </div>
          
          <div className="flex justify-between gap-2">
            {dailyCheckIn.map((item) => (
              <div key={item.day} className="flex flex-col items-center gap-2">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  item.active ? "bg-white text-orange-500 scale-110 shadow-lg" : "bg-white/20 text-white"
                }`}>
                  +{item.points}
                </div>
                <span className="text-[10px] font-medium opacity-80">{item.day}</span>
              </div>
            ))}
          </div>
          
          <Button className="w-full mt-6 bg-white text-orange-600 hover:bg-white/90 font-bold rounded-2xl h-12">
            Check-in Today
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Active Tasks</h3>
        
        <Card className="border-border/50">
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-bold">First Transfer</p>
                  <p className="text-xs text-muted-foreground">Send money to any bank</p>
                </div>
              </div>
              <span className="text-sm font-bold text-primary">+₦500</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-medium">
                <span>Progress</span>
                <span>0/1</span>
              </div>
              <Progress value={0} className="h-1.5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
                  <Star className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-bold">Airtime Hero</p>
                  <p className="text-xs text-muted-foreground">Buy airtime 3 times this week</p>
                </div>
              </div>
              <span className="text-sm font-bold text-primary">+200 pts</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-medium">
                <span>Progress</span>
                <span>2/3</span>
              </div>
              <Progress value={66} className="h-1.5" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-accent/5 p-4 rounded-3xl border border-accent/10 flex flex-col items-center gap-2 text-center">
          <Clock className="h-6 w-6 text-accent" />
          <p className="text-xs font-bold">Spin & Win</p>
          <p className="text-[10px] text-muted-foreground">Try your luck daily</p>
        </div>
        <div className="bg-primary/5 p-4 rounded-3xl border border-primary/10 flex flex-col items-center gap-2 text-center">
          <Gift className="h-6 w-6 text-primary" />
          <p className="text-xs font-bold">Refer & Earn</p>
          <p className="text-[10px] text-muted-foreground">Get ₦800 per friend</p>
        </div>
      </div>
    </motion.div>
  );
}
