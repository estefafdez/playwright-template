import { Page } from "@playwright/test";
import TodoElements from "../elements/TodoElements";

export class TodoPage {
  readonly page: Page;
  todoElements: TodoElements;

  constructor(page: Page) {
    this.page = page;
    this.todoElements = new TodoElements(this.page);
  }

  async navigate() {
    await this.page.goto("https://demo.playwright.dev/todomvc/#/");
  }

  async addTodo(text: string) {
    await this.todoElements.newTodoInput.fill(text);
    await this.todoElements.newTodoInput.press("Enter");
  }

  async completeTodo(index: number = 0) {
    await this.todoElements.todoItems.nth(index).getByRole("checkbox").click();
  }

  async deleteTodo(index: number = 0) {
    const item = this.todoElements.todoItems.nth(index);
    await item.hover();
    await item.getByRole("button", { name: "Delete" }).click();
  }

  async getTodoItems() {
    return this.todoElements.todoItems;
  }
}

export default TodoPage;
