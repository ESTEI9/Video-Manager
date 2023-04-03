import { Component, Input } from '@angular/core';
import { UserVideo } from '../../types/user-video';

@Component({
  selector: 'app-shared-videos',
  templateUrl: './shared-videos.component.html',
  styleUrls: ['./shared-videos.component.scss']
})
export class SharedVideosComponent {

  @Input() videos: UserVideo[];

  constructor() {}

}
