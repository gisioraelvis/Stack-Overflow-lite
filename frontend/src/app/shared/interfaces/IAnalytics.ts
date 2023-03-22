export interface ISiteAnalytics {
  totalUsers: number;
  totalQuestions: number;
  totalAnswers: number;
  totalComments: number;
  totalTags: number;
  totalVotes: number;
}

export interface ISiteAnalyticsState {
  siteAnalytics: ISiteAnalytics;
  error: string;
  message: string;
}
