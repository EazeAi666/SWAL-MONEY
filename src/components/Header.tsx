import { Bell, User, Search, LogIn } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "./AuthContext";
import { loginWithGoogle } from "../lib/firebase";

export function Header() {
  const { user, userData, loading } = useAuth();

  return (
    <header className="flex items-center justify-between p-4 bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-3">
        {user ? (
          <>
            <Avatar className="h-10 w-10 border-2 border-primary/20">
              <AvatarImage src={user.photoURL || `https://picsum.photos/seed/${user.uid}/100/100`} />
              <AvatarFallback>{user.displayName?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-xs text-muted-foreground">Welcome back,</p>
              <p className="text-sm font-semibold">{user.displayName?.split(' ')[0] || "User"}</p>
            </div>
          </>
        ) : (
          <Button 
            variant="outline" 
            size="sm" 
            className="rounded-full gap-2"
            onClick={() => loginWithGoogle()}
            disabled={loading}
          >
            <LogIn className="h-4 w-4" />
            Sign In
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Search className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full relative">
          <Bell className="h-5 w-5" />
          {user && <span className="absolute top-2 right-2 h-2 w-2 bg-destructive rounded-full border-2 border-background" />}
        </Button>
      </div>
    </header>
  );
}
