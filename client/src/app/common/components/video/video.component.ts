import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap, Observable, of, tap } from 'rxjs';
import { UploadService } from '../../services/upload/upload.service';
import { UserService } from '../../services/user/user.service';
import { UserVideo } from '../../types/user-video';
import { EditVideoComponent } from '../edit-video/edit-video.component';
import { ShareVideoComponent } from '../share-video/share-video.component';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  @Input() video!: UserVideo;
  @Output() delete = new EventEmitter<any>();
  canEdit: boolean = false;
  loading: boolean = false;

  constructor(
    public dialog: MatDialog,
    public snackbar: MatSnackBar,
    public uploadService: UploadService,
    public userService: UserService,
  ) {}

  ngOnInit() {
    this.canEdit = this.isVideoEditable();
  }

  isVideoEditable():boolean {
    return this.video.author == this.userService.user.id;
  }

  editVideo() {
		const dialogRef = this.dialog.open<EditVideoComponent, UserVideo, UserVideo>(EditVideoComponent, {data: this.video });
		dialogRef.afterClosed().pipe(
      tap(() => { this.loading = true; }),
			switchMap((video: UserVideo | undefined): Observable<UserVideo> => {
				if(typeof video === 'undefined') return of();
				return this.uploadService.edit(video as UserVideo);
			}),
      tap((video: UserVideo) => {
        this.loading = false;
        this.video = video;
        this.snackbar.open('Updated Video', undefined, { duration: 4000});
      })
		).subscribe();
	}

  shareVideo() {
    const dialogRef = this.dialog.open<ShareVideoComponent, UserVideo, UserVideo>(ShareVideoComponent, { data: this.video });
    dialogRef.afterClosed().pipe(
      tap(() => { this.loading = true; }),
			switchMap((video: UserVideo | undefined): Observable<UserVideo> => {
				return this.uploadService.share(video as UserVideo);
			}),
      tap(() => {
        this.loading = false;
        this.snackbar.open('Shared Video', undefined, { duration: 4000});
      })
		).subscribe();
  }

  deleteVideo() {
    this.loading = true;
    this.delete.emit();
  }
}
