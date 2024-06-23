import { Component, inject } from "@angular/core";
import { Todo, TodoService } from "../../services/todo.service";
import { TodoItemComponent } from "../todo-item/item.component";
import { Location } from "@angular/common";

@Component({
  selector: 'todo-list',
  standalone: true,
  imports: [TodoItemComponent],
  template: `
    @if (todos.length > 0) {
      <main class="main">
        <div class="toggle-all-container">
          <input class="toggle-all" type="checkbox" (change)="toggleAll($event)" [checked]="!activeTodos.length" />
          <label class="toggle-all-label" htmlFor="toggle-all">Toggle All Input</label>
        </div>
        <ul class="todo-list">
          @for (todo of todos; track todo.id) {
              <todo-item [todo]="todo" (remove)="remove($event)"></todo-item>
          }
        </ul>
      </main>
    }
  `
})
export class TodoListComponent {

  private todoService = inject(TodoService);
  private location = inject(Location);

  get todos() {
    const filter = this.location.path().split('/')[1] || 'all';
    return this.todoService.getTodos(filter);
  }

  get activeTodos() {
    return this.todoService.getTodos("active");
  }

  remove(todo: Todo) {
    this.todoService.deleteTodo(todo);
  }

  toggleAll(e: Event) {
    const target = e.target as HTMLInputElement;
    const checked = target.checked;
    this.todoService.toggleAll(checked);
  }
}