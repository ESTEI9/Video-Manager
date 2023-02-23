import { of } from 'rxjs';

export class MockUserService {
    signUp = () => of()
    login = () => of()
    logout = () => {}
}