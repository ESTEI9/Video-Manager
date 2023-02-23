import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { of } from 'rxjs';
import { MockUploadService } from '../../mocks/upload.service.mock';
import { UploadService } from '../../services/upload/upload.service';
import { UserVideo } from '../../types/user-video';

import { VideoManagerComponent } from './video-manager.component';

describe('VideoManagerComponent', () => {
  let component: VideoManagerComponent;
  let fixture: ComponentFixture<VideoManagerComponent>;
	let dialogMock!: jasmine.SpyObj<MatDialog>;
	let snackbarMock!: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    dialogMock = jasmine.createSpyObj(['open']);
		snackbarMock = jasmine.createSpyObj(['open']);
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
				MatDialogModule,
				MatIconModule,
				MatSnackBarModule,
				MatToolbarModule,
        MatProgressSpinnerModule,
        FormsModule
      ],
      declarations: [ VideoManagerComponent ],
      providers: [
        { provide: MatDialog, useValue: dialogMock },
				{ provide: MatSnackBar, useValue: snackbarMock },
        { provide: UploadService, useClass: MockUploadService }
      ]
      
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('init', () => {
    it('should render title', () => {
			const compiled = fixture.nativeElement as HTMLElement;
			expect(compiled.querySelector('.mat-toolbar span')?.textContent).toContain(
				'Video Manager'
			);
		});

    it('should remove the add button when a user is not set', () => {
      const compiled = fixture.nativeElement as HTMLElement;
			expect(compiled.querySelector('.mat-toolbar button:first-child')).not.toBeTruthy();
    })

		it('should correctly get the user\'s videos to display', () => {
      const fakeVideo = { id: 1, path: 'bogus/path' } as UserVideo;

			spyOn(component.upload, 'getVideos').and.returnValue(
				of([fakeVideo])
			);

      component.refreshVideos();

			component.videos$.subscribe((item) => {
				expect(item).toEqual([fakeVideo]);
			});
		});

    it('should correctly get shared videos to display', () => {
      const fakeVideo = { id: 1, path: 'bogus/path', shared: ['bogus@email.com'] } as UserVideo;

			spyOn(component.upload, 'getSharedVideos').and.returnValue(
				of([fakeVideo])
			);

      component.getSharedVideos();

			component.shared$.subscribe((item) => {
				expect(item).toEqual([fakeVideo]);
			});
    });
  });

  describe('upload', () => {
    it('should allow users to upload a video', () => {
      const fakeVideo = { id: 1, path: 'bogus/path', shared: ["bogus@email.com"] } as UserVideo;
      component.dialog.open = jasmine.createSpy().and.returnValue({
        afterClosed: () => of(fakeVideo)
      } as MatDialogRef<VideoManagerComponent>);
      const uploadSpy = spyOn(component.upload$, 'next');

      component.openUpload();

      expect(uploadSpy).toHaveBeenCalledWith(fakeVideo);
    });
  });

  describe('logout', () => {
    it('should log out a user', () => {
      const userServiceSpy = spyOn(component.userService, 'logout');
      component.logout();
      expect(userServiceSpy).toHaveBeenCalled();
    });
  })
});
