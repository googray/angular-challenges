import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-list-item',
  template: `
    <div class="border-grey-300 flex justify-between border px-2 py-1">
      <ng-content></ng-content>
      <button (click)="deleteItem()">
        <img class="h-5" src="assets/svg/trash.svg" />
      </button>
    </div>
  `,
  standalone: true,
  imports: [CommonModule],
})
export class ListItemComponent {
  @Output() deleteEvent = new EventEmitter<void>();

  deleteItem() {
    this.deleteEvent.emit();
  }
}
