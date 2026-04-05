import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Bot, Eye, EyeOff, ArrowRight, Sparkles, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { toast } from "@/hooks/use-toast";
import heroPattern from "@/assets/hero-pattern.jpg";
import logo from "@/assets/edubot-logo.png";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { session } = useAuth();

  useEffect(() => {
    if (session) navigate("/dashboard", { replace: true });
  }, [session, navigate]);

  useEffect(() => {
    if (searchParams.get("expired") === "true") {
      toast({ title: "Guest access expired", description: "Please sign up to continue learning!", variant: "destructive" });
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: name }, emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
        toast({ title: "Account created!", description: "Welcome to EduBot AI! 🎉" });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          if (error.message === "Invalid login credentials") {
            toast({ 
              title: "Login failed", 
              description: "गलत email या password। अगर आपने Google से signup किया था तो Google button use करें।", 
              variant: "destructive" 
            });
          } else {
            toast({ title: "Error", description: error.message, variant: "destructive" });
          }
          setLoading(false);
          return;
        }
      }
    } catch (error: any) {
      if (error.message?.includes("User already registered")) {
        toast({ 
          title: "Account already exists", 
          description: "इस email से पहले से account है। Login करें या Google button use करें।", 
          variant: "destructive" 
        });
      } else {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      }
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });
      if (result.error) throw result.error;
    } catch (error: any) {
      toast({ title: "Google sign-in failed", description: error.message, variant: "destructive" });
    }
    setLoading(false);
  };

  const handleGuestAccess = async () => {
    setLoading(true);
    try {
      const guestEmail = `guest_${Date.now()}@edubot-guest.local`;
      const guestPassword = `guest_${crypto.randomUUID()}`;
      const { error } = await supabase.auth.signUp({
        email: guestEmail,
        password: guestPassword,
        options: { data: { full_name: "Guest User", is_guest: true } },
      });
      if (error) throw error;
      // Mark as guest with expiry
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 2);
        await supabase.from("profiles").update({ is_guest: true, guest_expires_at: expiresAt.toISOString() }).eq("user_id", user.id);
      }
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left - Hero */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden gradient-hero">
        <img src={heroPattern} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay" width={1920} height={1080} />
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <div className="flex items-center gap-3">
            <img src={logo} alt="EduBot AI" className="w-12 h-12" width={512} height={512} />
            <span className="text-2xl font-heading font-bold text-primary-foreground">EduBot AI</span>
          </div>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="max-w-lg">
            <h1 className="text-5xl font-heading font-bold text-primary-foreground leading-tight mb-6">
              Your Personalized<br /><span className="text-accent">Learning Journey</span><br />Starts Here
            </h1>
            <p className="text-lg text-primary-foreground/70 leading-relaxed">
              AI-powered study planning, curated resources from Khan Academy & more, and real-time progress tracking — all personalized for you.
            </p>
          </motion.div>
          <div className="flex gap-8">
            {[{ label: "Active Learners", value: "12K+" }, { label: "Courses Available", value: "500+" }, { label: "Avg. Score Boost", value: "35%" }].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-heading font-bold text-accent">{stat.value}</div>
                <div className="text-sm text-primary-foreground/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <img src={logo} alt="EduBot AI" className="w-10 h-10" width={512} height={512} />
            <span className="text-xl font-heading font-bold text-foreground">EduBot AI</span>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-2">
              {isSignUp ? "Create your account" : "Welcome back"}
            </h2>
            <p className="text-muted-foreground">
              {isSignUp ? "Start your personalized learning journey today" : "Continue your learning journey"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {isSignUp && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-2">
                <Label htmlFor="name" className="text-foreground font-medium">Full Name</Label>
                <Input id="name" placeholder="Enter your full name" value={name} onChange={(e) => setName(e.target.value)} className="h-12 bg-muted/50 border-border focus:border-primary" required />
              </motion.div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground font-medium">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="h-12 bg-muted/50 border-border focus:border-primary" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground font-medium">Password</Label>
              <div className="relative">
                <Input id="password" type={showPassword ? "text" : "password"} placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} className="h-12 bg-muted/50 border-border focus:border-primary pr-12" required minLength={6} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <Button type="submit" disabled={loading} className="w-full h-12 gradient-primary text-primary-foreground font-semibold text-base gap-2 hover:opacity-90 transition-opacity">
              {loading ? "Please wait..." : isSignUp ? "Get Started" : "Sign In"}
              <ArrowRight size={18} />
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
            <div className="relative flex justify-center text-sm"><span className="bg-background px-4 text-muted-foreground">or continue with</span></div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-12 border-border hover:bg-muted/50" onClick={handleGoogleSignIn} disabled={loading}>
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Google
            </Button>
            <Button variant="outline" className="h-12 border-border hover:bg-muted/50" onClick={handleGuestAccess} disabled={loading}>
              <Bot className="w-5 h-5 mr-2 text-primary" />
              Guest (2 days)
            </Button>
          </div>

          <p className="text-center mt-8 text-sm text-muted-foreground">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button onClick={() => setIsSignUp(!isSignUp)} className="text-primary font-semibold hover:underline">
              {isSignUp ? "Sign in" : "Sign up"}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
