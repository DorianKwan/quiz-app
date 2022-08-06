export interface Answer {
  id: number;
  question_id: number;
  answer: string;
}

export interface Answers {
  answers: Answer[];
}
