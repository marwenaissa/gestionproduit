import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProductListComponent } from './product-list.component';

@NgModule({
    declarations: [ProductListComponent],
    imports: [
      CommonModule,
      ReactiveFormsModule,
      IonicModule
    ],
    exports: [ProductListComponent]
  })
  export class ProductListModule {}
  