export interface SessionResult {
  questionId: string;
  questionText: string;
  companyName: string;
  companyLogoUrl: string;
  smartSummary: {
    whatWorkedWell: string[];
    overallTakeaways: string[];
  };
  keyMoments: {
    timestamp: string;
    description: string;
    type: 'positive' | 'negative';
  }[];
  audioDurationSeconds: number;
}
