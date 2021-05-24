export interface UploadResponse{
    msg?: string;
    img?: string | null | Buffer;
}

export interface StudentResponse{
    msg?: string;
    studentCreated?: boolean;
}
