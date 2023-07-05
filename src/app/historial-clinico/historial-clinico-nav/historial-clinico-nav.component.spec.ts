import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialClinicoNavComponent } from './historial-clinico-nav.component';

describe('HistorialClinicoNavComponent', () => {
  let component: HistorialClinicoNavComponent;
  let fixture: ComponentFixture<HistorialClinicoNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialClinicoNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialClinicoNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
