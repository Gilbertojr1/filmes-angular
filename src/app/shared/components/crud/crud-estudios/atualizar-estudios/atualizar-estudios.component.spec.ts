import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtualizarEstudiosComponent } from './atualizar-estudios.component';

describe('AtualizarEstudiosComponent', () => {
  let component: AtualizarEstudiosComponent;
  let fixture: ComponentFixture<AtualizarEstudiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtualizarEstudiosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtualizarEstudiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
