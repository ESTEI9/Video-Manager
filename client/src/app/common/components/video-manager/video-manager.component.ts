import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter, mergeMap, Observable, of, scan, shareReplay, startWith, Subject, switchMap, tap, take, combineLatest, map } from 'rxjs';
import { VideoService } from '../../services/video/video.service';
import { UserService } from '../../services/user/user.service';
import { UserVideo } from '../../types/user-video';
import { UploadDialogComponent } from '../upload-dialog/upload-dialog.component';

@Component({
	selector: 'app-video-manager',
	templateUrl: './video-manager.component.html',
	styleUrls: ['./video-manager.component.scss']
})
export class VideoManagerComponent implements OnInit {
	videos$: Observable<{videos: UserVideo[], shared: UserVideo[]}> = of({videos: [], shared: []});
	myVideos$: Observable<UserVideo[]> = of([]);
	upload$: Subject<UserVideo> = new Subject<UserVideo>();
	shared$: Observable<UserVideo[]> = of([]);

	constructor(
		public dialog: MatDialog,
		public snackbar: MatSnackBar,
		public upload: VideoService,
		public userService: UserService
	) { }

	ngOnInit(): void {
		this.getVideos();
	}

	getVideos() {
		this.upload.loadingVideos = true;
		this.myVideos$ = this.getMyVideos();
		this.shared$ = this.getSharedVideos();
		this.videos$ = combineLatest([
			this.myVideos$,
			this.shared$
		]).pipe(
			shareReplay(),
			map(([videos, shared]) => ({ videos, shared })), 
			tap(() => this.upload.loadingVideos = false))
	}

	getMyVideos() {
		return this.upload.getVideos(this.userService.user.id).pipe(
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

	getSharedVideos() {
		return this.upload.getSharedVideos(this.userService.user.email).pipe(
			mergeMap((existingVideos: UserVideo[]) => {
				return this.upload$.pipe(
					scan((videos, newShared) => videos.concat(newShared), existingVideos),
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
				tap((result: UserVideo | undefined) => {
					if (typeof result !== 'undefined')
						this.snackbar.open('Video uploaded successfully', undefined, {
							duration: 4000
						});
				}),
				filter((result: UserVideo | undefined): result is UserVideo => result != null)
			)
			.subscribe((result: UserVideo) => { if (typeof result !== 'undefined') this.upload$.next(result) });
	}

	deleteVideo(video: UserVideo) {
		this.upload.delete(video).pipe(
			take(1),
			switchMap(() => this.myVideos$),
			tap((videos: UserVideo[]) => this.myVideos$ = of(videos.filter(v => video.id !== v.id))),
			tap(() => this.snackbar.open('Deleted Video', undefined, { duration: 4000 }))
		).subscribe()
	}

	logout() {
		this.userService.logout();
	}
}
