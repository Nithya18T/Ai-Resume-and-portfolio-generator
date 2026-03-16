import { SkillAnalysis, ATSResult, UserProfile } from "@/context/AppContext";

// Local AI simulation — these functions simulate AI processing
// In production, connect to Lovable Cloud with real AI models

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function analyzeSkills(
  skills: string[],
  jobDescription: string
): Promise<SkillAnalysis> {
  await delay(1500);
  const jdLower = jobDescription.toLowerCase();
  const matched = skills.filter((s) => jdLower.includes(s.toLowerCase()));
  const commonSkills = [
    "React", "TypeScript", "Node.js", "Python", "AWS", "Docker",
    "SQL", "GraphQL", "REST API", "Git", "CI/CD", "Agile",
    "MongoDB", "PostgreSQL", "Kubernetes", "TDD",
  ];
  const missing = commonSkills
    .filter((s) => jdLower.includes(s.toLowerCase()) && !skills.some((sk) => sk.toLowerCase() === s.toLowerCase()))
    .slice(0, 5);
  const score = skills.length > 0 ? Math.round((matched.length / (matched.length + missing.length)) * 100) || 45 : 0;
  return { matchedSkills: matched, missingSkills: missing.length > 0 ? missing : ["Leadership", "System Design"], score };
}

export async function generateResume(
  profile: UserProfile,
  jobDescription: string
): Promise<string> {
  await delay(2000);
  const skillsList = profile.skills.length > 0 ? profile.skills.join(" • ") : "JavaScript • React • TypeScript";
  const expSection = profile.experience
    .filter((e) => e.title)
    .map((e) => `**${e.title}** at ${e.company} (${e.duration})\n${e.description}`)
    .join("\n\n");
  const eduSection = profile.education
    .filter((e) => e.degree)
    .map((e) => `**${e.degree}** — ${e.institution} (${e.year})`)
    .join("\n");
  const projSection = profile.projects
    .filter((p) => p.name)
    .map((p) => `**${p.name}** — ${p.description}\n*Technologies: ${p.technologies}*`)
    .join("\n\n");

  return `# ${profile.name || "Your Name"}

**${profile.email || "email@example.com"}** | ${profile.phone || "(555) 123-4567"} | ${profile.location || "City, State"}

---

## Professional Summary

${profile.summary || "Results-driven professional with expertise in modern web technologies and a passion for building scalable applications. Proven track record of delivering high-quality solutions that drive business value."}

---

## Technical Skills

${skillsList}

---

## Professional Experience

${expSection || "**Software Engineer** at Tech Company (2022 – Present)\nDeveloped and maintained web applications using React and TypeScript. Led a team of 3 developers to deliver features on time."}

---

## Education

${eduSection || "**B.S. Computer Science** — University (2022)"}

---

## Projects

${projSection || "**Portfolio Platform** — A modern portfolio generator built with React\n*Technologies: React, TypeScript, Tailwind CSS*"}
`;
}

export async function optimizeATS(
  resume: string,
  jobDescription: string
): Promise<ATSResult> {
  await delay(1800);
  const keywords = [
    "leadership", "agile", "scalable", "collaboration", "data-driven",
    "cross-functional", "stakeholders", "metrics", "optimization",
  ];
  const found = keywords.filter((k) => resume.toLowerCase().includes(k));
  const missing = keywords.filter((k) => !resume.toLowerCase().includes(k)).slice(0, 4);
  const score = Math.min(95, 55 + found.length * 5);
  const suggestions = [
    `Add keywords: ${missing.join(", ")}`,
    "Use action verbs at the start of bullet points",
    "Quantify achievements with numbers and percentages",
    "Keep formatting simple — avoid tables and graphics",
    "Match job title exactly as listed in the posting",
  ];
  return { score, suggestions, keywords: found };
}

export async function generateInterviewQuestions(
  profile: UserProfile,
  jobDescription: string
): Promise<string[]> {
  await delay(1500);
  const baseQuestions = [
    `Tell me about your experience with ${profile.skills[0] || "your primary technology"}.`,
    "Describe a challenging project you led and its outcome.",
    "How do you handle tight deadlines and competing priorities?",
    `Walk me through your project: ${profile.projects[0]?.name || "a recent project"}.`,
    "What is your approach to code reviews and quality assurance?",
    "How do you stay current with industry trends and new technologies?",
    "Describe a time you had to learn a new technology quickly.",
    "How would you design a system that handles millions of requests?",
    "Tell me about a time you disagreed with a team member. How did you resolve it?",
    "Where do you see yourself in the next 3-5 years?",
  ];
  return baseQuestions;
}

export async function generatePortfolio(profile: UserProfile): Promise<string> {
  await delay(2000);
  const projects = profile.projects
    .filter((p) => p.name)
    .map(
      (p) => `
    <div style="background:#f8fafc;border-radius:12px;padding:24px;margin-bottom:16px;">
      <h3 style="margin:0 0 8px;color:#4F46E5;">${p.name}</h3>
      <p style="margin:0 0 8px;color:#374151;">${p.description}</p>
      <p style="margin:0;color:#6B7280;font-size:14px;">Tech: ${p.technologies}</p>
      ${p.link ? `<a href="${p.link}" style="color:#4F46E5;font-size:14px;">View Project →</a>` : ""}
    </div>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>${profile.name || "Portfolio"}</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',sans-serif;background:#fff;color:#111827}
.hero{background:linear-gradient(135deg,#4F46E5,#7C3AED);color:#fff;padding:80px 24px;text-align:center}
.hero h1{font-size:48px;font-weight:700;margin-bottom:16px}
.hero p{font-size:20px;opacity:0.9}
.section{max-width:800px;margin:0 auto;padding:60px 24px}
.section h2{font-size:28px;font-weight:600;margin-bottom:24px;color:#111827}
.skills{display:flex;flex-wrap:wrap;gap:8px}
.skill{background:#EEF2FF;color:#4F46E5;padding:6px 16px;border-radius:20px;font-size:14px;font-weight:500}
</style>
</head>
<body>
<div class="hero">
<h1>${profile.name || "Your Name"}</h1>
<p>${profile.summary || "Creative Developer & Problem Solver"}</p>
</div>
<div class="section">
<h2>Skills</h2>
<div class="skills">
${(profile.skills.length > 0 ? profile.skills : ["React", "TypeScript", "Tailwind"]).map((s) => `<span class="skill">${s}</span>`).join("")}
</div>
</div>
<div class="section">
<h2>Projects</h2>
${projects || '<p style="color:#6B7280">Add projects to your profile to see them here.</p>'}
</div>
</body>
</html>`;
}
