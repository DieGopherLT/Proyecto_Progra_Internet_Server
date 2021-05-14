export interface UploadResponse{
    msg?: string;
    img?: string | null;
}

export interface StudentResponse{
    msg?: string;
    token?: string;
    studentCreated?: boolean;
}

export interface AuthVerifyResponse{
    msg: string;
}
