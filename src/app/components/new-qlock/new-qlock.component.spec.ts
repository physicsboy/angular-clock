import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewQlockComponent } from './new-qlock.component';

describe('NewQlockComponent', () => {
  let component: NewQlockComponent;
  let fixture: ComponentFixture<NewQlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewQlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewQlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
