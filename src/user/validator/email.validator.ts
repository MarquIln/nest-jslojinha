import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { UserRepository } from '../user.repository';

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailValidator implements ValidatorConstraintInterface {
  constructor(private readonly userRepository: UserRepository) {}

  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const possibleNewUser = await this.userRepository.fetchUserByEmail(value);
    return !possibleNewUser;
  }
}

export const UniqueEmail = (validationOptions: ValidationOptions) => {
  return (object: Object, props: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: props,
      options: validationOptions,
      constraints: [],
      validator: EmailValidator
    })
  }
}