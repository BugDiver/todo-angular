import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { Todo } from "../../services/todo.service";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "todo-item",
  standalone: true,
  imports: [FormsModule],
  template: `
  <li [class.completed]="todo.completed" [class.editing]="isEditing">
    <div class="view">
      <input class="toggle" type="checkbox" [checked]="todo.completed" (click)="togleTodo()">
      <label (dblclick)="startEditing()">{{todo.title}}</label>
      <button class="destroy" (click)="removeTodo()"></button>
    </div>
    @if (isEditing) {
      <div class="input-container">
          <input #todoInputRef class="edit" id="edit-todo-input"
            [(ngModel)]="title"
            (focus)="handleFocus($event)"
            (blur)="handleBlur($event)"
            (keyup.enter)="updateTodo()" />
      </div>
    }

  </li>
  `
})
export class TodoItemComponent {
  @Input()  todo!: Todo;

  @Output() remove = new EventEmitter<Todo>();

  @ViewChild('todoInputRef') inputRef?: ElementRef;

  title = ''
  isEditing = false;

  removeTodo() {
    this.remove.emit(this.todo);
  }

  togleTodo() {
    this.todo.completed = !this.todo.completed;
  }

  startEditing() {
    this.isEditing = true;
  }

  handleBlur(e: Event) {
    this.isEditing = false;
  }

  handleFocus(e: Event) {
    this.title = this.todo.title;
  }

  updateTodo() {
    if (!this.title) {
      this.remove.emit(this.todo);
    } else {
      this.todo.title = this.title;
    }

    this.isEditing = false;
  }

  ngAfterViewChecked(): void {
    if (this.isEditing) {
      this.inputRef?.nativeElement.focus();
    }
  }

}