import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebNotificationsComponent } from './web-notifications.component';

describe('WebNotificationsComponent', () => {
  let component: WebNotificationsComponent;
  let fixture: ComponentFixture<WebNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WebNotificationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
