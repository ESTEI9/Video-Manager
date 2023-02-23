import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { sizes } from '../../enums/size.enum';
import { UploadService } from '../../services/upload/upload.service';
import { UserVideo } from '../../types/user-video';
import { MetaData } from '../../types/metadata';
import { UserService } from '../../services/user/user.service';
import { tap } from 'rxjs';

@Component({
	selector: 'app-upload-dialog',
	templateUrl: './upload-dialog.component.html',
	styleUrls: ['./upload-dialog.component.scss']
})
export class UploadDialogComponent implements OnInit {
	@ViewChild('fileInput') fileInput!: ElementRef;
	file: File | null = null;
	title: string;
	description: string;
	tags: string;
	fileTooBig: boolean = false;

	constructor(
		public uploadService: UploadService,
		public userService: UserService,
		public dialogRef: MatDialogRef<UploadDialogComponent>
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
			this.title = files[0].name;
			this.file = files[0];
		}
	}

	upload() {
		if (this.title.length > 0) {
			const metadata: MetaData = {
				author: this.userService.user.id,
				title: this.title,
				description: this.description,
				tags: this.tags?.replace(/(?<=,)\s/g,'').split(',')
			};
			if(this.file instanceof File) {
				this.uploadService.uploading = true;
				this.uploadService.upload(this.file!, metadata).pipe(
					tap(() => { this.uploadService.uploading = false })
				).subscribe((result: UserVideo) => {
					this.dialogRef.close(result);
				});
			}
		}
	}
}
