import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter, mergeMap, Observable, of, scan, shareReplay, startWith, Subject, tap } from 'rxjs';
import { UploadDialogComponent } from './common/components/upload-dialog/upload-dialog.component';
import { UploadService } from './common/services/upload/upload.service';
import { UserVideo } from './common/services/upload/user-video';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
	videos$: Observable<UserVideo[]> = of([]);
	upload$: Subject<UserVideo> = new Subject<UserVideo>();

	constructor(
		private dialog: MatDialog,
		private snackbar: MatSnackBar,
		private upload: UploadService
	) {}

	ngOnInit(): void {
		this.refreshVideos();
	}

	refreshVideos() {
		this.videos$ = this.upload.getVideos().pipe(
			// Transforms the cold observable to a hot observable, meaning we only do the network request once
			shareReplay(),

			// Merge that result with any new videos that the user uploads
			mergeMap((existingVideos: UserVideo[]) => {
				return this.upload$.pipe(
					// Scan is a version of reduce() that emits each update
					scan((videos, newUpload) => videos.concat(newUpload), existingVideos),
					startWith(existingVideos)
				);
			})
		);
	}

	openUpload() {
		const dialogRef = this.dialog.open<UploadDialogComponent, any, UserVideo>(
			UploadDialogComponent
		);
		dialogRef
			.afterClosed()
			.pipe(
				// Log out what they did
				tap((result: UserVideo | undefined) => {
					console.log('Dialog result:', result ?? 'canceled');
				}),

				// Show success message
				tap((result: UserVideo | undefined) => {
					if(typeof result !== 'undefined')
					this.snackbar.open('Video uploaded successfully', undefined, {
						duration: 4000
					});
				}),

				// Ignore if they close/cancel the dialog
				filter((result: UserVideo | undefined): result is UserVideo => result != null)

				// No need to unsubscribe because afterClosed emits complete that will clean up this subscription
			)
			.subscribe((result: UserVideo) => this.upload$.next(result));
	}
}
