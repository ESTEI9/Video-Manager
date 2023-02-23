import { of } from 'rxjs';

export class MockUploadService {
    constructor() {}

    getVideos = () => of();
    getSharedVideos = () => of();
    edit = () => of();
    share = () => of();
}