export interface Question {
  id: number;
  question: string;
  options: string[];
}

export interface Questions {
  questions: Question[];
}
