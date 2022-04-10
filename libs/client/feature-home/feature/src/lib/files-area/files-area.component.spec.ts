import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesAreaComponent } from './files-area.component';

describe('FilesAreaComponent', () => {
  let component: FilesAreaComponent;
  let fixture: ComponentFixture<FilesAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilesAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
