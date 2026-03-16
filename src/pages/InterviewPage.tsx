import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { generateInterviewQuestions } from "@/lib/ai-engine";
import { Loader2, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const InterviewPage = () => {
  const { state, setInterviewQuestions } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [revealed, setRevealed] = useState<Set<number>>(new Set());

  const generate = async () => {
    setLoading(true);
    setRevealed(new Set());
    try {
      const questions = await generateInterviewQuestions(state.profile, state.jobDescription);
      setInterviewQuestions(questions);
      toast.success("Questions generated!");
    } catch {
      toast.error("Generation failed.");
    } finally {
      setLoading(false);
    }
  };

  const toggleReveal = (i: number) => {
    setRevealed((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-display font-bold text-foreground">Interview Prep</h1>

      <GlassCard>
        <p className="text-muted-foreground mb-4">
          Generate tailored interview questions based on your profile and target job.
        </p>
        <Button onClick={generate} disabled={loading}>
          {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</> : <><MessageSquare className="mr-2 h-4 w-4" /> Generate Questions</>}
        </Button>
      </GlassCard>

      {state.interviewQuestions.length > 0 && (
        <div className="space-y-3">
          {state.interviewQuestions.map((q, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <GlassCard className="cursor-pointer" onClick={() => toggleReveal(i)}>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-md bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-medium text-foreground">{q}</p>
                    {revealed.has(i) && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="text-sm text-muted-foreground mt-2"
                      >
                        💡 Tip: Structure your answer using the STAR method (Situation, Task, Action, Result).
                      </motion.p>
                    )}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InterviewPage;
