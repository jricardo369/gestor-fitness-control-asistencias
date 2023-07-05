import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagosHomeComponent } from './pagos-home.component';

describe('PagosHomeComponent', () => {
  let component: PagosHomeComponent;
  let fixture: ComponentFixture<PagosHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagosHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagosHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
