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
  description: string;
  tags: string;
  video: UserVideo;

  constructor(
    private dialogRef: MatDialogRef<EditVideoComponent>,
    @Inject(MAT_DIALOG_DATA) data: UserVideo
  ) {
    this.video = data;
    this.title = this.video.title;
    this.description = this.video.description!;
    this.tags = this.video.tags?.join(', ')!;
  }

  save() {
    const video = { ...this.video, title: this.title, description: this.description, tags: this.tags?.replace(/(?<=,)\s/g,'').split(',') };
    this.dialogRef.close(video);
  }
}
