import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioDeCompraComponent } from './formulario-de-compra.component';

describe('FormularioDeCompraComponent', () => {
  let component: FormularioDeCompraComponent;
  let fixture: ComponentFixture<FormularioDeCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioDeCompraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioDeCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
