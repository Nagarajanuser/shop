import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductsByCatwiseComponent } from './list-products-by-catwise.component';

describe('ListProductsByCatwiseComponent', () => {
  let component: ListProductsByCatwiseComponent;
  let fixture: ComponentFixture<ListProductsByCatwiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProductsByCatwiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProductsByCatwiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
