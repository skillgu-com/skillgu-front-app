export type PlanInput = {
  schedule: string;
  price: number;
  description: string;
  numberOfSessions: number;
  sessionDuration: number;
  responseTime: number;
  additional: string[];
};
