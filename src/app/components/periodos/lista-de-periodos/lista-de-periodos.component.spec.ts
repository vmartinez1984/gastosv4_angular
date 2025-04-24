import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDePeriodosComponent } from './lista-de-periodos.component';

describe('ListaDePeriodosComponent', () => {
  let component: ListaDePeriodosComponent;
  let fixture: ComponentFixture<ListaDePeriodosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaDePeriodosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaDePeriodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
