import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvidadoConsultaComponent } from './convidado-consulta.component';

describe('ConvidadoConsultaComponent', () => {
  let component: ConvidadoConsultaComponent;
  let fixture: ComponentFixture<ConvidadoConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConvidadoConsultaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvidadoConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
