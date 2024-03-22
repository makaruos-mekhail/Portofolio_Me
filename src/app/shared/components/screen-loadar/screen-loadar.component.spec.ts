import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenLoadarComponent } from './screen-loadar.component';

describe('ScreenLoadarComponent', () => {
  let component: ScreenLoadarComponent;
  let fixture: ComponentFixture<ScreenLoadarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScreenLoadarComponent]
    });
    fixture = TestBed.createComponent(ScreenLoadarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
