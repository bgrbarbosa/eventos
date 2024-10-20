import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvidadoCreateComponent } from './convidado-create.component';

describe('ConvidadoCreateComponent', () => {
  let component: ConvidadoCreateComponent;
  let fixture: ComponentFixture<ConvidadoCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConvidadoCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvidadoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
