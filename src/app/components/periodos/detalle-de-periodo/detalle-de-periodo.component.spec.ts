import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleDePeriodoComponent } from './detalle-de-periodo.component';

describe('DetalleDePeriodoComponent', () => {
  let component: DetalleDePeriodoComponent;
  let fixture: ComponentFixture<DetalleDePeriodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleDePeriodoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleDePeriodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
