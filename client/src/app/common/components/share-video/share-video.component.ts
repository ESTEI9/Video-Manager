import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { UserVideo } from '../../types/user-video';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-share-video',
  standalone: true,
  templateUrl: './share-video.component.html',
  styleUrls: ['./share-video.component.scss'],
  imports: [
    MatCardModule,
    MatDialogModule,
    FormsModule,
    MatButtonModule
  ]
})
export class ShareVideoComponent implements OnInit {

  shared: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: UserVideo,
    public dialogRef: MatDialogRef<ShareVideoComponent>
  ) {}

  ngOnInit(): void {
    this.shared = this.data.shared!?.join(', ');
  }

  save() {
    const video: UserVideo = {...this.data, shared: this.shared?.replace(/(?<=,)\s/g,'').split(',')};
    this.dialogRef.close(video);
  }

  cancel() {
    this.dialogRef.close();
  }
}
