import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { UserVideo } from '../../types/user-video';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'edit-video',
  standalone: true,
  templateUrl: './edit-video.component.html',
  styleUrls: ['./edit-video.component.scss'],
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    MatButtonModule
  ]
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
    this.tags = (this.video.tags ?? []).join(', ');
  }

  save() {
    let video = { ...this.video, title: this.title, description: this.description };
    delete video.tags;
    if (this.tags) {
      const tags = this.tags?.replace(/(?<=,)\s/g,'').split(',');
      video = {...video, tags};
    }
    this.dialogRef.close(video);
  }
}
