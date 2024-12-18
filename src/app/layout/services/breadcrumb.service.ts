import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private traversedTitlesSubject = new BehaviorSubject<string[]>([]);
  traversedTitles$ = this.traversedTitlesSubject.asObservable();

  updateTraversedTitles(titles: string[]): void {
    this.traversedTitlesSubject.next(titles);
  }
}
