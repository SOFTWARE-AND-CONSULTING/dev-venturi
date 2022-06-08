import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAggItemsComponent } from './dialog-agg-items.component';

describe('DialogAggItemsComponent', () => {
  let component: DialogAggItemsComponent;
  let fixture: ComponentFixture<DialogAggItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAggItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAggItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
