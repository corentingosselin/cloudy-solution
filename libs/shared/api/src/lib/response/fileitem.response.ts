export interface FileItemResponse {
    name: string;
    preview_url?: string;
    size: number;
    lastModified: Date;
    etag: string;
}