import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { UniqueEmail } from '../validator/email.validator';

export class createUserDTO {
  @IsNotEmpty({ message: 'O nome não pode ser vazio!' })
  name: string;

  @IsEmail(undefined, { message: 'seu email precisa ser valido!' })
  @UniqueEmail({ message: 'Já existe uma conta com esse email.' })
  email: string;

  @MinLength(8, { message: 'A senha precisa ter no minimo 8 caracteres!' })
  password: string;
}
