import { Header } from "./components/Header";
import { BalanceCard } from "./components/BalanceCard";
import { ServicesGrid } from "./components/ServicesGrid";
import { RecentTransactions } from "./components/RecentTransactions";
import { BottomNav } from "./components/BottomNav";
import { SettingsView } from "./components/SettingsView";
import { ThemeProvider } from "./components/ThemeContext";
import { AuthProvider, useAuth } from "./components/AuthContext";
import { motion, AnimatePresence } from "motion/react";
import { Smartphone, LogIn } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { loginWithGoogle } from "./lib/firebase";

function AppContent() {
  const [activeView, setActiveView] = useState("home");
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-medium text-muted-foreground">SWAL Money is loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-10 text-center">
        <div className="h-24 w-24 bg-primary/10 rounded-3xl flex items-center justify-center mb-8">
          <Smartphone className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-3xl font-bold mb-4">SWAL Money</h1>
        <p className="text-muted-foreground mb-10">Empowering Nigerians with Seamless, Borderless, and Secure Finance.</p>
        <Button 
          className="w-full h-14 rounded-2xl text-lg font-bold gap-3"
          onClick={() => loginWithGoogle()}
        >
          <LogIn className="h-6 w-6" />
          Get Started
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground max-w-md mx-auto shadow-2xl relative overflow-x-hidden">
      <Header />
      
      <main className="pb-20">
        <AnimatePresence mode="wait">
          {activeView === "home" ? (
            <motion.div
              key="home"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <BalanceCard />
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="px-4 mt-6"
              >
                <div className="bg-accent/10 border border-accent/20 rounded-2xl p-4 flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center text-white">
                    <span className="text-lg font-bold">!</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold">Complete your KYC</p>
                    <p className="text-xs text-muted-foreground">Upgrade your account to increase limits.</p>
                  </div>
                </div>
              </motion.div>

              <ServicesGrid />

              <div className="px-4 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold">Promotions</h2>
                </div>
                <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                  {[1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 0.98 }}
                      className="min-w-[280px] h-32 rounded-3xl bg-gradient-to-br from-primary/90 to-accent relative overflow-hidden flex-shrink-0 p-5 text-white shadow-lg shadow-primary/10"
                    >
                      <div className="relative z-10">
                        <p className="text-xs font-medium opacity-80 mb-1">Limited Offer</p>
                        <h3 className="text-lg font-bold leading-tight mb-2">Get 10% Cashback on<br />Airtime Purchase</h3>
                        <button className="text-[10px] font-bold bg-white text-primary px-3 py-1.5 rounded-full uppercase tracking-wider">Claim Now</button>
                      </div>
                      <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
                      <div className="absolute top-2 right-2 opacity-20">
                        <Smartphone className="h-16 w-16 rotate-12" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <RecentTransactions />
            </motion.div>
          ) : activeView === "settings" ? (
            <SettingsView key="settings" />
          ) : (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center px-10"
            >
              <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-4">
                <Smartphone className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-bold">Coming Soon</h3>
              <p className="text-sm text-muted-foreground">This feature is currently under development for Phase 2 of our roadmap.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <BottomNav active={activeView} onViewChange={setActiveView} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </AuthProvider>
  );
}
