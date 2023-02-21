import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';

import { of } from 'rxjs';

import { AppComponent } from './app.component';
import { UserVideo } from './common/types/user-video';
import { UploadService } from './common/services/upload/upload.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
	let uploadService: UploadService;
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
				NoopAnimationsModule,
				RouterTestingModule
			],
			declarations: [AppComponent],
			providers: [
				{ provide: MatDialog, useValue: dialogMock },
				{ provide: MatSnackBar, useValue: snackbarMock }
			]
		}).compileComponents();

		uploadService = TestBed.inject(UploadService);
	});

	describe('init', () => {
		it('should create the app', () => {
			const fixture = TestBed.createComponent(AppComponent);
			const app = fixture.componentInstance;
			expect(app).toBeTruthy();
		});

		it('should render title', () => {
			const fixture = TestBed.createComponent(AppComponent);
			const compiled = fixture.nativeElement as HTMLElement;
			expect(compiled.querySelector('.mat-toolbar span')?.textContent).toContain(
				'Video Manager'
			);
		});

		it('should correctly get existing videos to display', () => {
			const fixture = TestBed.createComponent(AppComponent);
			const component = fixture.componentInstance;

			spyOn(uploadService, 'getVideos').and.returnValue(
				of([{ id: 1, path: 'bogus/path' } as UserVideo])
			);

			fixture.detectChanges();
			component.videos$.subscribe((item) => {
				expect(item).toEqual([{ id: 1, path: 'bogus/path' } as UserVideo]);
			});
		});
	});

	describe('upload', () => {
		it('should show snackbar if upload is completed', fakeAsync(() => {
			const fixture = TestBed.createComponent(AppComponent);
			const app = fixture.componentInstance;

			// Simulate success on modal
			const dialogRefMock = jasmine.createSpyObj(['afterClosed']);
			dialogRefMock.afterClosed.and.returnValue(of({ id: 1, path: 'bogus/path' }));
			dialogMock.open.and.returnValue(dialogRefMock);

			// Simulate the user pressing the upload button
			app.openUpload();

			// Should see a snackbar if the user's upload was successful
			expect(snackbarMock.open).toHaveBeenCalled();
		}));

		it('should not show snackbar if upload is cancelled', fakeAsync(() => {
			const fixture = TestBed.createComponent(AppComponent);
			const app = fixture.componentInstance;

			// Simulate cancel on modal
			const dialogRefMock = jasmine.createSpyObj(['afterClosed']);
			dialogRefMock.afterClosed.and.returnValue(of(undefined));
			dialogMock.open.and.returnValue(dialogRefMock);

			// Simulate the user pressing the upload button
			app.openUpload();

			// Shouldn't see a snackbar if the user canceled
			expect(snackbarMock.open).not.toHaveBeenCalled();
		}));
	});
});
