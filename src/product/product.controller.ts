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
import { ProductEntity } from './product.entity';
import { ProductRepository } from './product.repository';
import { createProductDto } from './productDto/createProduct.dto';
import { ListProductDto } from './productDto/listProduct.dto';
import { updateProductDto } from './productDto/updateProduct.dto';

@Controller('/products')
export class ProductController {
  constructor(private readonly productRepository: ProductRepository) {}

  @Post()
  async createProduct(@Body() productData: createProductDto) {
    const productEntity = new ProductEntity();

    productEntity.id === uuid();
    productEntity.name === productData.name;
    productEntity.description === productData.description;
    productEntity.price === productData.price;

    this.productRepository.save(productEntity);

    return {
      product: new ListProductDto(productEntity.id, productEntity.name),
      message: 'Produto cadastrado com sucesso!',
    };
  }

  @Get()
  async listProducts() {
    const validatedProducts = await this.productRepository.list();
    const listProducts = validatedProducts.map(
      (product) => new ListProductDto(product.id, product.name),
    );

    return listProducts;
  }

  @Put('/:id')
  async UpdateProduct(
    @Param('id') id: string,
    @Body() newData: updateProductDto,
  ) {
    const updatedProduct = await this.productRepository.update(id, newData);

    return {
      product: updatedProduct,
      message: 'Produto atualizado com sucesso',
    };
  }

  @Delete('/:id')
  async deleteProduct(@Param('id') id: string) {
    const removedProduct = await this.productRepository.delete(id);

    return {
      product: removedProduct,
      message: 'Produto removido com sucesso',
    };
  }
}
