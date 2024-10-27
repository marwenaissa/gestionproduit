import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, updateDoc, doc, deleteDoc, getDocs, DocumentReference, DocumentData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';



export interface Product {
  id?: string; // Firestore utilise des chaînes comme identifiants
  name: string;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private firestore: Firestore) {}

  // Récupérer tous les produits
  getProducts(): Observable<Product[]> {
    const productsRef = collection(this.firestore, 'products');
    return new Observable<Product[]>(subscriber => {
      getDocs(productsRef).then(snapshot => {
        const products: Product[] = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data() as Product
        }));
        subscriber.next(products);
        subscriber.complete();
      });
    });
  }

  // Ajouter un nouveau produit
  addProduct(product: Product): Promise<DocumentReference<DocumentData>> {
    const productsRef = collection(this.firestore, 'products');
    return addDoc(productsRef, product); // Retourne la référence du document ajouté
  }

  // Mettre à jour un produit existant
  updateProduct(product: Product): Promise<void> {
    if (!product.id) {
      throw new Error("ID du produit requis pour la mise à jour.");
    }
    const productDoc = doc(this.firestore, `products/${product.id}`);
    return updateDoc(productDoc, {
      name: product.name,
      price: product.price
    });
  }

  // Supprimer un produit
  deleteProduct(id: string): Promise<void> {
    const productDoc = doc(this.firestore, `products/${id}`);
    return deleteDoc(productDoc);
  }
}
