export type ResumeResponse = {
    resumeCore: ResumeCore;
    resumeMeta?: ResumeMeta;
    resumeCloudInformation?: ResumeCloudInformation;
}


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

export type Resume = ResumeResponse

