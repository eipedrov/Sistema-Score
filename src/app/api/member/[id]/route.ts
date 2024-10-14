import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const memberId = parseInt(params.id);
  const { name } = await req.json();

  try {
    const existingMember = await prisma.member.findUnique({
      where: { id: memberId }
    })

    if (!existingMember) {
      return NextResponse.json({ error: "membro não encontrado" }, { status: 404 })
    }

    const updatedMember = await prisma.member.update({
      where: { id: memberId },
      data: { name },
    });
    return NextResponse.json(updatedMember);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao atualizar membro' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const memberId = parseInt(params.id);

  try {
    const existingMember = await prisma.member.findUnique({
      where: { id: memberId }
    })

    if (!existingMember) {
      return NextResponse.json({ error: "membro não encontrado" }, { status: 404 })
    }

    await prisma.teamMember.deleteMany({
      where: { memberId: memberId }
    })

    await prisma.member.delete({ where: { id: memberId } });
    return NextResponse.json({ message: 'Membro deletado com sucesso' });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao deletar membro' }, { status: 500 });
  }
}