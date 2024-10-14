import { MemberResponseDTO } from "./member.dto";

export interface CreateTeamDTO {
    name: string;
    members: number[];  // IDs dos membros associados ao time
}

export interface UpdateTeamDTO {
    name?: string;
    members?: number[];
}

export interface TeamResponseDTO {
    id: number;
    name: string;
    members: MemberResponseDTO[];
}
