export interface DocumentRequest {
    id?: string;
    mimeType: string;
    fileName: string;
    file: string;
}

export interface DocumentResponse {
    id: string;
    mimeType: string;
    fileName: string;
    dateUploaded: string;
}