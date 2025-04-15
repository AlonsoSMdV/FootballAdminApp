import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LineupsPage } from './lineups.page';

describe('LineupsPage', () => {
  let component: LineupsPage;
  let fixture: ComponentFixture<LineupsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LineupsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
