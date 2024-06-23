import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { TodoInputComponent } from './components/todo-input/input.component';
import { TodoListComponent } from './components/todo-list/list.component';
import { FilterComponent } from './components/filter/filter.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, TodoInputComponent, TodoListComponent, FilterComponent],
  template: `
    <section class="todoapp">
      <app-header></app-header>
      <todo-input></todo-input>
      <todo-list></todo-list>
      <filter></filter>
    </section>
  `
})
export class AppComponent {
}
