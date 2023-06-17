import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbsNavComponent } from './breadcrumbs-nav.component';

describe('BreadcrumbsNavComponent', () => {
  let component: BreadcrumbsNavComponent;
  let fixture: ComponentFixture<BreadcrumbsNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BreadcrumbsNavComponent]
    });
    fixture = TestBed.createComponent(BreadcrumbsNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
