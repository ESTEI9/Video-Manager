import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserVideo } from '../../types/user-video';

@Component({
  selector: 'edit-video',
  templateUrl: './edit-video.component.html',
  styleUrls: ['./edit-video.component.scss']
})
export class EditVideoComponent {

  title: string
  description: string | undefined;
  tags: string | undefined;
  video: UserVideo;

  constructor(
    private dialogRef: MatDialogRef<EditVideoComponent>,
    @Inject(MAT_DIALOG_DATA) data: UserVideo
  ) {
    this.video = data;
    this.title = this.video.title;
    this.description = this.video.description;
    this.tags = this.video.tags;
  }

  save() {
    const video = { ...this.video, title: this.title, description: this.description, tags: this.tags };
    this.dialogRef.close(video);
  }
}
