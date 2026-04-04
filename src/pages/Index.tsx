import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Brain, Sparkles, Target, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/edubot-logo.png";
import heroPattern from "@/assets/hero-pattern.jpg";

const features = [
  { icon: Brain, title: "AI-Powered Tutor", desc: "Get instant answers and explanations tailored to your learning style" },
  { icon: Target, title: "Smart Study Plans", desc: "Auto-generated day-wise plans from your syllabus in under 30 seconds" },
  { icon: BookOpen, title: "Curated Resources", desc: "Best content from Khan Academy, Coursera, MIT OCW & more" },
  { icon: Sparkles, title: "Progress Tracking", desc: "Visual dashboards showing your growth, streaks, and achievements" },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="EduBot AI" className="w-9 h-9" width={512} height={512} />
            <span className="text-xl font-heading font-bold text-foreground">EduBot AI</span>
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" className="text-muted-foreground" onClick={() => navigate("/login")}>
              Sign In
            </Button>
            <Button className="gradient-primary text-primary-foreground gap-1" onClick={() => navigate("/login")}>
              Get Started <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-[0.03]" />
        <div className="max-w-6xl mx-auto px-6 text-center relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-6">
              <Zap size={14} className="text-accent" />
              AI-Powered Personalized Learning
            </div>
            <h1 className="text-5xl lg:text-7xl font-heading font-bold text-foreground leading-tight mb-6">
              Learn Smarter,
              <br />
              <span className="text-gradient">Not Harder</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
              EduBot AI transforms your syllabus into personalized study plans, curates the best
              learning resources, and tracks your progress — all powered by AI.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="gradient-primary text-primary-foreground font-semibold gap-2 h-14 px-8 text-base hover:opacity-90" onClick={() => navigate("/login")}>
                Start Learning Free <ArrowRight size={18} />
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-base border-border text-foreground" onClick={() => navigate("/dashboard")}>
                View Demo
              </Button>
            </div>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center gap-12 mt-16"
          >
            {[
              { value: "1.5B+", label: "Online Learners" },
              { value: "35%", label: "Better Retention" },
              { value: "500+", label: "Free Courses" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-heading font-bold text-foreground">{s.value}</div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-3">Why EduBot AI?</h2>
            <p className="text-muted-foreground">Everything you need for a personalized learning experience</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-card hover:shadow-elevated transition-shadow border border-border"
              >
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
                  <f.icon size={22} className="text-primary-foreground" />
                </div>
                <h3 className="text-lg font-heading font-bold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="gradient-hero rounded-3xl p-12 relative overflow-hidden">
            <img src={heroPattern} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay" loading="lazy" width={1920} height={1080} />
            <div className="relative">
              <h2 className="text-3xl font-heading font-bold text-primary-foreground mb-4">
                Ready to Transform Your Learning?
              </h2>
              <p className="text-primary-foreground/70 mb-8 max-w-lg mx-auto">
                Join thousands of students using EduBot AI to learn faster and smarter.
              </p>
              <Button size="lg" className="gradient-accent text-accent-foreground font-semibold h-14 px-10 text-base hover:opacity-90 gap-2" onClick={() => navigate("/login")}>
                Get Started — It's Free <ArrowRight size={18} />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={logo} alt="EduBot AI" className="w-7 h-7" width={512} height={512} />
            <span className="text-sm font-heading font-semibold text-foreground">EduBot AI</span>
          </div>
          <p className="text-xs text-muted-foreground">© 2025 EduBot AI Research Team</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
