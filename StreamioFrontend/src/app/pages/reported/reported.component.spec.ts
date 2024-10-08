import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportedComponent } from './reported.component';

describe('ReportedComponent', () => {
  let component: ReportedComponent;
  let fixture: ComponentFixture<ReportedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
