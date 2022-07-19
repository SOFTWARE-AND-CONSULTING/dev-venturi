import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogManifiestoComponent } from './dialog-manifiesto.component';

describe('DialogManifiestoComponent', () => {
  let component: DialogManifiestoComponent;
  let fixture: ComponentFixture<DialogManifiestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogManifiestoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogManifiestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
