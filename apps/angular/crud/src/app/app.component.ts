import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ITodo } from '../interface/interface';
import { ApiService } from '../services/api-service';
import { CrudStore } from '../stores/crud.store';
import { TodoItemComponent } from './todo-item.component';

@Component({
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, TodoItemComponent],
  selector: 'app-root',
  template: `
    <div *ngIf="isAppProcessing$ | async" class="indicator">
      <mat-spinner></mat-spinner>
    </div>
    @for (todo of todos$ | async; track todo.id) {
      <app-todo-item
        [title]="todo.title"
        [isProcessing]="isTodoItemProcessing(todo.id)"
        (update)="update(todo)"
        (delete)="delete(todo.id)"></app-todo-item>
    }
  `,
  styles: [
    `
      .indicator {
        position: absolute;
        width: 100%;
        height: 100%;
        display: grid;
        place-items: center;
        background: rgba(100, 100, 100, 0.5);
      }
    `,
  ],
  host: {
    styles: 'position: relative',
  },
  providers: [CrudStore],
})
export class AppComponent implements OnInit {
  private apiService = inject(ApiService);
  private crudStore = inject(CrudStore);

  todos$ = this.crudStore.todos$;
  isAppProcessing$ = this.crudStore.isAppProcessing$;

  ngOnInit(): void {
    this.crudStore.getTodoItems();
  }

  update(todo: ITodo) {
    this.crudStore.updateTodoItem(todo);
  }

  delete(id: number) {
    this.crudStore.deleteTodoItem(id);
  }

  isTodoItemProcessing(id: number): boolean {
    return this.crudStore.isTodoItemProcessing(id);
  }
}
