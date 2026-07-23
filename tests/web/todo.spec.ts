import { expect } from "@playwright/test";
import { test } from "playwright-opentelemetry/fixture";
import TodoPage from "../../pages/TodoPage";

test.describe("TodoMVC Tests", () => {
  test.beforeEach(async ({ page }) => {
    const todoPage = new TodoPage(page);
    await todoPage.navigate();
  });

  test("should add a todo", async ({ page }) => {
    const todoPage = new TodoPage(page);

    await todoPage.addTodo("Buy groceries");

    const items = await todoPage.getTodoItems();
    await expect(items).toHaveCount(1);
    await expect(items).toContainText("Buy groceries");
  });

  test("should complete a todo", async ({ page }) => {
    const todoPage = new TodoPage(page);

    await todoPage.addTodo("Buy groceries");
    await todoPage.completeTodo(0);

    const items = await todoPage.getTodoItems();
    await expect(items.nth(0)).toHaveClass(/completed/);
  });

  test("should delete a todo", async ({ page }) => {
    const todoPage = new TodoPage(page);

    await todoPage.addTodo("Buy groceries");
    await todoPage.deleteTodo(0);

    const items = await todoPage.getTodoItems();
    await expect(items).toHaveCount(0);
  });
});
