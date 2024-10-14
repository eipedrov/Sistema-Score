import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { CreateMemberDTO, MemberResponseDTO } from '@/app/dtos/member.dto';

export async function POST(req: NextRequest) {
    const { name } : CreateMemberDTO  = await req.json();
    try {
        const newMember: MemberResponseDTO = await prisma.member.create({
            data: { name },
        });
        return NextResponse.json(newMember, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao criar membro' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const members: MemberResponseDTO[] = await prisma.member.findMany({
            orderBy: { id: "asc"}
        });
        return NextResponse.json(members);
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao buscar membros' }, { status: 500 });
    }
}