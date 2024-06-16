import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearServidorComponent } from './crear-servidor.component';

describe('CrearServidorComponent', () => {
  let component: CrearServidorComponent;
  let fixture: ComponentFixture<CrearServidorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearServidorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearServidorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
