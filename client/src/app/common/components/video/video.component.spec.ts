import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { MockUploadService } from '../../mocks/upload.service.mock';
import { MockUserService } from '../../mocks/user.service.mock';
import { UploadService } from '../../services/upload/upload.service';
import { UserService } from '../../services/user/user.service';
import { UserVideo } from '../../types/user-video';
import { EditVideoComponent } from '../edit-video/edit-video.component';

import { VideoComponent } from './video.component';

describe('VideoComponent', () => {
  let component: VideoComponent;
  let fixture: ComponentFixture<VideoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoComponent ],
      imports: [
        MatDialogModule,
        MatSnackBarModule,
        MatCardModule,
        MatMenuModule,
        MatIconModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: UploadService, useClass: MockUploadService },
        { provide: UserService, useClass: MockUserService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoComponent);
    component = fixture.componentInstance;
    component.video = {id: 1, author: 1, path: 'bogus/path', title: 'Bogus Video'};
    component.userService.user = {id: 1, name: 'Bogus', email: 'bogus@email.com'};
    fixture.detectChanges();
  });

  describe('init', () => {
    it('should determine if the video is editable', () => {
      expect(component.canEdit).toBeTrue();
    });
  });

  describe('edit video', () => {
    it('should call the correct endpoint to edit a video', () => {
      const fakeVideo = { id: 1, path: 'bogus/path', title: 'Bogus' } as UserVideo;
      const editSpy = spyOn(component.uploadService, 'edit').and.returnValue(of(fakeVideo));
      component.dialog.open = jasmine.createSpy().and.returnValue({
        afterClosed: () => of(fakeVideo)
      } as MatDialogRef<EditVideoComponent>);

      component.editVideo(fakeVideo);

      expect(editSpy).toHaveBeenCalledWith(fakeVideo);
    });
  });

  describe('share video', () => {
    it('should call the correct endpoint to share a video', () => {
      const fakeVideo = { id: 1, path: 'bogus/path', title: 'Bogus', shared: ["bogus@email.com"] } as UserVideo;
      const shareSpy = spyOn(component.uploadService, 'share').and.returnValue(of(fakeVideo));
      component.dialog.open = jasmine.createSpy().and.returnValue({
        afterClosed: () => of(fakeVideo)
      } as MatDialogRef<EditVideoComponent>);

      component.shareVideo(fakeVideo);

      expect(shareSpy).toHaveBeenCalledWith(fakeVideo);
    });
  });
});
