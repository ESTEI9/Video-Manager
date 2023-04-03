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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { EditVideoComponent } from './common/components/edit-video/edit-video.component';
import { LoginComponent } from './common/components/login/login.component';
import { VideoManagerComponent } from './common/components/video-manager/video-manager.component';
import { SignUpComponent } from './common/components/sign-up/sign-up.component';
import { VideoComponent } from './common/components/video/video.component';
import { ShareVideoComponent } from './common/components/share-video/share-video.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { NgxsModule } from '@ngxs/store';
import { UserState } from './common/states/user.state';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsSelectSnapshotModule } from '@ngxs-labs/select-snapshot';
import { VideoInterceptor } from './common/interceptors/video.interceptor';
import { SharedVideosComponent } from './common/components/shared-videos/shared-videos.component';
import { UserVideosComponent } from './common/components/user-videos/user-videos.component';

@NgModule({
	declarations: [
		AppComponent,
		VideoManagerComponent,
		UploadDialogComponent,
		EditVideoComponent,
		LoginComponent,
		SignUpComponent,
		VideoComponent,
		ShareVideoComponent,
		SharedVideosComponent,
		UserVideosComponent
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
		MatProgressSpinnerModule,
		NgxsModule.forRoot([UserState]),
		NgxsStoragePluginModule.forRoot({ key: [UserState]}),
		NgxsSelectSnapshotModule.forRoot()
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: VideoInterceptor, multi: true }
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
