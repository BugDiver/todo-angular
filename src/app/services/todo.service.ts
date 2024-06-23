import { Injectable } from "@angular/core";

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

@Injectable({ providedIn: 'root' })
export class TodoService {

  private todos: Todo[] = [];

  toggleAll(completed: boolean) {
    this.todos = this.todos.map(t => ({ ...t, completed }));
  }

  getTodos(status: string = "all") {
    switch (status) {
      case "active":
        return this.todos.filter(t => !t.completed);
      case "completed":
        return this.todos.filter(t => t.completed);
    }
    return this.todos;
  }

  addTodo(todo: Todo) {
    this.todos.push(todo);
  }

  deleteTodo(todo: Todo): void {
    const index = this.todos.indexOf(todo);
    this.todos.splice(index, 1);
  }


  clearCompleted() {
    this.todos = this.todos.filter(t => !t.completed);
  }
}