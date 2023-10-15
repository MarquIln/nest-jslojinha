import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { UniqueEmail } from '../validator/email.validator';

export class UpdateUserDTO {
  @IsNotEmpty({ message: 'O nome não pode ser vazio!' })
  @IsOptional()
  name: string;

  @IsEmail(undefined, { message: 'seu email precisa ser valido!' })
  @UniqueEmail({ message: 'Já existe uma conta com esse email.' })
  @IsOptional()
  email: string;

  @MinLength(8, { message: 'A senha precisa ter no minimo 8 caracteres!' })
  @IsOptional()
  password: string;
}
