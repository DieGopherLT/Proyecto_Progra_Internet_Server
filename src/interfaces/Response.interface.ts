export interface UploadResponse{
    msg?: string;
    img?: string | null | Buffer;
}

export interface StudentResponse{
    msg?: string;
    token?: string;
    studentCreated?: boolean;
}
