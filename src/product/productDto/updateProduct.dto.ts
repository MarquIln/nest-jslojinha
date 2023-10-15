import { IsNotEmpty, IsOptional } from 'class-validator';

export class updateProductDto {
  @IsNotEmpty({ message: 'O nome não pode ser vazio!' })
  @IsOptional()
  name: string;

  @IsNotEmpty({ message: 'O produto precisa de uma descricao!' })
  @IsOptional()
  description: string;

  @IsNotEmpty({ message: 'O produto precisa de um preco!' })
  @IsOptional()
  price: number;
}

