import { Component } from "@angular/core";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [],
  template: `
  <header class="header">
    <h1>{{title}}</h1>
  </header>
  `
})
export class HeaderComponent {
  title = "Todos";
}