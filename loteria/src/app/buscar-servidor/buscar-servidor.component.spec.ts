import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarServidorComponent } from './buscar-servidor.component';

describe('BuscarServidorComponent', () => {
  let component: BuscarServidorComponent;
  let fixture: ComponentFixture<BuscarServidorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscarServidorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscarServidorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
