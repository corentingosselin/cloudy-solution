export interface FileItemResponse {
    filename: string;
    preview_url?: string;
    download_url: string;
    size: number;
    mime_type: string;
    created_at: string;
}