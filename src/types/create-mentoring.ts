export type PlanInput = {
  schedule: string;
  price: number | string;
  description: string;
  sessionsPerMonth: number | string;
  sessionDuration: number;
  responseTime: number;
  // additional: string[];
  planIncludes: string[];
  planType: "basic" | "advanced" | "pro";
  mentorshipId: number;
};
