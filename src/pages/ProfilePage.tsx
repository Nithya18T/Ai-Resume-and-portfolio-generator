import { useState } from "react";
import { useAppContext, Education, Experience, Project } from "@/context/AppContext";
import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Check } from "lucide-react";
import { toast } from "sonner";

const ProfilePage = () => {
  const { state, updateProfile } = useAppContext();
  const [step, setStep] = useState(0);
  const [skillInput, setSkillInput] = useState("");

  const p = state.profile;

  const addSkill = () => {
    const s = skillInput.trim();
    if (s && !p.skills.includes(s)) {
      updateProfile({ skills: [...p.skills, s] });
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    updateProfile({ skills: p.skills.filter((s) => s !== skill) });
  };

  const addEducation = () => updateProfile({ education: [...p.education, { degree: "", institution: "", year: "" }] });
  const updateEdu = (i: number, field: keyof Education, val: string) => {
    const edu = [...p.education];
    edu[i] = { ...edu[i], [field]: val };
    updateProfile({ education: edu });
  };

  const addExperience = () => updateProfile({ experience: [...p.experience, { title: "", company: "", duration: "", description: "" }] });
  const updateExp = (i: number, field: keyof Experience, val: string) => {
    const exp = [...p.experience];
    exp[i] = { ...exp[i], [field]: val };
    updateProfile({ experience: exp });
  };

  const addProject = () => updateProfile({ projects: [...p.projects, { name: "", description: "", technologies: "", link: "" }] });
  const updateProj = (i: number, field: keyof Project, val: string) => {
    const proj = [...p.projects];
    proj[i] = { ...proj[i], [field]: val };
    updateProfile({ projects: proj });
  };

  const steps = ["Personal Info", "Skills", "Education", "Experience", "Projects"];

  const save = () => {
    toast.success("Profile saved successfully!");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-display font-bold text-foreground">Your Profile</h1>

      {/* Stepper */}
      <div className="flex items-center gap-2">
        {steps.map((s, i) => (
          <button
            key={s}
            onClick={() => setStep(i)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              i === step
                ? "bg-primary text-primary-foreground"
                : i < step
                ? "bg-accent/10 text-accent"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {i < step ? <Check className="h-3.5 w-3.5" /> : <span>{i + 1}</span>}
            <span className="hidden sm:inline">{s}</span>
          </button>
        ))}
      </div>

      <GlassCard>
        {step === 0 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Full Name</Label>
                <Input value={p.name} onChange={(e) => updateProfile({ name: e.target.value })} placeholder="John Doe" />
              </div>
              <div>
                <Label>Email</Label>
                <Input value={p.email} onChange={(e) => updateProfile({ email: e.target.value })} placeholder="john@example.com" />
              </div>
              <div>
                <Label>Phone</Label>
                <Input value={p.phone} onChange={(e) => updateProfile({ phone: e.target.value })} placeholder="(555) 123-4567" />
              </div>
              <div>
                <Label>Location</Label>
                <Input value={p.location} onChange={(e) => updateProfile({ location: e.target.value })} placeholder="San Francisco, CA" />
              </div>
            </div>
            <div>
              <Label>Professional Summary</Label>
              <Textarea value={p.summary} onChange={(e) => updateProfile({ summary: e.target.value })} placeholder="Brief summary of your career..." rows={4} />
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <Label>Skills</Label>
            <div className="flex gap-2">
              <Input
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                placeholder="Add a skill (e.g. React)"
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
              />
              <Button onClick={addSkill} size="sm"><Plus className="h-4 w-4" /></Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {p.skills.map((s) => (
                <Badge key={s} variant="secondary" className="gap-1 pl-3">
                  {s}
                  <button onClick={() => removeSkill(s)}><X className="h-3 w-3" /></button>
                </Badge>
              ))}
              {p.skills.length === 0 && <p className="text-sm text-muted-foreground">No skills added yet.</p>}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            {p.education.map((edu, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 rounded-md bg-muted/50">
                <div>
                  <Label>Degree</Label>
                  <Input value={edu.degree} onChange={(e) => updateEdu(i, "degree", e.target.value)} placeholder="B.S. Computer Science" />
                </div>
                <div>
                  <Label>Institution</Label>
                  <Input value={edu.institution} onChange={(e) => updateEdu(i, "institution", e.target.value)} placeholder="MIT" />
                </div>
                <div>
                  <Label>Year</Label>
                  <Input value={edu.year} onChange={(e) => updateEdu(i, "year", e.target.value)} placeholder="2022" />
                </div>
              </div>
            ))}
            <Button variant="outline" onClick={addEducation} size="sm"><Plus className="h-4 w-4 mr-1" /> Add Education</Button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            {p.experience.map((exp, i) => (
              <div key={i} className="space-y-3 p-4 rounded-md bg-muted/50">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <Label>Title</Label>
                    <Input value={exp.title} onChange={(e) => updateExp(i, "title", e.target.value)} placeholder="Software Engineer" />
                  </div>
                  <div>
                    <Label>Company</Label>
                    <Input value={exp.company} onChange={(e) => updateExp(i, "company", e.target.value)} placeholder="Google" />
                  </div>
                  <div>
                    <Label>Duration</Label>
                    <Input value={exp.duration} onChange={(e) => updateExp(i, "duration", e.target.value)} placeholder="2022 – Present" />
                  </div>
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea value={exp.description} onChange={(e) => updateExp(i, "description", e.target.value)} placeholder="Key responsibilities and achievements..." rows={3} />
                </div>
              </div>
            ))}
            <Button variant="outline" onClick={addExperience} size="sm"><Plus className="h-4 w-4 mr-1" /> Add Experience</Button>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            {p.projects.map((proj, i) => (
              <div key={i} className="space-y-3 p-4 rounded-md bg-muted/50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label>Project Name</Label>
                    <Input value={proj.name} onChange={(e) => updateProj(i, "name", e.target.value)} placeholder="My App" />
                  </div>
                  <div>
                    <Label>Technologies</Label>
                    <Input value={proj.technologies} onChange={(e) => updateProj(i, "technologies", e.target.value)} placeholder="React, Node.js" />
                  </div>
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea value={proj.description} onChange={(e) => updateProj(i, "description", e.target.value)} placeholder="What does it do?" rows={2} />
                </div>
                <div>
                  <Label>Link</Label>
                  <Input value={proj.link} onChange={(e) => updateProj(i, "link", e.target.value)} placeholder="https://github.com/..." />
                </div>
              </div>
            ))}
            <Button variant="outline" onClick={addProject} size="sm"><Plus className="h-4 w-4 mr-1" /> Add Project</Button>
          </div>
        )}

        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>
            Back
          </Button>
          <div className="flex gap-2">
            {step === steps.length - 1 ? (
              <Button onClick={save}>Save Profile</Button>
            ) : (
              <Button onClick={() => setStep(Math.min(steps.length - 1, step + 1))}>
                Next
              </Button>
            )}
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default ProfilePage;
