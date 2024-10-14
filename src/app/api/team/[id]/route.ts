import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { UpdateTeamDTO } from '@/app/dtos/team.dto';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const teamId = parseInt(params.id);
  const data: UpdateTeamDTO = await req.json();

  try {
    const existingTeam = await prisma.team.findUnique({
      where: { id: teamId },
    });

    if (!existingTeam) {
      return NextResponse.json({ error: 'Equipe não encontrada' }, { status: 404 });
    }
    
    const updateData: any = { name: data.name };

    // Se a lista de membros for enviada, atualiza os membros
    if (data.members) {
      updateData.members = {
        deleteMany: {}, // Remove todos os membros anteriores
        create: data.members.map((memberId: number) => ({ memberId })),
      };
    }

    const updatedTeam = await prisma.team.update({
      where: { id: teamId },
      data: updateData,
    });

    return NextResponse.json(updatedTeam);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao atualizar equipe' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const teamId = parseInt(params.id);

  try {
    const existingTeam = await prisma.team.findUnique({
      where: { id: teamId },
    });

    if (!existingTeam) {
      return NextResponse.json({ error: 'Equipe não encontrada' }, { status: 404 });
    }

    // Deleta membros associados à equipe
    await prisma.teamMember.deleteMany({
      where: { teamId },
    });

    // Deleta a equipe
    await prisma.team.delete({
      where: { id: teamId },
    });

    return NextResponse.json({ message: 'Equipe deletada com sucesso' });
  } catch (error: any) {
    console.error('Erro ao deletar equipe:', error);
    return NextResponse.json({ error: 'Erro ao deletar equipe', details: error.message }, { status: 500 });
  }
}