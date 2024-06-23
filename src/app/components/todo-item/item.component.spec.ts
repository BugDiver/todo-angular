import { TestBed } from '@angular/core/testing';
import { TodoItemComponent } from './item.component';
import { TodoService } from '../../services/todo.service';
import { By } from '@angular/platform-browser';

describe('TodoItemComponent', () => {
  const todoService = {
    addTodo: jest.fn()
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoItemComponent],
      providers: [{
        provide: TodoService,
        useValue: todoService
      }]
    }).compileComponents();
  });

  it('should create the item component', () => {
    const fixture = TestBed.createComponent(TodoItemComponent);
    const app = fixture.componentInstance;
    expect(app).toBeDefined()
  });

});
