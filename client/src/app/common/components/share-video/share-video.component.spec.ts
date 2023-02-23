import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserVideo } from '../../types/user-video';

import { ShareVideoComponent } from './share-video.component';

describe('ShareVideoComponent', () => {
  let component: ShareVideoComponent;
  let fixture: ComponentFixture<ShareVideoComponent>;
  let mockDialogRef!: jasmine.SpyObj<MatDialogRef<ShareVideoComponent, any>>;

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj(['close']);
    await TestBed.configureTestingModule({
      declarations: [ ShareVideoComponent ],
      imports: [
        MatCardModule,
        MatButtonModule,
        FormsModule,
        MatDialogModule
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { id: 1, path: 'bogus/path', title: 'Bogus', description: 'Bogus'} as UserVideo},
        { provide: MatDialogRef, useValue: mockDialogRef }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShareVideoComponent);
    component = fixture.componentInstance;
    component.data = { id: 1, author: 1, path: 'bogus/path', title: 'Bogus' } as UserVideo;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('save', () => {
    it('should save the new shared email addresses', () => {
      component.shared = "bogus@email.com, bogus2@email.com";

      component.save();

      expect(mockDialogRef.close).toHaveBeenCalledWith({...component.data, shared: ["bogus@email.com","bogus2@email.com"]});
    });
  });

  describe('cancel', () => {
    it('should cancel changes', () => {
      component.cancel();

      expect(mockDialogRef.close).toHaveBeenCalledWith(component.data);
    })
  })

});
