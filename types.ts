export interface SubTopic {
  name: string;
}

export interface Unit {
  id: string;
  title: string;
  subtitle: string;
  topics: string[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number; // Index of the correct option
  explanation: string;
}

export type ViewState = 'DASHBOARD' | 'UNIT_DETAIL';

export type TabState = 'STUDY' | 'QUIZ' | 'CASES';