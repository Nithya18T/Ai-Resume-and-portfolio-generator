import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Education {
  degree: string;
  institution: string;
  year: string;
}

export interface Experience {
  title: string;
  company: string;
  duration: string;
  description: string;
}

export interface Project {
  name: string;
  description: string;
  technologies: string;
  link: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  skills: string[];
  education: Education[];
  experience: Experience[];
  projects: Project[];
}

export interface AppState {
  profile: UserProfile;
  jobDescription: string;
  generatedResume: string;
  skillAnalysis: SkillAnalysis | null;
  atsScore: ATSResult | null;
  interviewQuestions: string[];
  portfolioHtml: string;
}

export interface SkillAnalysis {
  matchedSkills: string[];
  missingSkills: string[];
  score: number;
}

export interface ATSResult {
  score: number;
  suggestions: string[];
  keywords: string[];
}

const defaultProfile: UserProfile = {
  name: "",
  email: "",
  phone: "",
  location: "",
  summary: "",
  skills: [],
  education: [{ degree: "", institution: "", year: "" }],
  experience: [{ title: "", company: "", duration: "", description: "" }],
  projects: [{ name: "", description: "", technologies: "", link: "" }],
};

const defaultState: AppState = {
  profile: defaultProfile,
  jobDescription: "",
  generatedResume: "",
  skillAnalysis: null,
  atsScore: null,
  interviewQuestions: [],
  portfolioHtml: "",
};

interface AppContextType {
  state: AppState;
  updateProfile: (profile: Partial<UserProfile>) => void;
  setJobDescription: (jd: string) => void;
  setGeneratedResume: (resume: string) => void;
  setSkillAnalysis: (analysis: SkillAnalysis | null) => void;
  setAtsScore: (score: ATSResult | null) => void;
  setInterviewQuestions: (questions: string[]) => void;
  setPortfolioHtml: (html: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within AppProvider");
  return ctx;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AppState>(defaultState);

  const updateProfile = (partial: Partial<UserProfile>) => {
    setState((prev) => ({ ...prev, profile: { ...prev.profile, ...partial } }));
  };

  const setJobDescription = (jd: string) => setState((prev) => ({ ...prev, jobDescription: jd }));
  const setGeneratedResume = (resume: string) => setState((prev) => ({ ...prev, generatedResume: resume }));
  const setSkillAnalysis = (analysis: SkillAnalysis | null) => setState((prev) => ({ ...prev, skillAnalysis: analysis }));
  const setAtsScore = (score: ATSResult | null) => setState((prev) => ({ ...prev, atsScore: score }));
  const setInterviewQuestions = (questions: string[]) => setState((prev) => ({ ...prev, interviewQuestions: questions }));
  const setPortfolioHtml = (html: string) => setState((prev) => ({ ...prev, portfolioHtml: html }));

  return (
    <AppContext.Provider
      value={{
        state,
        updateProfile,
        setJobDescription,
        setGeneratedResume,
        setSkillAnalysis,
        setAtsScore,
        setInterviewQuestions,
        setPortfolioHtml,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
