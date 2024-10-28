import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../product.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  productForm!: FormGroup; 
  editingProduct: Product | null = null;

  constructor(private productService: ProductService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      id: [null],
      name: [''],
      price: [0]
    });
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des produits', error);
      }
    );
  }

  addProduct(): void {
    const product: Product = this.productForm.value;
    this.productService.addProduct(product).subscribe((newProduct) => {
      this.products.push(newProduct);
      this.productForm.reset();
      this.editingProduct = null; 
    });
  }

  editProduct(product: Product): void {
    this.editingProduct = product;
    this.productForm.setValue({ id: product.id, name: product.name, price: product.price });
  }

  updateProduct(): void {
    const product: Product = this.productForm.value;
    this.productService.updateProduct(product).subscribe((updatedProduct) => {
      const index = this.products.findIndex(p => p.id === updatedProduct.id);
      if (index > -1) {
        this.products[index] = updatedProduct;
      }
      this.productForm.reset();
      this.editingProduct = null;
    });
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(() => {
      this.products = this.products.filter(product => product.id !== id);
    });
  }
}
