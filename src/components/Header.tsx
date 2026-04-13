import { Bell, User, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10 border-2 border-primary/20">
          <AvatarImage src="https://picsum.photos/seed/user/100/100" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-xs text-muted-foreground">Welcome back,</p>
          <p className="text-sm font-semibold">John Doe</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Search className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2 w-2 bg-destructive rounded-full border-2 border-background" />
        </Button>
      </div>
    </header>
  );
}
