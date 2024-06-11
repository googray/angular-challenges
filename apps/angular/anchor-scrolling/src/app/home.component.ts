import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavButtonComponent } from './nav-button.component';

@Component({
  standalone: true,
  imports: [NavButtonComponent, RouterLink],
  selector: 'app-home',
  template: `
    <nav-button routerLink="/foo" class="fixed left-1/2 top-3">
      Foo Page
    </nav-button>
    <div id="top" class="h-screen bg-gray-500">
      Empty
      <nav-button (click)="onClickScroll('bottom')">Scroll Bottom</nav-button>
    </div>
    <div id="bottom" class="h-screen bg-blue-300">
      I want to scroll each
      <nav-button (click)="onClickScroll('top')">Scroll Top</nav-button>
    </div>
  `,
})
export class HomeComponent {
  constructor(private viewportScroller: ViewportScroller) {}

  onClickScroll(elementId: string): void {
    if (elementId) {
      this.viewportScroller.scrollToAnchor(elementId);
    }
  }
}
