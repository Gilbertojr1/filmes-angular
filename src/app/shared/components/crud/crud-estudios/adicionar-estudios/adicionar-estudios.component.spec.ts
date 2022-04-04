import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarEstudiosComponent } from './adicionar-estudios.component';

describe('AdicionarEstudiosComponent', () => {
  let component: AdicionarEstudiosComponent;
  let fixture: ComponentFixture<AdicionarEstudiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdicionarEstudiosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionarEstudiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
