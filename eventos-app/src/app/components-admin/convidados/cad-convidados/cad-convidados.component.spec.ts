import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadConvidadosComponent } from './cad-convidados.component';

describe('CadConvidadosComponent', () => {
  let component: CadConvidadosComponent;
  let fixture: ComponentFixture<CadConvidadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadConvidadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadConvidadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
