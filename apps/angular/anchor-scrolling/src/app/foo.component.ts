import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavButtonComponent } from './nav-button.component';

@Component({
  standalone: true,
  imports: [NavButtonComponent, RouterLink],
  selector: 'app-foo',
  template: `
    Welcome to foo page
    <nav-button routerLink="/home" class="fixed left-1/2 top-3">
      Home Page
    </nav-button>
    <div id="section1" class="h-screen bg-blue-200">
      <nav-button (click)="onClickScroll('section2')">section 2</nav-button>
    </div>
    <div id="section2" class="h-screen bg-red-200">
      <nav-button (click)="onClickScroll('section1')">section 1</nav-button>
    </div>
  `,
})
export class FooComponent {
  constructor(private viewportScroller: ViewportScroller) {}

  onClickScroll(elementId: string): void {
    if (elementId) {
      this.viewportScroller.scrollToAnchor(elementId);
    }
  }
}
