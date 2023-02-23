import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { UploadDialogComponent } from './upload-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { UploadService } from '../../services/upload/upload.service';
import { UserVideo } from '../../types/user-video';
import { of } from 'rxjs';
import { sizes } from '../../enums/size.enum';
import { FormsModule } from '@angular/forms';

describe('UploadDialogComponent', () => {
	let component: UploadDialogComponent;
	let fixture: ComponentFixture<UploadDialogComponent>;
	let uploadService: UploadService;
	let dialogRefMock!: jasmine.SpyObj<MatDialogRef<UploadDialogComponent, any>>;

	beforeEach(async () => {
		dialogRefMock = jasmine.createSpyObj(['close']);
		await TestBed.configureTestingModule({
			imports: [
				HttpClientTestingModule,
				MatDialogModule,
				MatIconModule,
				MatSnackBarModule,
				FormsModule
			],
			declarations: [UploadDialogComponent],
			providers: [{ provide: MatDialogRef, useValue: dialogRefMock }]
		}).compileComponents();

		uploadService = TestBed.inject(UploadService);
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(UploadDialogComponent);
		component = fixture.componentInstance;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('fileChange', () => {
		it('should fail to upload if a file was chosen and a file exceeded the max size', () => {
			expect(component.fileTooBig).toBeFalse();
			const event = {target: { files: [{size: sizes.maxSize + 1} as File]}} as unknown as Event;

			component.fileChange(event);

			expect(component.fileTooBig).toBeTrue();
			expect(component.file).toBeNull();
		});

		it('should prepare the file to be uploaded if is less than the max size', () => {
			const fakeFile = {size: sizes.maxSize} as File;
			const event = {target: { files: [fakeFile]}} as unknown as Event;

			component.fileChange(event);

			expect(component.fileTooBig).toBeFalse();
			expect(component.file).toEqual(fakeFile);
		});
	});

	describe('upload', () => {
		it('should call the upload.service upload method, close the dialog when finished, if a file was chosen', () => {
			component.title = 'Bogus';
			component.file = new File([''], 'bogusFile', { type: 'text/html' });
			spyOn(uploadService, 'upload').and.returnValue(
				of({ id: 1, path: 'bogus/path', title: 'Bogus' } as UserVideo)
			);
			fixture.detectChanges();

			component.upload();

			expect(uploadService.upload).toHaveBeenCalled();
			expect(dialogRefMock.close).toHaveBeenCalled();
		});

		it('should do nothing when calling the upload.service upload method if no file was chosen', () => {
			component.title = 'Bogus';
			component.file = null;
			spyOn(uploadService, 'upload').and.returnValue(
				of({ id: 1, path: 'bogus/path', title: 'Bogus' } as UserVideo)
			);
			fixture.detectChanges();

			component.upload();

			expect(uploadService.upload).not.toHaveBeenCalled();
			expect(dialogRefMock.close).not.toHaveBeenCalled();
		});
	});
});
