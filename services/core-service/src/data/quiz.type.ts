export interface Answer {
  id: number;
  question_id: number;
  answer: string;
}

export interface Question {
  id: number;
  question: string;
  options: string[];
}

export interface Questions {
  questions: Question[];
}
