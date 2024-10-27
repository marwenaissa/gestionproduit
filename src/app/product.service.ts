import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
export interface Product {
  id: number;
  name: string;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'assets/products.json';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  // Méthodes pour créer, mettre à jour et supprimer des produits
  addProduct(product: Product): Observable<Product> {
  
    // Vous pouvez implémenter l'ajout ici, mais cela nécessite de gérer un stockage local
    return this.http.post<Product>(this.apiUrl, product); // Simulé
  }

  updateProduct(product: Product): Observable<Product> {
    // Idem pour la mise à jour
    return this.http.put<Product>(`${this.apiUrl}/${product.id}`, product); // Simulé
  }

  deleteProduct(id: number): Observable<void> {
    // Simulé pour la suppression
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Méthodes pour créer, mettre à jour et supprimer des produits
  // (À développer en fonction de vos besoins)
}
