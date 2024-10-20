import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosConvidadosComponent } from './eventos-convidados.component';

describe('EventosConvidadosComponent', () => {
  let component: EventosConvidadosComponent;
  let fixture: ComponentFixture<EventosConvidadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventosConvidadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventosConvidadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
