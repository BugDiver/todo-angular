import { Component } from "@angular/core";
import { TodoService } from "../../services/todo.service";
import { Location } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'filter',
  standalone: true,
  imports: [RouterLink],
  template: `
    @if (todos.length > 0) {
      <footer class="footer">
        <span class="todo-count">
          <strong>{{ activeTodos.length }}</strong>
          {{ activeTodos.length === 1 ? "item" : "items" }} left
        </span>
        <ul class="filters">
          <li>
            <a routerLink="/" [class.selected]="filter === 'all'">All</a>
          </li>
          <li>
            <a routerLink="/active" [class.selected]="filter === 'active'">Active</a>
          </li>
          <li>
            <a routerLink="/completed" [class.selected]="filter === 'completed'">Completed</a>
          </li>
        </ul>
        @if (completedTodos.length > 0) {
          <button type="button" class="clear-completed" (click)="clearCompleted()">
            Clear Completed
          </button>
        }
      </footer>
    }
  `
})
export class FilterComponent {
  constructor(private todoService: TodoService, private location: Location) {}

  get todos() {
    return this.todoService.getTodos();
  }

  get filter(): string {
    return this.location.path().split('/')[1] || 'all';
  }

  get activeTodos() {
    return this.todoService.getTodos("active");
  }

  get completedTodos() {
    return this.todoService.getTodos("completed");
  }


  clearCompleted() {
    this.todoService.clearCompleted();
  }
}