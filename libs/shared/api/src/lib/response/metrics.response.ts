export interface MetricsResponse {
    total_files: number | string;
    user_amount: number | string;
    
    total_size: string;
    total_space: string;
    used_space: string;

    used_space_percentage: string;
    average_file_per_user: number | string;
    average_used_space_per_user: number | string;
}