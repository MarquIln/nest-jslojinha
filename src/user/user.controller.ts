import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';
import { createUserDTO } from './userDto/createUser.dto';
import { ListUserDTO } from './userDto/listUser.dto';
import { UpdateUserDTO } from './userDto/updateUser.dto';
@Controller('/users')
export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  @Post()
  async createUser(@Body() userData: createUserDTO) {
    const userEntity = new UserEntity();

    userEntity.id = uuid();
    userEntity.name = userData.name;
    userEntity.password = userData.password;
    userEntity.email = userData.email;

    this.userRepository.save(userEntity);
    return {
      user: new ListUserDTO(userEntity.id, userEntity.name),
      message: 'Criado com sucesso!',
    };
  }

  @Get()
  async listUsers() {
    const validatedUsers = await this.userRepository.list();
    const listUsers = validatedUsers.map(
      (user) => new ListUserDTO(user.id, user.name),
    );

    return listUsers;
  }

  @Put('/:id')
  async UpdateUser(@Param('id') id: string, @Body() newData: UpdateUserDTO) {
    const updatedUser = await this.userRepository.update(id, newData);

    return {
      user: updatedUser,
      message: 'Usuário atualizado com sucesso',
    };
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    const removedUser = await this.userRepository.delete(id);

    return {
      user: removedUser,
      message: 'Usuário removido com sucesso',
    };
  }
}
