import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { GlassCard } from "@/components/GlassCard";
import { ScoreRing } from "@/components/ScoreRing";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { analyzeSkills } from "@/lib/ai-engine";
import { Loader2, BrainCircuit, CheckCircle2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

const SkillsPage = () => {
  const { state, setJobDescription, setSkillAnalysis } = useAppContext();
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    if (!state.jobDescription.trim()) {
      toast.error("Please enter a job description.");
      return;
    }
    if (state.profile.skills.length === 0) {
      toast.error("Add skills to your profile first.");
      return;
    }
    setLoading(true);
    try {
      const result = await analyzeSkills(state.profile.skills, state.jobDescription);
      setSkillAnalysis(result);
      toast.success("Analysis complete!");
    } catch {
      toast.error("Analysis failed.");
    } finally {
      setLoading(false);
    }
  };

  const analysis = state.skillAnalysis;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-display font-bold text-foreground">Skill Analyzer</h1>

      <GlassCard>
        <Label className="text-base font-semibold">Job Description</Label>
        <Textarea
          value={state.jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the job description to analyze skill match..."
          rows={6}
          className="mt-2"
        />
        <Button onClick={analyze} disabled={loading} className="mt-4">
          {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...</> : <><BrainCircuit className="mr-2 h-4 w-4" /> Analyze Skills</>}
        </Button>
      </GlassCard>

      {analysis && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard variant="accent" className="flex flex-col items-center">
            <div className="relative">
              <ScoreRing score={analysis.score} color="accent" label="Match Score" />
            </div>
          </GlassCard>

          <GlassCard>
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="h-5 w-5 text-accent" />
              <h3 className="font-display font-semibold text-foreground">Matched Skills</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {analysis.matchedSkills.map((s) => (
                <Badge key={s} className="bg-accent/10 text-accent border-accent/20">{s}</Badge>
              ))}
              {analysis.matchedSkills.length === 0 && <p className="text-sm text-muted-foreground">No direct matches found.</p>}
            </div>
          </GlassCard>

          <GlassCard>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="h-5 w-5 text-warning" />
              <h3 className="font-display font-semibold text-foreground">Skill Gaps</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {analysis.missingSkills.map((s) => (
                <Badge key={s} variant="outline" className="border-warning/30 text-warning">{s}</Badge>
              ))}
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
};

export default SkillsPage;
