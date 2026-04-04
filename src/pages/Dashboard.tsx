import { useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen, Brain, TrendingUp, Clock, Target, Award,
  Play, ChevronRight, Search, Bell, User, Flame,
  BarChart3, Calendar, Zap, ArrowRight, AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import DashboardSidebar from "@/components/DashboardSidebar";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, profile, isGuest, guestExpired, signOut } = useAuth();

  const displayName = profile?.display_name || user?.user_metadata?.full_name || "Learner";
  const guestExpiresAt = profile?.guest_expires_at ? new Date(profile.guest_expires_at) : null;
  const daysLeft = guestExpiresAt ? Math.max(0, Math.ceil((guestExpiresAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24))) : null;

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar open={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? "lg:ml-64" : "lg:ml-20"}`}>
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-lg border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors text-foreground">
                <BarChart3 size={20} />
              </button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input placeholder="Search courses, topics..." className="pl-10 w-64 lg:w-80 bg-muted/50 border-border h-10" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
                <Bell size={20} />
              </Button>
              <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center">
                <User size={16} className="text-primary-foreground" />
              </div>
            </div>
          </div>
        </header>

        <div className="p-6 lg:p-8 max-w-7xl">
          {/* Guest Banner */}
          {isGuest && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 rounded-xl border border-accent/50 bg-accent/10 flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <AlertCircle size={20} className="text-accent" />
                <p className="text-sm text-foreground">
                  <span className="font-semibold">Guest mode</span> — {daysLeft !== null ? `${daysLeft} day${daysLeft !== 1 ? 's' : ''} remaining` : 'Limited access'}. Sign up to save your progress!
                </p>
              </div>
              <Button size="sm" className="gradient-primary text-primary-foreground" onClick={() => { signOut(); navigate("/login"); }}>
                Sign Up Now
              </Button>
            </motion.div>
          )}

          {/* Welcome */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-3xl font-heading font-bold text-foreground mb-1">
              Welcome, {displayName}! 👋
            </h1>
            <p className="text-muted-foreground">Start your personalized learning journey today.</p>
          </motion.div>

          {/* Empty State Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { icon: Flame, label: "Day Streak", value: "0", color: "text-accent" },
              { icon: BookOpen, label: "Courses Active", value: "0", color: "text-primary" },
              { icon: Clock, label: "Hours This Week", value: "0", color: "text-secondary-foreground" },
              { icon: Target, label: "Goals Met", value: "0%", color: "text-primary" },
            ].map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Card className="shadow-card hover:shadow-elevated transition-shadow border-border">
                  <CardContent className="p-5 flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-secondary"><stat.icon className={stat.color} size={22} /></div>
                    <div>
                      <div className="text-2xl font-heading font-bold text-foreground">{stat.value}</div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Empty Active Courses */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-heading font-bold text-foreground">Active Courses</h2>
                <Button variant="ghost" className="text-primary text-sm gap-1" onClick={() => navigate("/resources")}>
                  Browse All <ChevronRight size={16} />
                </Button>
              </div>

              <Card className="shadow-card border-border">
                <CardContent className="p-12 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-4">
                    <BookOpen size={28} className="text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-2">No courses yet</h3>
                  <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                    Start by exploring our curated resources from Khan Academy, Coursera, and more.
                  </p>
                  <Button className="gradient-primary text-primary-foreground gap-2" onClick={() => navigate("/resources")}>
                    <Play size={16} /> Explore Resources
                  </Button>
                </CardContent>
              </Card>

              {/* Weekly Activity - Empty */}
              <Card className="shadow-card border-border mt-6">
                <CardHeader>
                  <CardTitle className="text-lg font-heading text-foreground flex items-center gap-2">
                    <Calendar size={18} className="text-primary" />
                    Weekly Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end gap-3 h-32">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                      <div key={day} className="flex-1 flex flex-col items-center gap-2">
                        <div className="w-full rounded-t-md bg-muted/50" style={{ height: 4 }} />
                        <span className="text-xs text-muted-foreground">{day}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-center text-sm text-muted-foreground mt-4">Start learning to see your activity here</p>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* AI Recommendation */}
              <Card className="gradient-hero text-primary-foreground shadow-elevated border-0 overflow-hidden">
                <CardContent className="p-6 relative">
                  <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-accent/20 blur-2xl" />
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-3">
                      <Zap size={18} className="text-accent" />
                      <span className="text-sm font-medium text-primary-foreground/80">AI Tutor</span>
                    </div>
                    <p className="text-sm text-primary-foreground/70 mb-4">
                      Ask our AI tutor anything! Get personalized explanations and study help.
                    </p>
                    <Button size="sm" className="gradient-accent text-accent-foreground font-semibold gap-1 hover:opacity-90" onClick={() => navigate("/ai-tutor")}>
                      Chat with AI <ArrowRight size={14} />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Getting Started */}
              <div>
                <h2 className="text-lg font-heading font-bold text-foreground mb-3 flex items-center gap-2">
                  <Brain size={18} className="text-primary" /> Get Started
                </h2>
                <div className="space-y-3">
                  {[
                    { title: "Explore learning resources", desc: "Browse courses from top platforms", action: () => navigate("/resources") },
                    { title: "Chat with AI Tutor", desc: "Get personalized study help", action: () => navigate("/ai-tutor") },
                    { title: "Set your learning goals", desc: "Track your progress over time", action: () => {} },
                  ].map((item, i) => (
                    <motion.div key={item.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }}>
                      <Card className="shadow-card hover:shadow-elevated transition-all cursor-pointer border-border group" onClick={item.action}>
                        <CardContent className="p-4">
                          <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{item.title}</h3>
                          <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <Card className="shadow-card border-border">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Award size={18} className="text-accent" />
                    <h3 className="font-heading font-bold text-foreground">Badges</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">Complete courses to earn your first badge! 🏅</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
