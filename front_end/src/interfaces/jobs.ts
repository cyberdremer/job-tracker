export type JobStatus =
  | "APPLYING"
  | "INTERVIEWING"
  | "REJECTED"
  | "ACCEPTED"
  | "CLOSED"
  | "AWAITNG"
  | "APPLIED";

export interface JobCore {
  id: string | number;
  title: string;
  company: string;
  location: string;
  salary: string;
  dateapplied: Date;
}

export interface JobMeta {
  description?: string;
  link?: string;
  status: JobStatus;
}

export interface JobFeedback {
    rating?: number;
    feedbackMessage?: string;
}

export interface JobResponse {
    job: JobCore;
    meta?: JobMeta;
    feedback?: JobFeedback;
}


export type JobItem = JobResponse
