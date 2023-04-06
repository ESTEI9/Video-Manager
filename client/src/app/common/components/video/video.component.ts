import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { switchMap, Observable, of, tap, filter } from 'rxjs';
import { VideoService } from '../../services/video/video.service';
import { UserService } from '../../services/user/user.service';
import { UserVideo } from '../../types/user-video';
import { EditVideoComponent } from '../edit-video/edit-video.component';
import { ShareVideoComponent } from '../share-video/share-video.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-video',
  standalone: true,
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSnackBarModule
  ]
})

export class VideoComponent implements OnInit {

  @Input() video!: UserVideo;
  @Output() delete = new EventEmitter<any>();
  canEdit: boolean = false;
  loading: boolean = false;

  constructor(
    public dialog: MatDialog,
    public snackbar: MatSnackBar,
    public VideoService: VideoService,
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
      filter((res: any): res is UserVideo => !!(res as UserVideo)),
      tap(() => { this.loading = true; }),
			switchMap((video: UserVideo): Observable<UserVideo> => {
				return this.VideoService.edit(video as UserVideo);
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
      filter((res: any): res is UserVideo => !!(res as UserVideo)),
      tap(() => { this.loading = true; }),
			switchMap((video: UserVideo): Observable<UserVideo> => {
				return this.VideoService.share(video as UserVideo);
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
