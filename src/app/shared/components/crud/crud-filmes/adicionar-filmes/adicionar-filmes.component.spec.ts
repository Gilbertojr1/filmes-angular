import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarFilmesComponent } from './adicionar-filmes.component';

describe('AdicionarFilmesComponent', () => {
  let component: AdicionarFilmesComponent;
  let fixture: ComponentFixture<AdicionarFilmesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdicionarFilmesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionarFilmesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
