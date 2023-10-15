import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository {
  private users: UserEntity[] = [];

  async save(user: UserEntity) {
    this.users.push(user);
  }

  async list() {
    return this.users;
  }

  private fetchById(id: string) {
    const possibleUser = this.users.find(
      savedUser => savedUser.id === id
    )
    
    if(!possibleUser) {
      throw new Error('Usuário nao existe!')
    }

    return possibleUser
  }

  async fetchUserEmail(email: string) {
    const possibleNewUser = this.users.find(
      user => user.email === email
    )

    return possibleNewUser !== undefined
  }

  async update(id: string, updateData: Partial<UserEntity>) {
    const user = this.fetchById(id)

    Object.entries(updateData).forEach(([key, value]) => {
      if(key === 'id') return

      user[key] = value;
      return user
    })
  }

  async delete(id: string) {
    const user = this.fetchById(id)
    this.users = this.users.filter(
      savedUser => savedUser.id !== id
      )
    return user;
  }
}
