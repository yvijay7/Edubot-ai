import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search, Filter, ExternalLink, Clock, Star, BookOpen,
  Play, ChevronRight, GraduationCap, Code, Calculator,
  Atom, Languages, Palette
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import DashboardSidebar from "@/components/DashboardSidebar";

const categories = [
  { icon: Code, label: "Computer Science", count: 120 },
  { icon: Calculator, label: "Mathematics", count: 95 },
  { icon: Atom, label: "Science", count: 80 },
  { icon: Languages, label: "Languages", count: 65 },
  { icon: Palette, label: "Arts", count: 40 },
  { icon: GraduationCap, label: "Test Prep", count: 55 },
];

const platforms = [
  {
    name: "Khan Academy",
    url: "https://www.khanacademy.org",
    description: "Free world-class education for anyone, anywhere. Covers math, science, computing, and more.",
    courses: [
      { title: "AP Computer Science Principles", duration: "16 weeks", rating: 4.8, level: "Intermediate", free: true },
      { title: "Multivariable Calculus", duration: "12 weeks", rating: 4.9, level: "Advanced", free: true },
      { title: "Intro to Machine Learning", duration: "8 weeks", rating: 4.7, level: "Beginner", free: true },
      { title: "Statistics & Probability", duration: "10 weeks", rating: 4.8, level: "Beginner", free: true },
    ],
  },
  {
    name: "Coursera",
    url: "https://www.coursera.org",
    description: "Online courses from top universities and companies. Earn certificates and degrees.",
    courses: [
      { title: "Deep Learning Specialization", duration: "12 weeks", rating: 4.9, level: "Intermediate", free: false },
      { title: "Google Data Analytics", duration: "24 weeks", rating: 4.8, level: "Beginner", free: false },
      { title: "Machine Learning by Stanford", duration: "11 weeks", rating: 4.9, level: "Intermediate", free: false },
    ],
  },
  {
    name: "freeCodeCamp",
    url: "https://www.freecodecamp.org",
    description: "Learn to code for free with millions of other learners. Build real-world projects.",
    courses: [
      { title: "JavaScript Algorithms", duration: "300 hours", rating: 4.7, level: "Beginner", free: true },
      { title: "Responsive Web Design", duration: "200 hours", rating: 4.6, level: "Beginner", free: true },
      { title: "Data Visualization with D3", duration: "150 hours", rating: 4.5, level: "Intermediate", free: true },
    ],
  },
  {
    name: "MIT OpenCourseWare",
    url: "https://ocw.mit.edu",
    description: "Free lecture notes, exams, and videos from MIT. No registration required.",
    courses: [
      { title: "Introduction to Algorithms", duration: "16 weeks", rating: 4.9, level: "Advanced", free: true },
      { title: "Linear Algebra", duration: "14 weeks", rating: 4.8, level: "Intermediate", free: true },
    ],
  },
];

const Resources = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar open={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? "lg:ml-64" : "lg:ml-20"}`}>
        <div className="p-6 lg:p-8 max-w-7xl">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
              Learning Resources 📚
            </h1>
            <p className="text-muted-foreground">
              Curated courses from top platforms, personalized by EduBot AI
            </p>
          </motion.div>

          {/* Search */}
          <div className="flex gap-3 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                placeholder="Search courses, topics, or platforms..."
                className="pl-10 h-12 bg-card border-border"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="h-12 px-5 border-border gap-2">
              <Filter size={16} /> Filters
            </Button>
          </div>

          {/* Categories */}
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
            {categories.map((cat, i) => (
              <motion.button
                key={cat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setActiveCategory(activeCategory === cat.label ? null : cat.label)}
                className={`p-4 rounded-xl border text-center transition-all ${
                  activeCategory === cat.label
                    ? "border-primary bg-secondary shadow-card"
                    : "border-border bg-card hover:shadow-card"
                }`}
              >
                <cat.icon size={24} className={`mx-auto mb-2 ${activeCategory === cat.label ? "text-primary" : "text-muted-foreground"}`} />
                <div className="text-xs font-medium text-foreground">{cat.label}</div>
                <div className="text-xs text-muted-foreground">{cat.count} courses</div>
              </motion.button>
            ))}
          </div>

          {/* Platforms */}
          <div className="space-y-10">
            {platforms.map((platform, pi) => (
              <motion.section
                key={platform.name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: pi * 0.1 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-heading font-bold text-foreground flex items-center gap-2">
                      {platform.name}
                      <a href={platform.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink size={16} className="text-muted-foreground hover:text-primary" />
                      </a>
                    </h2>
                    <p className="text-sm text-muted-foreground">{platform.description}</p>
                  </div>
                  <Button variant="ghost" className="text-primary text-sm gap-1">
                    View All <ChevronRight size={16} />
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {platform.courses.map((course, ci) => (
                    <Card key={course.title} className="shadow-card hover:shadow-elevated transition-all cursor-pointer border-border group">
                      <CardContent className="p-5">
                        <div className="flex items-center gap-2 mb-3">
                          {course.free ? (
                            <Badge className="gradient-primary text-primary-foreground text-xs border-0">Free</Badge>
                          ) : (
                            <Badge variant="outline" className="text-xs border-border text-muted-foreground">Paid</Badge>
                          )}
                          <Badge variant="outline" className="text-xs border-border text-muted-foreground">{course.level}</Badge>
                        </div>
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-3 leading-tight">
                          {course.title}
                        </h3>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock size={12} /> {course.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <Star size={12} className="text-accent fill-accent" /> {course.rating}
                          </span>
                        </div>
                        <Button size="sm" className="w-full mt-4 gradient-primary text-primary-foreground gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Play size={14} /> Start Learning
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.section>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Resources;
