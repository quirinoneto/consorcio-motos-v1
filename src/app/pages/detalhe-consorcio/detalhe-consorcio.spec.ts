import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheConsorcio } from './detalhe-consorcio';

describe('DetalheConsorcio', () => {
  let component: DetalheConsorcio;
  let fixture: ComponentFixture<DetalheConsorcio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalheConsorcio]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalheConsorcio);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
