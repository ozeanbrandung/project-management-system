import { Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { PrismaService } from 'src/prisma.service';
import { UserDto } from './dto/user.dto';
import { startOfDay, subDays } from 'date-fns';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getById(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        tasks: true,
      },
    });
  }

  async getByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  //TODO: move statistics to it's own entity
  async getProfile(id: string) {
    const profile = await this.getById(id);

    const totalTasks = profile.tasks.length;
    //TODO: move to service, do not address here prisma directly!
    const completedTasks = await this.prisma.task.count({
      where: {
        userId: id,
        isCompleted: true,
      },
    });

    const todayStart = startOfDay(new Date());

    const weekStart = startOfDay(subDays(new Date(), 7));

    //TODO: move to service, do not address here prisma directly!
    const todayTasks = await this.prisma.task.count({
      where: {
        userId: id,
        createdAt: {
          //greater than or equal (lte <=, gte >=, lt <, gt >)
          gte: todayStart.toISOString(),
        },
      },
    });

    const weekTasks = await this.prisma.task.count({
      where: {
        userId: id,
        createdAt: {
          //greater than or equal (lte <=, gte >=, lt <, gt >)
          gte: weekStart.toISOString(),
        },
      },
    });

    const { password, ...user } = profile;

    //TODO: move strings to json
    return {
      user,
      statistics: [
        { label: 'Всего задач', value: totalTasks },
        { label: 'Завершенные задачи', value: completedTasks },
        { label: 'Задачи на сегодня', value: todayTasks },
        { label: 'Задачи на неделю', value: weekTasks },
      ],
    };
  }

  async create(dto: AuthDto) {
    const user = {
      email: dto.email,
      name: '',
      password: await hash(dto.password),
    };

    return this.prisma.user.create({
      data: user,
    });
  }

  async update(id: string, dto: UserDto) {
    let data = dto;

    if (dto.password) {
      data = { ...dto, password: await hash(dto.password) };
    }

    return this.prisma.user.update({
      where: {
        id,
      },
      data,
      select: {
        name: true,
        email: true,
      },
    });
  }
}
