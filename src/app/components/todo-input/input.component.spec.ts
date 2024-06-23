import { TestBed } from '@angular/core/testing';
import { TodoInputComponent } from './input.component';
import { TodoService } from '../../services/todo.service';
import { By } from '@angular/platform-browser';

describe('TodoInputComponent', () => {
  const todoService = {
    addTodo: jest.fn()
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoInputComponent],
      providers: [{
        provide: TodoService,
        useValue: todoService
      }]
    }).compileComponents();
  });

  it('should create the input component', () => {
    const fixture = TestBed.createComponent(TodoInputComponent);
    const app = fixture.componentInstance;
    expect(app).toBeDefined()
  });

  it('should render input bar', () => {
    const fixture = TestBed.createComponent(TodoInputComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const input = compiled.querySelector('input')!
    expect(input.placeholder).toEqual('What needs to be done?');
    expect(input.classList.contains('new-todo')).toBe(true);
  });

  it('should add todo', async () => {
    const fixture = TestBed.createComponent(TodoInputComponent);
    fixture.detectChanges();
    const comp = fixture.componentInstance;
    const comp_de = fixture.debugElement;
    const inputElm = comp_de.query(By.css('input')).nativeElement as HTMLInputElement;
    inputElm.value = 'test';
    inputElm.dispatchEvent(new InputEvent('input'));
    inputElm.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));
    await fixture.whenStable();
    expect(todoService.addTodo).toHaveBeenCalledWith({
      id: expect.any(Number),
      title: 'test',
      completed: false
    });
  });
});
