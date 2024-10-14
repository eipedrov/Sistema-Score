import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { CreateTeamDTO, TeamResponseDTO } from '@/app/dtos/team.dto';

export async function POST(req: NextRequest) {
  const data: CreateTeamDTO = await req.json();
  try {
    const newTeam = await prisma.team.create({
      data: {
        name: data.name,
        members: {
          create: data.members.map((memberId: number) => ({ memberId })),
        },
      },
    });
    return NextResponse.json(newTeam, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao criar equipe' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const teams = await prisma.team.findMany({
      include: {
        members: {
          select: {
            member: true
          },
        },
      },
    });

    const formattedTeams: TeamResponseDTO[] = [
      ...teams.map((team) => ({
        ...team,
        members: team.members.map((teamMember) => teamMember.member),
      })),
    ]

    return NextResponse.json(formattedTeams);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar equipes' }, { status: 500 });
  }
}