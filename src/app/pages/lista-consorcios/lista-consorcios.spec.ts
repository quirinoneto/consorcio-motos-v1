import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaConsorcios } from './lista-consorcios';

describe('ListaConsorcios', () => {
  let component: ListaConsorcios;
  let fixture: ComponentFixture<ListaConsorcios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaConsorcios]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaConsorcios);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
