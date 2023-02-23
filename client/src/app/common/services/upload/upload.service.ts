import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { MetaData } from '../../types/metadata';
import { UserVideo } from '../../types/user-video';

@Injectable({
	providedIn: 'root'
})
export class UploadService {

	uploading: boolean = false;
	loadingVideos: boolean = false;
	loadingShared: boolean = false;

	constructor(private http: HttpClient) {}

	getVideos(userId: number): Observable<UserVideo[]> {
		return this.http.get<UserVideo[]>(`${environment.apiBaseUrl}/videos/user/${userId}`);
	}

	getSharedVideos(email: string):Observable<UserVideo[]> {
		const formData = new FormData();
		formData.append('email', email);
		const headers = new HttpHeaders().set('Accept', 'application/json');

		return this.http.post<UserVideo[]>(`${environment.apiBaseUrl}/shared`, formData, { headers });
	}

	upload(file: File, metaData: MetaData): Observable<UserVideo> {
		const formData = new FormData();
		formData.append('video', file, file.name);
		formData.append('author', `${metaData.author}`);
		formData.append('title', metaData.title);
		if(metaData.description) formData.append('description', metaData.description);
		if(metaData.tags) formData.append('tags', JSON.stringify(metaData.tags));
		const headers = new HttpHeaders().set('Accept', 'application/json');

		return this.http.post<UserVideo>(`${environment.apiBaseUrl}/videos`, formData, { headers });
	}

	edit(video: UserVideo): Observable<UserVideo> {
		const formData = new FormData();
		formData.append('id', video.id.toString());
		formData.append('title', video.title);
		if(video.description) formData.append('description', video.description);
		if(video.tags) formData.append('tags', JSON.stringify(video.tags));
		const headers = new HttpHeaders().set('Accept', 'application/json');

		return this.http.post<UserVideo>(`${environment.apiBaseUrl}/edit`, formData, { headers });
	}

	share(video: UserVideo): Observable<UserVideo> {
		const formData = new FormData();
		formData.append('video', video.id.toString());
		if(video.shared) formData.append('shared', JSON.stringify(video.shared));
		const headers = new HttpHeaders().set('Accept', 'application/json');

		return this.http.post<UserVideo>(`${environment.apiBaseUrl}/share`, formData, { headers });
	}
}
