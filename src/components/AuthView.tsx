import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Smartphone, Mail, Lock, Phone, ArrowRight, CheckCircle2, Shield, Bird, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { signUpWithEmail, loginWithEmail, loginWithGoogle } from "../lib/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";

export function AuthView() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("234");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validatePhone = (p: string) => /^234\d{10}$/.test(p);
  const validatePassword = (p: string) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(p);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "signup") {
        if (!validatePhone(phone)) throw new Error("Phone must be in format 234 followed by 10 digits");
        if (!validatePassword(password)) throw new Error("Password must be 8+ chars with uppercase, lowercase, number and special char");
        
        const res = await signUpWithEmail(email, password);
        const user = res.user;
        
        // Device ID generation (simple fingerprint for demo)
        const deviceId = btoa(navigator.userAgent).slice(0, 16);

        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          email: user.email,
          phone: phone,
          balance: 0,
          kycLevel: 1,
          kycStatus: "pending",
          deviceId: deviceId,
          createdAt: serverTimestamp(),
        });
      } else {
        await loginWithEmail(email, password);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md space-y-8"
      >
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="h-20 w-20 bg-primary rounded-3xl flex items-center justify-center shadow-xl shadow-primary/20 relative">
              <Bird className="h-12 w-12 text-white" />
              <div className="absolute -bottom-1 -right-1 bg-yellow-400 rounded-full p-1 border-2 border-primary">
                <Coins className="h-4 w-4 text-primary-foreground" />
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">SWAL Money</h1>
          <p className="text-muted-foreground">The standard for Nigerian banking</p>
        </div>

        <Card className="border-border/50 shadow-lg">
          <CardContent className="pt-6">
            <form onSubmit={handleAuth} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="email" 
                    placeholder="name@example.com" 
                    className="pl-10 h-12 rounded-xl"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {mode === "signup" && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone Number (234...)</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      type="tel" 
                      placeholder="2348012345678" 
                      className="pl-10 h-12 rounded-xl"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="password" 
                    placeholder="••••••••" 
                    className="pl-10 h-12 rounded-xl"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {mode === "signup" && (
                  <p className="text-[10px] text-muted-foreground px-1">
                    Must include uppercase, lowercase, number and special character.
                  </p>
                )}
              </div>

              {error && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive text-xs">
                  {error}
                </div>
              )}

              <Button className="w-full h-12 rounded-xl font-bold" disabled={loading}>
                {loading ? "Processing..." : mode === "login" ? "Sign In" : "Create Account"}
              </Button>
            </form>

            <div className="mt-6 relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <Button 
              variant="outline" 
              className="w-full mt-4 h-12 rounded-xl gap-2"
              onClick={() => loginWithGoogle()}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </Button>
          </CardContent>
        </Card>

        <div className="text-center">
          <button 
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
            className="text-sm font-medium text-primary hover:underline"
          >
            {mode === "login" ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>

        <div className="flex items-center justify-center gap-4 text-[10px] text-muted-foreground uppercase tracking-widest">
          <div className="flex items-center gap-1">
            <Shield className="h-3 w-3" />
            CBN Licensed
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" />
            NDIC Insured
          </div>
        </div>
      </motion.div>
    </div>
  );
}
