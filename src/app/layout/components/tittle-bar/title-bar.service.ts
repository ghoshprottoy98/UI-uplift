import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TitleBarService {
  private titleSource = new BehaviorSubject<string>('Default Title');
  currentTitle$ = this.titleSource.asObservable();

  setTitle(newTitle: string): void {
    this.titleSource.next(newTitle);
  }
}
