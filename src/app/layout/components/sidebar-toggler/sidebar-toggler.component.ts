import { Component, Input } from '@angular/core';
import { LayoutService } from '../../layout.service';

const btnSidebarTogglerTlClass = {
  'sidebar-btn-bg-dark': "p-2 m-2 text-gray-400 hover:text-white focus:outline-none",
  'sidebar-btn-bg-light': "p-2 m-2 text-gray-400 hover:text-gray-600 focus:outline-none",
};

@Component({
  selector: 'app-sidebar-toggler',
  templateUrl: './sidebar-toggler.component.html',
  styleUrl: './sidebar-toggler.component.scss'
})
export class SidebarTogglerComponent {
  @Input() styleName: 'sidebar-btn-bg-dark' | 'sidebar-btn-bg-light' = 'sidebar-btn-bg-dark';
  
  constructor(private layoutService: LayoutService) {}

  get btnClass(): string {
    return btnSidebarTogglerTlClass[this.styleName];
  }


  toggleSidebar(): void {
    this.layoutService.toggleSidebar();
  }
}