import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from '../../../../environments/environment';
import { UploadService } from './upload.service';
import { MetaData } from '../../types/metadata';
import { UserVideo } from '../../types/user-video';

describe('UploadService', () => {
	let http: HttpTestingController;
	let service: UploadService;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [HttpClientTestingModule]
		});

		service = TestBed.inject(UploadService);
		http = TestBed.inject(HttpTestingController);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('GET', () => {
		it('should call the correct endpoint when getting videos', () => {
			service.getVideos(1).subscribe((videos: UserVideo[]) => {
				expect(videos.length).toBe(1);
				expect(videos[0].id).toBe(1);
				expect(videos[0].path).toBe('bogus/path');
			});
			const req = http.expectOne(`${environment.apiBaseUrl}/videos/user/1`);
			expect(req.request.method).toBe('GET');
			req.flush([{ id: 1, path: 'bogus/path' }]);
			http.verify();
		});
	});

	describe('POST', () => {
		it('should call the correct endpoint when getting shared videos', () => {
			service.getSharedVideos("bogus@email.com").subscribe((videos: UserVideo[]) => {
				expect(videos.length).toBe(1);
				expect(videos[0].id).toBe(1);
				expect(videos[0].shared).toEqual(["bogus@email.com"]);
			})
			const req = http.expectOne(`${environment.apiBaseUrl}/shared`);
			req.flush([{id: 1, shared: ["bogus@email.com"]}]);
			http.verify();
		});

		it('should call the correct endpoint when uploading a video', () => {
			const fileBlob = new File([''], 'bogusFile', { type: 'text/html' });
			const metaData: MetaData = {title: 'Bogus', description: 'Bogus Description', author: 1};
			service.upload(fileBlob, metaData).subscribe((video) => {
				expect(video.id).toBe(1);
				expect(video.path).toBe('bogus/path');
				expect(video.title).toBe('Bogus');
			});
			const req = http.expectOne(`${environment.apiBaseUrl}/videos`);
			expect(req.request.method).toBe('POST');
			req.flush({ id: 1, path: 'bogus/path', title: 'Bogus', description: 'Bogus Description', author: 1 });
			http.verify();
		});

		it('should call the correct endpoint when editing a video', () => {
			const video = { id: 1, path: 'bogus/path', title: 'Bogus Title'} as UserVideo;
			service.edit(video).subscribe((video: UserVideo) => {
				expect(video.id).toBe(1);
				expect(video.path).toBe('bogus/path');
				expect(video.title).toBe('Bogus Title');
			});
			const req = http.expectOne(`${environment.apiBaseUrl}/edit`);
			expect(req.request.method).toBe('POST');
			req.flush(video);
			http.verify();
		});

		it('should call the correct endpoint when sharing a video', () => {
			const video = { id: 1, path: 'bogus/path', title: 'Bogus Title', shared: ["bogus@email.com"]} as UserVideo;
			service.share(video).subscribe((video: UserVideo) => {
				expect(video.id).toBe(1);
				expect(video.path).toBe('bogus/path');
				expect(video.title).toBe('Bogus Title');
				expect(video.shared).toEqual(["bogus@email.com"]);
			});
			const req = http.expectOne(`${environment.apiBaseUrl}/share`);
			expect(req.request.method).toBe('POST');
			req.flush(video);
			http.verify();
		});
	});
});
