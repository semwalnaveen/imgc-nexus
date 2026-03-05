import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Eye, EyeOff, Smartphone, Lock, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState<"credentials" | "mfa">("credentials");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === "credentials") {
      setStep("mfa");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-secondary flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-primary blur-3xl" />
          <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-primary/50 blur-3xl" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-primary">
              <Shield className="h-7 w-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-secondary-foreground">IMGC</h1>
              <p className="text-xs text-secondary-foreground/60">India Mortgage Guarantee Corporation</p>
            </div>
          </div>
        </div>
        <div className="relative z-10 space-y-6">
          <h2 className="text-4xl font-bold text-secondary-foreground leading-tight">
            Policy Administration<br />System
          </h2>
          <p className="text-secondary-foreground/70 text-lg max-w-md">
            Cloud-native mortgage guarantee loan origination platform with AI-assisted underwriting.
          </p>
          <div className="flex gap-6 text-sm text-secondary-foreground/50">
            <div className="flex items-center gap-2"><Lock className="h-4 w-4" /> Enterprise Security</div>
            <div className="flex items-center gap-2"><Shield className="h-4 w-4" /> SOC 2 Compliant</div>
          </div>
        </div>
        <p className="relative z-10 text-xs text-secondary-foreground/40">© 2026 India Mortgage Guarantee Corporation. All rights reserved.</p>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md space-y-8"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 justify-center mb-8">
            <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-primary">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">IMGC PAS</span>
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              {step === "credentials" ? "Sign in to PAS" : "Verify Your Identity"}
            </h2>
            <p className="text-muted-foreground mt-1 text-sm">
              {step === "credentials"
                ? "Enter your credentials to access the system"
                : "Enter the OTP sent to your registered device"}
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {step === "credentials" ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="email">Email / Username</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="email" placeholder="name@imgc.com" className="pl-9" defaultValue="rajesh.kumar@imgc.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <button type="button" className="text-xs text-primary hover:underline">Forgot password?</button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-9 pr-9"
                      defaultValue="password123"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <Button type="submit" className="w-full" size="lg">Sign In</Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>

                <Button type="button" variant="outline" className="w-full" size="lg">
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                  Azure AD SSO
                </Button>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="otp">One-Time Password</Label>
                  <div className="relative">
                    <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="otp" placeholder="Enter 6-digit OTP" className="pl-9 text-center tracking-[0.5em] text-lg" maxLength={6} />
                  </div>
                  <p className="text-xs text-muted-foreground">OTP sent to ••••••7890</p>
                </div>
                <Button type="submit" className="w-full" size="lg">Verify & Continue</Button>
                <div className="flex justify-between text-sm">
                  <button type="button" onClick={() => setStep("credentials")} className="text-primary hover:underline">← Back</button>
                  <button type="button" className="text-primary hover:underline">Resend OTP</button>
                </div>
              </>
            )}
          </form>

          <div className="rounded-lg bg-muted/50 border p-3 flex items-start gap-2">
            <Shield className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
            <p className="text-xs text-muted-foreground">
              This is a secured system. Unauthorized access is prohibited and monitored. Session timeout: 30 minutes.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground">Privacy Policy</a>
            <span>·</span>
            <span>v2.4.1</span>
            <span>·</span>
            <a href="#" className="hover:text-foreground">Support: helpdesk@imgc.com</a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
