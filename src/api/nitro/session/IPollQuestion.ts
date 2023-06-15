import { IPollChoice } from '@/api'

export interface IPollQuestion {
  questionId: number;
  questionType: number;
  sortOrder: number;
  questionText: string;
  questionCategory: number;
  questionAnswerType: number;
  questionAnswerCount: number;
  children: IPollQuestion[];
  questionChoices: IPollChoice[];
}
