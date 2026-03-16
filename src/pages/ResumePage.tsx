import { useState, useRef } from "react";
import { useAppContext } from "@/context/AppContext";
import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { generateResume } from "@/lib/ai-engine";
import { Loader2, FileText, Download } from "lucide-react";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import { useReactToPrint } from "react-to-print";

const ResumePage = () => {
  const { state, setJobDescription, setGeneratedResume } = useAppContext();
  const [loading, setLoading] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: resumeRef,
    documentTitle: `${state.profile.name || "Resume"}_CareerFlow`,
  });

  const generate = async () => {
    if (!state.jobDescription.trim()) {
      toast.error("Please enter a job description first.");
      return;
    }
    setLoading(true);
    try {
      const resume = await generateResume(state.profile, state.jobDescription);
      setGeneratedResume(resume);
      toast.success("Resume generated!");
    } catch {
      toast.error("Failed to generate resume.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h1 className="text-3xl font-display font-bold text-foreground">Resume Builder</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Input */}
        <div className="space-y-4">
          <GlassCard>
            <Label className="text-base font-semibold">Job Description</Label>
            <p className="text-sm text-muted-foreground mb-3">Paste the job listing to tailor your resume.</p>
            <Textarea
              value={state.jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the full job description here..."
              rows={12}
            />
            <Button onClick={generate} disabled={loading} className="mt-4 w-full">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...
                </>
              ) : (
                <>
                  <FileText className="mr-2 h-4 w-4" /> Generate Resume
                </>
              )}
            </Button>
          </GlassCard>
        </div>

        {/* Right: Preview */}
        <div className="space-y-4">
          <GlassCard className="min-h-[400px]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-foreground">Preview</h3>
              {state.generatedResume && (
                <Button variant="outline" size="sm" onClick={() => handlePrint()}>
                  <Download className="mr-2 h-4 w-4" /> Download PDF
                </Button>
              )}
            </div>
            {state.generatedResume ? (
              <div
                ref={resumeRef}
                className="prose prose-sm max-w-none text-foreground bg-card p-6 rounded-md border border-border"
              >
                <ReactMarkdown>{state.generatedResume}</ReactMarkdown>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 text-muted-foreground">
                <div className="text-center">
                  <FileText className="h-12 w-12 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">Your resume preview will appear here.</p>
                </div>
              </div>
            )}
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default ResumePage;
