
export interface Student  {
    code: string;
    name: string;
    university: string;
    career: string;
    profilePicture?: string | null;
}

export interface JWT_PAYLOAD{
    student: Student;
}
