import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import {MatBadgeModule} from '@angular/material/badge'; 
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  exports: [
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatPaginatorModule,
    MatSelectModule,
    MatGridListModule,
  ],
})
export class MaterialModule {}
