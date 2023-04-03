import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedVideosComponent } from './shared-videos.component';

describe('SharedVideosComponent', () => {
  let component: SharedVideosComponent;
  let fixture: ComponentFixture<SharedVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedVideosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
