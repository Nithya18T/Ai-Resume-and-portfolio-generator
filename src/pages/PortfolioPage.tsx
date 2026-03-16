import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { generatePortfolio } from "@/lib/ai-engine";
import { Loader2, Globe, ExternalLink } from "lucide-react";
import { toast } from "sonner";

const PortfolioPage = () => {
  const { state, setPortfolioHtml } = useAppContext();
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    try {
      const html = await generatePortfolio(state.profile);
      setPortfolioHtml(html);
      toast.success("Portfolio generated!");
    } catch {
      toast.error("Generation failed.");
    } finally {
      setLoading(false);
    }
  };

  const openInNewTab = () => {
    const blob = new Blob([state.portfolioHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-3xl font-display font-bold text-foreground">Portfolio Generator</h1>

      <GlassCard>
        <p className="text-muted-foreground mb-4">
          Generate a personal portfolio website from your profile data.
        </p>
        <div className="flex gap-2">
          <Button onClick={generate} disabled={loading}>
            {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</> : <><Globe className="mr-2 h-4 w-4" /> Generate Portfolio</>}
          </Button>
          {state.portfolioHtml && (
            <Button variant="outline" onClick={openInNewTab}>
              <ExternalLink className="mr-2 h-4 w-4" /> Open in New Tab
            </Button>
          )}
        </div>
      </GlassCard>

      {state.portfolioHtml && (
        <GlassCard className="p-0 overflow-hidden">
          <iframe
            srcDoc={state.portfolioHtml}
            className="w-full h-[600px] border-0 rounded-lg"
            title="Portfolio Preview"
          />
        </GlassCard>
      )}
    </div>
  );
};

export default PortfolioPage;
