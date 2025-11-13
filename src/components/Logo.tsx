import { GraduationCap, Lock } from "lucide-react";

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <GraduationCap className="h-8 w-8 text-accent" />
        <Lock className="h-4 w-4 text-encrypted absolute -bottom-1 -right-1" />
      </div>
      <span className="text-xl font-bold text-foreground">Encrypted Grant Portal</span>
    </div>
  );
};

export default Logo;
