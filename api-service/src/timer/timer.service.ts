import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TimerRoundDto, TimerSessionDto } from './dto/timer.dto';

@Injectable()
export class TimerService {
  constructor(private prisma: PrismaService) {}

  async getTodaySession(userId: string) {
    const today = new Date().toISOString().split('T')[0];

    //TODO: move to service, addressing prisma directly is not allowed here
    return this.prisma.timerSession.findFirst({
      where: {
        createdAt: {
          // greater than or equel
          gte: new Date(today),
        },
        userId,
      },
      include: {
        rounds: {
          orderBy: {
            id: 'asc',
          },
        },
      },
    });
  }

  async create(userId: string) {
    const todaySession = await this.getTodaySession(userId);

    if (todaySession) return todaySession;

    //TODO: move to service, addressing prisma directly is not allowed here
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        intervalsCount: true,
      },
    });

    if (!user) throw new NotFoundException('User not found');

    //TODO: move to service, addressing prisma directly is not allowed here
    return this.prisma.timerSession.create({
      data: {
        rounds: {
          createMany: {
            data: Array.from({ length: user.intervalsCount }, () => ({
              totalSeconds: 0,
            })),
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
      include: {
        rounds: true,
      },
    });
  }

  async update(dto: Partial<TimerSessionDto>, timerId: string, userId: string) {
    //TODO: move to service, addressing prisma directly is not allowed here
    return this.prisma.timerSession.update({
      where: {
        userId,
        id: timerId,
      },
      data: dto,
    });
  }

  async updateRound(dto: Partial<TimerRoundDto>, roundId: string) {
    //TODO: move to service, addressing prisma directly is not allowed here
    return this.prisma.timerRound.update({
      where: {
        id: roundId,
      },
      data: dto,
    });
  }

  async deleteSession(sessionId: string, userId: string) {
    //TODO: move to service, addressing prisma directly is not allowed here
    return this.prisma.timerSession.delete({
      where: {
        id: sessionId,
        userId,
      },
    });
  }
}
