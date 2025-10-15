import { Status } from "@prisma/client";

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
  status: Status;
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



