import { ResumeJobFeedback, Status } from "@prisma/client";
export interface SuccessfullServerResponse<T = undefined> {
  data: {
    message: string;
    status: number;
    object?: T;
  };
}

export type JobEntryFiltered = {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  updatedAt: Date;
  dateApplied: Date;
  status: Status;
};

export type ResumeJobFiltered = {
  id: number;
  rating: number;
  name: string;
};

export type ResumeFiltered = {
  id: number;
  name: string;
  cloudinarylink: string;
  cloudinarypublicid: string;
  mimetype: string;
  filesize: number;
  originalfilename: string;
  uploadedat: Date;
  lastmodified: Date;
};
