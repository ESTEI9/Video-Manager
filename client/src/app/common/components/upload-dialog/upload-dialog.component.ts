import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { sizes } from '../../enums/size.enum';
import { UploadService } from '../../services/upload/upload.service';
import { UserVideo } from '../../services/upload/user-video';

@Component({
	selector: 'app-upload-dialog',
	templateUrl: './upload-dialog.component.html',
	styleUrls: ['./upload-dialog.component.scss']
})
export class UploadDialogComponent implements OnInit {
	@ViewChild('fileInput') fileInput!: ElementRef;
	file: File | null = null;
	fileTooBig: boolean = false;

	constructor(
		private uploadService: UploadService,
		private dialogRef: MatDialogRef<UploadDialogComponent>
	) {}

	ngOnInit(): void {}

	selectFile() {
		this.fileInput.nativeElement.click();
	}

	fileChange(event: Event) {
		const files: FileList = (event as any).target?.files;
		if (files.length > 0) {
			this.fileTooBig = files[0]?.size > sizes.maxSize;
			if(this.fileTooBig) return;
			this.file = files[0];
		}
	}

	upload() {
		if(this.file instanceof File)
		this.uploadService.upload(this.file).subscribe((result: UserVideo) => {
			this.dialogRef.close(result);
		});
	}
}
