import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter, mergeMap, Observable, of, scan, shareReplay, startWith, Subject, tap, map, switchMap } from 'rxjs';
import { EditVideoComponent } from './common/components/edit-video/edit-video.component';
import { UploadDialogComponent } from './common/components/upload-dialog/upload-dialog.component';
import { UploadService } from './common/services/upload/upload.service';
import { UserVideo } from './common/types/user-video';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
	videos$: Subject<UserVideo[]> = new Subject<UserVideo[]>();
	upload$: Subject<UserVideo> = new Subject<UserVideo>();
	videos: any[] = [];

	constructor(
		private dialog: MatDialog,
		private snackbar: MatSnackBar,
		private upload: UploadService
	) {}

	ngOnInit(): void {
		this.refreshVideos();
	}

	refreshVideos() {
		this.upload.getVideos().pipe(
			// Transforms the cold observable to a hot observable, meaning we only do the network request once
			shareReplay(),

			// Merge that result with any new videos that the user uploads
			mergeMap((existingVideos: UserVideo[]) => {
				return this.upload$.pipe(
					// Scan is a version of reduce() that emits each update
					scan((videos, newUpload) => videos.concat(newUpload), existingVideos),
					startWith(existingVideos)
				);
			}),
			map((videos: UserVideo[]) => {
				this.videos = videos.map(video => {
					return {...video, tags: (video.tags)?.split(',')}
				});
				this.videos$.next(this.videos);
			})
		).subscribe();
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
			.subscribe((result: UserVideo) => { if(typeof result !== 'undefined') this.upload$.next(result) });
	}

	editVideo(video: UserVideo) {
		const dialogRef = this.dialog.open<EditVideoComponent, UserVideo, UserVideo>(EditVideoComponent, {data: video });
		dialogRef.afterClosed().pipe(
			switchMap((video: UserVideo | undefined): Observable<UserVideo> => {
				if(typeof video === 'undefined') return of();
				return this.upload.edit(video as UserVideo);
			})
		).subscribe((video: UserVideo) => {
			this.videos = this.videos.map((currentVideo: UserVideo) => {
				if(currentVideo.id === video.id) return video;
				return currentVideo;
			});
			this.videos$.next(this.videos as UserVideo[]);
			this.snackbar.open('Updated Video', undefined, { duration: 4000});
		})
	}

	ngOnDestroy(): void {
		this.videos$.complete();
	}
}
