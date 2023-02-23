import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserVideo } from '../../types/user-video';

@Component({
  selector: 'app-share-video',
  templateUrl: './share-video.component.html',
  styleUrls: ['./share-video.component.scss']
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
    this.dialogRef.close(this.data);
  }
}
