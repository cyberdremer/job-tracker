export interface ResumeResponse {
  resumeCore: ResumeCore;
  resumeMeta?: ResumeMeta;
  resumeCloudInformation?: ResumeCloudInformation;
}

export type Resume = ResumeResponse;

export interface ResumeCore {
  resumeId: number;
  fileName: string;
}

export interface ResumeMeta {
  mimeType: string;
  size: number;
  uploadedAt: Date;
}

export interface ResumeCloudInformation {
  cloudinaryPublicId: string;
  cloudinaryPublicUrl: string;
}
