import { Header } from "./components/Header";
import { BalanceCard } from "./components/BalanceCard";
import { ServicesGrid } from "./components/ServicesGrid";
import { RecentTransactions } from "./components/RecentTransactions";
import { BottomNav } from "./components/BottomNav";
import { SettingsView } from "./components/SettingsView";
import { FinanceView } from "./components/FinanceView";
import { CardsView } from "./components/CardsView";
import { RewardsView } from "./components/RewardsView";
import { TransferView } from "./components/TransferView";
import { AuthView } from "./components/AuthView";
import { ThemeProvider } from "./components/ThemeContext";
import { AuthProvider, useAuth } from "./components/AuthContext";
import { motion, AnimatePresence } from "motion/react";
import { Smartphone, LogIn, Gift, Zap, ChevronRight, Bell } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { loginWithGoogle, loginWithRedirect } from "./lib/firebase";

function AppContent() {
  const [activeView, setActiveView] = useState("home");
  const [showTransfer, setShowTransfer] = useState(false);
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
    return <AuthView />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground max-w-md mx-auto shadow-2xl relative overflow-x-hidden">
      <Header />
      
      <main className="pb-24">
        <AnimatePresence mode="wait">
          {activeView === "home" ? (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <BalanceCard onTransferClick={() => setShowTransfer(true)} />
              
              {/* Rewards Banner - OPay Style */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="px-4"
              >
                <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-2xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-yellow-500 flex items-center justify-center text-white shadow-lg shadow-yellow-200">
                      <Gift className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold">Daily Rewards</p>
                      <p className="text-[10px] text-muted-foreground">Check-in now to earn points</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="rounded-full border-yellow-500 text-yellow-600 hover:bg-yellow-50" onClick={() => setActiveView("rewards")}>
                    Claim
                  </Button>
                </div>
              </motion.div>

              <ServicesGrid />

              {/* Promo Section */}
              <div className="px-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold">Special Offers</h2>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                  {[1, 2].map((i) => (
                    <div key={i} className="min-w-[300px] h-36 rounded-3xl bg-gradient-to-br from-primary to-accent p-6 text-white relative overflow-hidden flex-shrink-0">
                      <div className="relative z-10">
                        <p className="text-xs font-medium opacity-80 mb-1">CASHBACK</p>
                        <h3 className="text-xl font-bold leading-tight mb-3">Get 20% back on<br />Electricity Bills</h3>
                        <Button size="sm" className="bg-white text-primary hover:bg-white/90 rounded-full font-bold">Pay Now</Button>
                      </div>
                      <Zap className="absolute -bottom-4 -right-4 h-32 w-32 opacity-10 rotate-12" />
                    </div>
                  ))}
                </div>
              </div>
              
              <RecentTransactions />
            </motion.div>
          ) : activeView === "rewards" ? (
            <RewardsView key="rewards" />
          ) : activeView === "finance" ? (
            <FinanceView key="finance" />
          ) : activeView === "cards" ? (
            <CardsView key="cards" />
          ) : (
            <SettingsView key="settings" />
          )}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {showTransfer && (
          <TransferView onBack={() => setShowTransfer(false)} />
        )}
      </AnimatePresence>

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
