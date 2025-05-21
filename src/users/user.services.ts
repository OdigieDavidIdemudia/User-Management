import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import { GetUsersQueryDto } from 'src/dto/get-users-query.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create({
      ...createUserDto,
      isApproved: false, // Always start as inactive
    });
    return await this.usersRepository.save(user);
  }

  
  async findAllUsers(): Promise<any[]> {
    const users = await this.usersRepository.find({
      order: { createdAt: 'DESC' }
    });
    
    return users.map(user => {
      const { password, ...userWithoutPassword } = user;
      return {
        id: userWithoutPassword.id,
        fullName: userWithoutPassword.fullName,
        email: userWithoutPassword.email,
        accountStatus: userWithoutPassword.isApproved ? 'Active' : 'Inactive',
        registeredDate: userWithoutPassword.createdAt,
      };
    });
  }

  
  async findAllWithPagination(query: GetUsersQueryDto) {
    const { startDate, endDate, page, limit } = query;
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;
    const skip = (pageNum - 1) * limitNum;

    const queryBuilder = this.usersRepository.createQueryBuilder('user');

   
    if (startDate && endDate) {
      queryBuilder.where('user.createdAt BETWEEN :startDate AND :endDate', {
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      });
    }

    
    queryBuilder.skip(skip).take(limitNum);

   
    queryBuilder.orderBy('user.createdAt', 'DESC');

    const [users, total] = await queryBuilder.getManyAndCount();

    return {
      data: users.map(user => {
        const { password, ...userWithoutPassword } = user;
        return {
          id: userWithoutPassword.id,
          fullName: userWithoutPassword.fullName,
          email: userWithoutPassword.email,
          accountStatus: userWithoutPassword.isApproved ? 'Active' : 'Inactive',
          registeredDate: userWithoutPassword.createdAt,
        };
      }),
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum)
      },
    };
  }

  // Get a single user by ID
  async findOne(id: number): Promise<Omit<User, 'password'>> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    
  
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    console.log('Update DTO:', updateUserDto);

    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    
    console.log('Before update:', user);
    

    Object.assign(user, updateUserDto);
    
    console.log('After update:', user);
    
   
    const savedUser = await this.usersRepository.save(user);
    console.log('Saved user:', savedUser);
    
    return savedUser;
  }

 
  async remove(id: number): Promise<void> {
    const user = await this.findOne(id) as User;
    await this.usersRepository.remove(user);
  }

  
  async getUserMetrics() {
    const total = await this.usersRepository.count();
    const active = await this.usersRepository.count({ where: { isApproved: true } });
    const inactive = await this.usersRepository.count({ where: { isApproved: false } });

    return {
      total,
      active,
      inactive,
    };
  }
}
