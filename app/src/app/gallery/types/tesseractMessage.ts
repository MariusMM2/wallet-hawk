export interface TesseractMessage {
    status: string;
    progress: number;
    workerId?: string;
    jobId?: string;
}
