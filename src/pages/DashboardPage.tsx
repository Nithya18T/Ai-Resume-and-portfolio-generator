import { GlassCard } from "@/components/GlassCard";
import { useAppContext } from "@/context/AppContext";
import { FileText, BrainCircuit, Target, Globe, MessageSquare, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const features = [
  { icon: FileText, title: "Resume Builder", desc: "AI-powered resume generation", url: "/resume", color: "text-primary" },
  { icon: BrainCircuit, title: "Skill Analyzer", desc: "Match skills to job descriptions", url: "/skills", color: "text-accent" },
  { icon: Target, title: "ATS Optimizer", desc: "Beat applicant tracking systems", url: "/ats", color: "text-warning" },
  { icon: Globe, title: "Portfolio Generator", desc: "Create a personal website", url: "/portfolio", color: "text-primary" },
  { icon: MessageSquare, title: "Interview Prep", desc: "AI-generated practice questions", url: "/interview", color: "text-accent" },
];

const DashboardPage = () => {
  const { state } = useAppContext();
  const hasProfile = !!state.profile.name;

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground mb-2">
          {hasProfile ? `Welcome back, ${state.profile.name}` : "Welcome to CareerFlow AI"}
        </h1>
        <p className="text-muted-foreground">
          Your intelligent career platform — build resumes, analyze skills, and prepare for interviews.
        </p>
      </div>

      {!hasProfile && (
        <GlassCard variant="accent" className="flex items-center justify-between">
          <div>
            <h3 className="font-display font-semibold text-foreground mb-1">Get Started</h3>
            <p className="text-sm text-muted-foreground">Complete your profile to unlock all AI features.</p>
          </div>
          <Link to="/profile">
            <Button>
              Set Up Profile <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </GlassCard>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((f) => (
          <Link key={f.title} to={f.url}>
            <GlassCard className="hover:border-primary/20 transition-colors cursor-pointer h-full">
              <f.icon className={`h-8 w-8 mb-3 ${f.color}`} />
              <h3 className="font-display font-semibold text-foreground mb-1">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </GlassCard>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GlassCard>
          <p className="text-sm text-muted-foreground mb-1">Skills</p>
          <p className="text-2xl font-display font-bold text-foreground">{state.profile.skills.length}</p>
        </GlassCard>
        <GlassCard>
          <p className="text-sm text-muted-foreground mb-1">Skill Match</p>
          <p className="text-2xl font-display font-bold text-accent">{state.skillAnalysis?.score ?? "—"}%</p>
        </GlassCard>
        <GlassCard>
          <p className="text-sm text-muted-foreground mb-1">ATS Score</p>
          <p className="text-2xl font-display font-bold text-primary">{state.atsScore?.score ?? "—"}%</p>
        </GlassCard>
      </div>
    </div>
  );
};

export default DashboardPage;
