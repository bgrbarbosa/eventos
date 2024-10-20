import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvidadoUpdateComponent } from './convidado-update.component';

describe('ConvidadoUpdateComponent', () => {
  let component: ConvidadoUpdateComponent;
  let fixture: ComponentFixture<ConvidadoUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConvidadoUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvidadoUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
