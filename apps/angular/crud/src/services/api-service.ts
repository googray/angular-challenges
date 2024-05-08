import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { randText } from '@ngneat/falso';
import { ITodo } from '../interface/interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly url = 'https://jsonplaceholder.typicode.com';
  public http = inject(HttpClient);
  todos = signal<ITodo[]>([]);

  // constructor() {}

  public getData() {
    return this.http.get<ITodo[]>(`${this.url}/todos`);
  }

  public updateTodoItem(item: ITodo) {
    const itemBody = {
      todo: item.id,
      title: randText(),
      body: item.title,
      userId: item.userId,
    };

    return this.http.put<ITodo>(
      `${this.url}/todos/${item.id}`,
      JSON.stringify(itemBody),
      {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    );
  }

  public deleteTodoItem(id: number) {
    return this.http.delete<void>(`${this.url}/todos/${id}`);
  }
}
