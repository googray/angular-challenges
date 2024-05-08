import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  template: `
    <div class="todo-item">
      <div class="todo-content">
        @if (isProcessing) {
          <mat-spinner [diameter]="16"></mat-spinner>
        } @else {
          <span class="title">{{ title }}</span>
        }
      </div>
      <div class="todo-action">
        <button
          class="update-btn"
          [disabled]="isProcessing"
          (click)="update.emit()">
          Update
        </button>
        <button
          class="delete-btn"
          [disabled]="isProcessing"
          (click)="delete.emit()">
          Delete
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .todo-item {
        display: flex;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoItemComponent {
  @Output() update = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  @Input() title!: string;
  @Input() isProcessing = false;
}
