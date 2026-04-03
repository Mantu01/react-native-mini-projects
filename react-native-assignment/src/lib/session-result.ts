import questionsData from '@/mock-data/questions.json';
import sessionResultData from '@/mock-data/session-result.json';
import type { Question } from '@/types/question';
import type { SessionResult } from '@/types/session-result';

const questions = questionsData as Question[];
const defaultSession = sessionResultData as SessionResult;

export function getSessionResultForQuestion(questionId: string): SessionResult {
  const question = questions.find((q) => q.id === questionId);
  if (!question) {
    return defaultSession;
  }
  return {
    ...defaultSession,
    questionId: question.id,
    questionText: question.text,
    companyName: question.companyName,
    companyLogoUrl: question.companyLogoUrl,
  };
}
