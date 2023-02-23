import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app-material.module';
import { UploadDialogComponent } from './common/components/upload-dialog/upload-dialog.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { EditVideoComponent } from './common/components/edit-video/edit-video.component';
import { LoginComponent } from './common/components/login/login.component';
import { VideoManagerComponent } from './common/components/video-manager/video-manager.component';
import { SignUpComponent } from './common/components/sign-up/sign-up.component';
import { VideoComponent } from './common/components/video/video.component';
import { ShareVideoComponent } from './common/components/share-video/share-video.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
	declarations: [
		AppComponent,
		VideoManagerComponent,
		UploadDialogComponent,
		EditVideoComponent,
		LoginComponent,
		SignUpComponent,
		VideoComponent,
		ShareVideoComponent
	],
	imports: [
		BrowserModule,
		CommonModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		AppRoutingModule,
		AppMaterialModule,
		BrowserAnimationsModule,
		MatSnackBarModule,
		MatProgressSpinnerModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
