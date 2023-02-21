import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UserVideo } from '../../types/user-video';

import { EditVideoComponent } from './edit-video.component';

describe('EditVideoComponent', () => {
  let component: EditVideoComponent;
  let fixture: ComponentFixture<EditVideoComponent>;
  let dialogRefMock!: jasmine.SpyObj<MatDialogRef<EditVideoComponent, any>>;

  beforeEach(async () => {
    dialogRefMock = jasmine.createSpyObj(['close']);
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatDialogModule, MatIconModule, MatSnackBarModule],
      declarations: [ EditVideoComponent ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: { id: 1, path: 'bogus/path', title: 'Bogus', description: 'Bogus'} as UserVideo}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('save', () => {
    it('should save the changes to the video', () => {
      component.description = 'Bogus Description';
      component.title = 'Bogus Video';

      const res = { ...component.video, description: component.description, title: component.title, tags: undefined };

      component.save();

      expect(dialogRefMock.close).toHaveBeenCalledWith(res);
    });
  });
});
