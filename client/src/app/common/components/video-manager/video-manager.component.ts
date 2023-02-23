import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter, map, mergeMap, Observable, of, scan, shareReplay, startWith, Subject, switchMap, tap, take } from 'rxjs';
import { UploadService } from '../../services/upload/upload.service';
import { UserService } from '../../services/user/user.service';
import { UserVideo } from '../../types/user-video';
import { EditVideoComponent } from '../edit-video/edit-video.component';
import { UploadDialogComponent } from '../upload-dialog/upload-dialog.component';

@Component({
  selector: 'app-video-manager',
  templateUrl: './video-manager.component.html',
  styleUrls: ['./video-manager.component.scss']
})
export class VideoManagerComponent implements OnInit {
	videos$: Observable<UserVideo[]> = of([]);
	upload$: Subject<UserVideo> = new Subject<UserVideo>();
	shared$: Observable<UserVideo[]> = of([]);

	constructor(
		public dialog: MatDialog,
		public snackbar: MatSnackBar,
		public upload: UploadService,
    	public userService: UserService
	) {}

	ngOnInit(): void {
		this.refreshVideos();
    	this.getSharedVideos();
	}

	refreshVideos() {
		this.upload.loadingVideos = true;
		this.videos$ = this.upload.getVideos(this.userService.user.id).pipe(
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
			tap(() => {
				this.upload.loadingVideos = false;
			})
		);
	}

  getSharedVideos() {
	this.upload.loadingShared = true;
    this.shared$ = this.upload.getSharedVideos(this.userService.user.email).pipe(
      shareReplay(),
	  tap(() => {
		this.upload.loadingShared = false;
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
					if(typeof result !== 'undefined')
					this.snackbar.open('Video uploaded successfully', undefined, {
						duration: 4000
					});
				}),
				filter((result: UserVideo | undefined): result is UserVideo => result != null)
			)
			.subscribe((result: UserVideo) => { if(typeof result !== 'undefined') this.upload$.next(result) });
	}

  logout() {
    this.userService.logout();
  }
}
