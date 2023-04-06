import { Component, Input } from '@angular/core';
import { UserVideo } from '../../types/user-video';
import { CommonModule } from '@angular/common';
import { VideoComponent } from '../video/video.component';

@Component({
  selector: 'app-shared-videos',
  standalone: true,
  templateUrl: './shared-videos.component.html',
  styleUrls: ['./shared-videos.component.scss'],
  imports: [
    CommonModule,
    VideoComponent
  ]
})
export class SharedVideosComponent {

  @Input() videos: UserVideo[];

  constructor() {}

}
