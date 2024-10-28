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
  showForm: boolean = false; // Contrôle de la visibilité du formulaire
  selectedSegment: string = 'home'; // Modifié pour inclure 'home'
  


  constructor(private productService: ProductService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm(); // Initialisation du formulaire
    this.loadProducts(); // Chargement des produits
  }

  // Méthode pour initialiser le formulaire
  initializeForm(): void {
    this.productForm = this.fb.group({
      id: [null],
      name: [''],
      price: [0]
    });
  }

  // Chargement des produits depuis le service
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

  // Ajout d'un nouveau produit
  addProduct(): void {
    const product: Product = this.productForm.value;
    this.productService.addProduct(product).subscribe((newProduct) => {
      this.products.push(newProduct);
      this.resetForm(); // Réinitialiser le formulaire après soumission
    });
  }

  // Édition d'un produit existant
  editProduct(product: Product): void {
    this.editingProduct = product;
    this.productForm.setValue({ id: product.id, name: product.name, price: product.price });
    this.showForm = true; // Afficher le formulaire pour l'édition
  }

  // Mise à jour d'un produit
  updateProduct(): void {
    const product: Product = this.productForm.value;
    this.productService.updateProduct(product).subscribe((updatedProduct) => {
      const index = this.products.findIndex(p => p.id === updatedProduct.id);
      if (index > -1) {
        this.products[index] = updatedProduct;
      }
      this.resetForm(); // Réinitialiser le formulaire après mise à jour
    });
  }

  // Suppression d'un produit
  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(() => {
      this.products = this.products.filter(product => product.id !== id);
    });
  }

  // Méthode pour afficher le formulaire d'ajout
  showAddForm(): void {
    this.editingProduct = null; // Assurez-vous qu'il n'y a pas de produit en cours d'édition
    this.resetForm(); // Réinitialiser le formulaire
    this.showForm = true; // Afficher le formulaire d'ajout
  }

  // Méthode pour gérer le changement de segment
  segmentChanged(event: any): void {
    this.selectedSegment = event.detail.value;
    this.showForm = this.selectedSegment === 'add'; // Affiche le formulaire si le segment "Ajouter" est sélectionné
  }

  // Réinitialiser le formulaire et masquer le formulaire
  private resetForm(): void {
    this.productForm.reset();
    this.showForm = false; // Masquer le formulaire après soumission
    this.editingProduct = null; // Réinitialiser le produit en cours d'édition
  }
}
