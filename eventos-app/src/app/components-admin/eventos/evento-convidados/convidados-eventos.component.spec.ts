import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvidadosEventosComponent } from './convidados-eventos.component';

describe('ConvidadosEventosComponent', () => {
  let component: ConvidadosEventosComponent;
  let fixture: ComponentFixture<ConvidadosEventosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConvidadosEventosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvidadosEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
