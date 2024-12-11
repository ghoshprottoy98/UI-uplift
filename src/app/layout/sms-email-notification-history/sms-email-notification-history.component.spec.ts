import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsEmailNotificationHistoryComponent } from './sms-email-notification-history.component';

describe('SmsEmailNotificationHistoryComponent', () => {
  let component: SmsEmailNotificationHistoryComponent;
  let fixture: ComponentFixture<SmsEmailNotificationHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SmsEmailNotificationHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmsEmailNotificationHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
