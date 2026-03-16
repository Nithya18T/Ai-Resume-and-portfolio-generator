import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { GlassCard } from "@/components/GlassCard";
import { ScoreRing } from "@/components/ScoreRing";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { optimizeATS } from "@/lib/ai-engine";
import { Loader2, Target, CheckCircle2, Lightbulb } from "lucide-react";
import { toast } from "sonner";

const ATSPage = () => {
  const { state, setAtsScore } = useAppContext();
  const [loading, setLoading] = useState(false);

  const optimize = async () => {
    if (!state.generatedResume) {
      toast.error("Generate a resume first.");
      return;
    }
    setLoading(true);
    try {
      const result = await optimizeATS(state.generatedResume, state.jobDescription);
      setAtsScore(result);
      toast.success("ATS optimization complete!");
    } catch {
      toast.error("Optimization failed.");
    } finally {
      setLoading(false);
    }
  };

  const ats = state.atsScore;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-display font-bold text-foreground">ATS Optimizer</h1>

      <GlassCard>
        <p className="text-muted-foreground mb-4">
          Analyze your resume against ATS systems to improve your chances of getting past automated screening.
        </p>
        <Button onClick={optimize} disabled={loading || !state.generatedResume}>
          {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Optimizing...</> : <><Target className="mr-2 h-4 w-4" /> Run ATS Check</>}
        </Button>
        {!state.generatedResume && (
          <p className="text-sm text-warning mt-2">Generate a resume first in the Resume Builder.</p>
        )}
      </GlassCard>

      {ats && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlassCard variant="accent" className="flex flex-col items-center">
            <div className="relative">
              <ScoreRing score={ats.score} color={ats.score >= 75 ? "accent" : "warning"} label="ATS Score" size={140} />
            </div>
          </GlassCard>

          <div className="space-y-4">
            <GlassCard>
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="h-5 w-5 text-accent" />
                <h3 className="font-display font-semibold text-foreground">Keywords Found</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {ats.keywords.map((k) => (
                  <Badge key={k} className="bg-accent/10 text-accent border-accent/20">{k}</Badge>
                ))}
              </div>
            </GlassCard>

            <GlassCard>
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="h-5 w-5 text-warning" />
                <h3 className="font-display font-semibold text-foreground">Suggestions</h3>
              </div>
              <ul className="space-y-2">
                {ats.suggestions.map((s, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span> {s}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>
        </div>
      )}
    </div>
  );
};

export default ATSPage;
