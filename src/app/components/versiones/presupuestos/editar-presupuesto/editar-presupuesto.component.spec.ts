import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPresupuestoComponent } from './editar-presupuesto.component';

describe('EditarPresupuestoComponent', () => {
  let component: EditarPresupuestoComponent;
  let fixture: ComponentFixture<EditarPresupuestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarPresupuestoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarPresupuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
