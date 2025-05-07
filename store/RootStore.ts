import { Instance, t } from "mobx-state-tree";
import { Todo } from "./TodoModel";
import { User } from "./UserModel";

export const store = t
  .model({
    users: t.map(User),
    todos: t.map(Todo),
  })
  .views((self) => ({
    get pendingCount() {
      return Array.from(self.todos.values()).filter((todo) => !todo.done)
        .length;
    },
    get completeCount() {
      return Array.from(self.todos.values()).filter((todo) => todo.done).length;
    },
    getTodosWhereDoneIs(done: boolean) {
      return Array.from(self.todos.values()).filter(
        (todo) => todo.done === done
      );
    },
  }))
  .actions((self) => ({
    addTodo(id: number, name: string) {
      self.todos.set(String(id), Todo.create({ name }));
    },
  }));

export type RootStoreType = Instance<typeof RootStore>;

export const RootStore = store.create({
  users: {},
  todos: {},
});
