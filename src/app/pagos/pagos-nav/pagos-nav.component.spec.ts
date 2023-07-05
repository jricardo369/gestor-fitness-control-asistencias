import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagosNavComponent } from './pagos-nav.component';

describe('PagosNavComponent', () => {
  let component: PagosNavComponent;
  let fixture: ComponentFixture<PagosNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagosNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagosNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
