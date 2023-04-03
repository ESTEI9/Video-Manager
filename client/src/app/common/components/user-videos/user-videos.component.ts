import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UserVideo } from '../../types/user-video';

@Component({
  selector: 'app-user-videos',
  templateUrl: './user-videos.component.html',
  styleUrls: ['./user-videos.component.scss']
})
export class UserVideosComponent {

  @Input() videos: UserVideo[]
  @Output() delete: EventEmitter<UserVideo> = new EventEmitter();

  constructor() {}

  deleteVideo(video: UserVideo) {
    this.delete.emit(video)
  }

}
