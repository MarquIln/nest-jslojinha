import { Injectable } from "@nestjs/common";
import { ProductEntity } from "./product.entity";

@Injectable()
export class ProductRepository {
  private products: ProductEntity[] = []

  async save(product: ProductEntity) {
    this.products.push(product)
  }

  async list() {
    return this.products
  }

  async fetchById(id: string) {
    const possibleProduct = this.products.find(
      savedProduct => savedProduct.id === id 
    )

    if (!possibleProduct) {
      throw new Error("Produto nao encontrado")
    }

    return possibleProduct
  }

  async update(id: string, updateData: Partial<ProductEntity>) {
    const product = this.fetchById(id)

    Object.entries(updateData).forEach(([key, value]) => {
      if(key === 'id') return

      product[key] = value
      return product
    })
  }

  async delete(id: string) {
    const product = this.fetchById(id)
    this.products = this.products.filter(
      savedProduct => savedProduct.id !== id
    )
    return product
  }
}