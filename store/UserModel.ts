import { t } from "mobx-state-tree";

export const User = t.model({
  id: t.identifier,
  name: t.optional(t.string, ""),
});
