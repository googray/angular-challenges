import { Injectable, inject } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable, concatMap, exhaustMap, tap } from 'rxjs';
import { ITodo } from '../interface/interface';
import { ApiService } from '../services/api-service';

export interface CrudState {
  isAppProcessing: boolean;
  todos: ITodo[];
  processingTodos: Set<number>;
}

const initialState: CrudState = {
  isAppProcessing: false,
  todos: [],
  processingTodos: new Set(),
};

@Injectable()
export class CrudStore extends ComponentStore<CrudState> {
  private apiService = inject(ApiService);
  constructor() {
    super(initialState);
  }

  readonly isAppProcessing$ = this.select((state) => state.isAppProcessing);
  readonly todos$ = this.select((state) => state.todos);

  public setTodoItemProcessing(id: number, flag: boolean) {
    this.patchState((state) => {
      if (flag) {
        state.processingTodos.add(id);
      } else {
        state.processingTodos.delete(id);
      }
      return state;
    });
  }

  public isTodoItemProcessing(id: number): boolean {
    return this.state().processingTodos.has(id);
  }

  readonly getTodoItems = this.effect((trigger$) => {
    this.setState((state) => ({ ...state, isAppProcessing: true }));

    return trigger$.pipe(
      exhaustMap(() => {
        return this.apiService.getData().pipe(
          tap((todos: ITodo[]) => {
            this.setState((state) => ({
              ...state,
              todos,
              isAppProcessing: false,
            }));
          }),
        );
      }),
    );
  });

  readonly updateTodoItem = this.effect((todoItem$: Observable<ITodo>) => {
    return todoItem$.pipe(
      tap((todoItem) => this.setTodoItemProcessing(todoItem.id, true)),
      concatMap((todoItem) =>
        this.apiService.updateTodoItem(todoItem).pipe(
          tap((updateItem) => {
            this.setTodoItemProcessing(updateItem.id, false);
            this.patchState((state) => {
              const prevIndex = state.todos.findIndex(
                (v) => v.id === todoItem.id,
              );
              if (prevIndex !== -1) state.todos[prevIndex] = updateItem;
              return state;
            });
          }),
        ),
      ),
    );
  });

  readonly deleteTodoItem = this.effect((id$: Observable<number>) => {
    return id$.pipe(
      tap((id) => this.setTodoItemProcessing(id, true)),
      concatMap((id) =>
        this.apiService.deleteTodoItem(id).pipe(
          tap(() => {
            this.patchState((state) => {
              const todos = state.todos.filter((v) => v.id !== id);
              return { todos };
            });
          }),
        ),
      ),
    );
  });
}
