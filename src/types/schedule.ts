export type ScheduleType = {
  id: number;
  scheduleName: string;
  meetTime: number;
  participant: number;
  assignedSession: number;
  type: "individual"|"grouped"
  scheduleEndDay: string
  scheduleStartDay: string
};
