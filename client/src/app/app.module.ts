import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app-material.module';
import { UploadDialogComponent } from './common/components/upload-dialog/upload-dialog.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { EditVideoComponent } from './common/components/edit-video/edit-video.component';

@NgModule({
	declarations: [AppComponent, UploadDialogComponent, EditVideoComponent],
	imports: [
		BrowserModule,
		CommonModule,
		HttpClientModule,
		FormsModule,
		AppRoutingModule,
		AppMaterialModule,
		BrowserAnimationsModule,
		MatSnackBarModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
