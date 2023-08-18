import { GenderEnum, UserEntity } from '@fake-twitter/models';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserArgsDto } from './dto/create-user-args.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private readonly memberRepo: Repository<UserEntity>) {}

  async create(args: CreateUserArgsDto) {
    return this.memberRepo.save(this.memberRepo.create(args));
  }

  async update(id: string, args: Partial<UserEntity>) {
    await this.findById(id);

    try {
      await this.memberRepo.update(id, args);

      return this.findById(id);
    } catch (ex: unknown) {
      console.log(ex);

      throw new BadRequestException('Internal Server Error');
    }
  }

  async findById(id: string) {
    try {
      const member = await this.memberRepo.findOne({ where: { id } });

      if (!member) {
        throw new BadRequestException('Member not found');
      }

      return member;
    } catch (ex: unknown) {
      if (ex instanceof BadRequestException) throw ex;

      throw new BadRequestException('Internal Server Error');
    }
  }

  // async findAll(args: FindMemberArgs): Promise<RecordListInterface<MemberEntity>> {
  //   const qb = this.memberRepo.createQueryBuilder('member');

  //   if (args.searchTerm) {
  //     qb.andWhere(
  //       new Brackets((subQb) =>
  //         subQb
  //           .where('member.account LIKE :searchTerm')
  //           .orWhere('member.name LIKE :searchTerm')
  //           .orWhere('member.phone LIKE :searchTerm'),
  //       ),
  //     ).setParameter('searchTerm', `%${args.searchTerm}%`);
  //   }

  //   if (args.sort) {
  //     switch (args.sort) {
  //       case MemberSortEnum.JOINED_AT_ASC:
  //         qb.orderBy('member.createdAt', 'ASC');
  //         break;

  //       case MemberSortEnum.JOINED_AT_DESC:
  //       default:
  //         qb.orderBy('member.createdAt', 'DESC');
  //         break;
  //     }
  //   }

  //   const recordQb = qb.clone().take(args.limit).skip(args.offset);

  //   try {
  //     const [total, records] = await Promise.all([qb.getCount(), recordQb.getMany()]);

  //     return {
  //       pageInfo: getPageInfo({
  //         total,
  //         limit: args.limit,
  //         offset: args.offset,
  //         resource: FindMemberArgs.name,
  //       }),
  //       records,
  //     };
  //   } catch (ex: unknown) {
  //     console.log(ex);

  //     if (ex instanceof BadRequestException) throw ex;

  //     throw new BadRequestException('Internal Server Error');
  //   }
  // }
}
