import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaliseComponent } from './balise.component';

describe('BaliseComponent', () => {
  let component: BaliseComponent;
  let fixture: ComponentFixture<BaliseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaliseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaliseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
