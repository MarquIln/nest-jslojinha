import { IsNotEmpty } from 'class-validator';

export class createProductDto {
  @IsNotEmpty({ message: 'O nome não pode ser vazio!' })
  name: string;

  @IsNotEmpty({ message: 'O produto precisa de uma descricao!' })
  description: string;

  @IsNotEmpty({ message: 'O produto precisa de um preco!' })
  price: number;
}
