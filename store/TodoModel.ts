import { t } from "mobx-state-tree";
import { User } from "./UserModel";

export const Todo = t
  .model({
    name: t.optional(t.string, ""),
    done: t.optional(t.boolean, false),
    user: t.maybe(t.reference(t.late(() => User)))
  })
  .actions((self) => ({
    setName(newName: string) {
      self.name = newName;
    },
    setUser(user: string) {
      if (user === ""){
        self.user = undefined
      }else {
        self.user = user as any
      }
    },
    toggle() {
      self.done = !self.done;
    },
  }));
