import { t, Instance } from "mobx-state-tree";

export const FiltersModel = t.model("Filters", {
  agent: t.maybe(t.string),
  type: t.maybe(t.union(t.literal("inbound"), t.literal("outbound"))),
  status: t.maybe(
    t.enumeration("Status", [
      "busy",
      "success",
      "transfer",
      "no_answer",
      "dropped",
    ])
  ),
  minCost: t.maybe(t.number),
  maxCost: t.maybe(t.number),
  caller: t.maybe(t.string),
  callee: t.maybe(t.string),
  startAfter: t.maybe(t.number), 
  endBefore: t.maybe(t.number),
});

export type FiltersType = Instance<typeof FiltersModel>;
