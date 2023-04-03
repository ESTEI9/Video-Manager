import { of } from 'rxjs';

export class MockVideoService {
    constructor() {}

    getVideos = () => of();
    getSharedVideos = () => of();
    edit = () => of();
    share = () => of();
}