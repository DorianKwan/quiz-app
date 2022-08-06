export interface QuestionAnswer {
  answer: string;
  is_correct: boolean;
}

export interface Question {
  id: number;
  question: string;
  answers: QuestionAnswer[];
}

export interface Questions {
  questions: Question[];
}
