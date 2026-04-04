import { useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen, Brain, TrendingUp, Clock, Target, Award,
  Play, ChevronRight, Search, Bell, User, Flame,
  BarChart3, Calendar, Zap, ArrowRight, ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/edubot-logo.png";
import DashboardSidebar from "@/components/DashboardSidebar";

const statsData = [
  { icon: Flame, label: "Day Streak", value: "12", color: "text-accent" },
  { icon: BookOpen, label: "Courses Active", value: "4", color: "text-primary" },
  { icon: Clock, label: "Hours This Week", value: "8.5", color: "text-secondary-foreground" },
  { icon: Target, label: "Goals Met", value: "87%", color: "text-primary" },
];

const activeCourses = [
  { title: "Machine Learning Fundamentals", platform: "Khan Academy", progress: 65, lessons: "12/18", subject: "AI & ML", color: "bg-primary" },
  { title: "Calculus I: Limits & Derivatives", platform: "Khan Academy", progress: 42, lessons: "8/20", subject: "Mathematics", color: "bg-accent" },
  { title: "Data Structures & Algorithms", platform: "freeCodeCamp", progress: 78, lessons: "14/18", subject: "Computer Science", color: "bg-primary" },
  { title: "Academic Writing Skills", platform: "Coursera", progress: 30, lessons: "3/10", subject: "Language", color: "bg-accent" },
];

const recommendations = [
  { title: "Neural Networks & Deep Learning", platform: "Khan Academy", duration: "6 weeks", level: "Intermediate", match: 95 },
  { title: "Linear Algebra for ML", platform: "3Blue1Brown", duration: "4 weeks", level: "Beginner", match: 88 },
  { title: "Python for Data Science", platform: "freeCodeCamp", duration: "8 weeks", level: "Beginner", match: 82 },
];

const weeklyActivity = [
  { day: "Mon", hours: 2.5 },
  { day: "Tue", hours: 1.8 },
  { day: "Wed", hours: 3.2 },
  { day: "Thu", hours: 0.5 },
  { day: "Fri", hours: 2.0 },
  { day: "Sat", hours: 1.2 },
  { day: "Sun", hours: 0 },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const maxHours = Math.max(...weeklyActivity.map(d => d.hours));

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar open={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? "lg:ml-64" : "lg:ml-20"}`}>
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-lg border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors text-foreground"
              >
                <BarChart3 size={20} />
              </button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  placeholder="Search courses, topics..."
                  className="pl-10 w-64 lg:w-80 bg-muted/50 border-border h-10"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
                <Bell size={20} />
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full gradient-accent" />
              </Button>
              <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center">
                <User size={16} className="text-primary-foreground" />
              </div>
            </div>
          </div>
        </header>

        <div className="p-6 lg:p-8 max-w-7xl">
          {/* Welcome */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-heading font-bold text-foreground mb-1">
              Good morning, Student! 👋
            </h1>
            <p className="text-muted-foreground">
              You're on a 12-day streak. Keep up the momentum!
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {statsData.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="shadow-card hover:shadow-elevated transition-shadow border-border">
                  <CardContent className="p-5 flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-secondary">
                      <stat.icon className={`${stat.color}`} size={22} />
                    </div>
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
            {/* Active Courses */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-heading font-bold text-foreground">Active Courses</h2>
                <Button variant="ghost" className="text-primary text-sm gap-1" onClick={() => navigate("/resources")}>
                  Browse All <ChevronRight size={16} />
                </Button>
              </div>

              <div className="space-y-3">
                {activeCourses.map((course, i) => (
                  <motion.div
                    key={course.title}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card className="shadow-card hover:shadow-elevated transition-all cursor-pointer border-border group">
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`text-xs px-2 py-0.5 rounded-full ${course.color} text-primary-foreground font-medium`}>
                                {course.subject}
                              </span>
                              <span className="text-xs text-muted-foreground">{course.platform}</span>
                            </div>
                            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                              {course.title}
                            </h3>
                          </div>
                          <Button size="icon" variant="ghost" className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                            <Play size={18} />
                          </Button>
                        </div>
                        <div className="flex items-center gap-3">
                          <Progress value={course.progress} className="flex-1 h-2" />
                          <span className="text-sm font-medium text-muted-foreground">{course.lessons}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Weekly Activity */}
              <Card className="shadow-card border-border mt-6">
                <CardHeader>
                  <CardTitle className="text-lg font-heading text-foreground flex items-center gap-2">
                    <Calendar size={18} className="text-primary" />
                    Weekly Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end gap-3 h-32">
                    {weeklyActivity.map((d) => (
                      <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
                        <div className="w-full rounded-t-md gradient-primary transition-all" style={{ height: `${(d.hours / maxHours) * 100}%`, minHeight: d.hours > 0 ? 8 : 2, opacity: d.hours > 0 ? 1 : 0.2 }} />
                        <span className="text-xs text-muted-foreground">{d.day}</span>
                      </div>
                    ))}
                  </div>
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
                      <span className="text-sm font-medium text-primary-foreground/80">AI Study Plan</span>
                    </div>
                    <p className="text-sm text-primary-foreground/70 mb-4">
                      Based on your progress, focus on <span className="font-semibold text-accent">Calculus derivatives</span> today for 45 min.
                    </p>
                    <Button size="sm" className="gradient-accent text-accent-foreground font-semibold gap-1 hover:opacity-90">
                      Start Session <ArrowRight size={14} />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Recommendations */}
              <div>
                <h2 className="text-lg font-heading font-bold text-foreground mb-3 flex items-center gap-2">
                  <Brain size={18} className="text-primary" />
                  For You
                </h2>
                <div className="space-y-3">
                  {recommendations.map((rec, i) => (
                    <motion.div
                      key={rec.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                    >
                      <Card className="shadow-card hover:shadow-elevated transition-all cursor-pointer border-border group">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-tight">
                              {rec.title}
                            </h3>
                            <span className="text-xs font-bold text-primary ml-2">{rec.match}%</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{rec.platform}</span>
                            <span>·</span>
                            <span>{rec.duration}</span>
                            <span>·</span>
                            <span>{rec.level}</span>
                          </div>
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
                    <h3 className="font-heading font-bold text-foreground">Recent Badges</h3>
                  </div>
                  <div className="flex gap-3">
                    {["🔥", "📚", "🎯", "⭐"].map((emoji, i) => (
                      <div key={i} className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-xl">
                        {emoji}
                      </div>
                    ))}
                  </div>
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
