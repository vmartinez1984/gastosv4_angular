import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioDePresupuestoComponent } from './formulario-de-presupuesto.component';

describe('FormularioDePresupuestoComponent', () => {
  let component: FormularioDePresupuestoComponent;
  let fixture: ComponentFixture<FormularioDePresupuestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioDePresupuestoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioDePresupuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
