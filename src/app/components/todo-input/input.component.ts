import { Component, inject } from "@angular/core";
import { TodoService } from "../../services/todo.service";
import { FormsModule } from "@angular/forms";


@Component({
  selector: 'todo-input',
  standalone: true,
  imports: [FormsModule],
  template: `
  <input class="new-todo"
  placeholder="What needs to be done?"
  [(ngModel)]="title"
  (keyup.enter)="addTodo()"
  autofocus>
  `
})
export class TodoInputComponent {

  title: string = "";
  private todoService = inject(TodoService);

  addTodo() {
    console.log('addTodo', this);
    this.todoService.addTodo({
      id: Date.now(),
      title: this.title,
      completed: false
    });
    this.title = "";
  }
}