export interface CreateMemberDTO {
    name: string;
}

export interface UpdateMemberDTO {
    name?: string;
}

export interface MemberResponseDTO {
    id: number;
    name: string;
}