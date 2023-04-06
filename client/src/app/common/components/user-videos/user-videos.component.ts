import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UserVideo } from '../../types/user-video';
import { VideoComponent } from '../video/video.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-videos',
  standalone: true,
  templateUrl: './user-videos.component.html',
  styleUrls: ['./user-videos.component.scss'],
  imports: [
    CommonModule,
    VideoComponent
  ]
})
export class UserVideosComponent {

  @Input() videos: UserVideo[]
  @Output() delete: EventEmitter<UserVideo> = new EventEmitter();

  constructor() {}

  deleteVideo(video: UserVideo) {
    this.delete.emit(video)
  }

}
