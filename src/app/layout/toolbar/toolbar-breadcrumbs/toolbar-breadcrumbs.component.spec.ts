import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarBreadcrumbsComponent } from './toolbar-breadcrumbs.component';

describe('ToolbarBreadcrumbsComponent', () => {
  let component: ToolbarBreadcrumbsComponent;
  let fixture: ComponentFixture<ToolbarBreadcrumbsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToolbarBreadcrumbsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolbarBreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
