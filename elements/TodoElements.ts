import { Locator, Page } from "@playwright/test";

export class TodoElements {
  readonly page: Page;
  readonly newTodoInput: Locator;
  readonly todoItems: Locator;
  readonly todoCheckbox: Locator;
  readonly deleteButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newTodoInput = this.page.getByPlaceholder("What needs to be done?");
    this.todoItems = this.page.getByTestId("todo-item");
    this.todoCheckbox = this.page.getByRole("checkbox");
    this.deleteButton = this.page.getByRole("button", { name: "Delete" });
  }
}

export default TodoElements;
