import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
	declarations: [],
	imports: [CommonModule],
	exports: [MatToolbarModule, MatIconModule, MatButtonModule, MatTooltipModule, MatDialogModule, MatCardModule, MatMenuModule]
})
export class AppMaterialModule {}
