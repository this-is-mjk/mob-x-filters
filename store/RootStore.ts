import { applySnapshot, flow, Instance, t } from "mobx-state-tree";
// import { Todo } from "./TodoModel";
// import { User } from "./UserModel";
import { ConversationModel } from "./ConversationModel";
import { FiltersModel } from "./FilterModel";

export type RootStoreType = Instance<typeof RootStore>;

export const store = t
  .model({
    conversations: t.map(ConversationModel),
    filters: t.optional(FiltersModel, {}),
  })
  .views((self) => ({
    get filteredConversations() {
      return Array.from(self.conversations.values()).filter((conv) => {
        const f = self.filters;
        return (
          (!f.agent || conv.agent === f.agent) &&
          (!f.type || conv.callInfo.type === f.type) &&
          (!f.status || conv.status === f.status) &&
          (!f.minCost || conv.cost >= f.minCost) &&
          (!f.maxCost || conv.cost <= f.maxCost) &&
          (!f.caller || conv.callInfo.caller.includes(f.caller)) &&
          (!f.callee || conv.callInfo.callee.includes(f.callee)) &&
          (!f.startAfter || conv.startTime >= f.startAfter) &&
          (!f.endBefore || conv.startTime <= f.endBefore)
        );
      });
    },
  }))
  .actions((self) => ({
    // k is one of the keys in the filter model
    setFilters<K extends keyof typeof self.filters>(
      key: K,
      value: (typeof self.filters)[K]
    ) {
      // set the value
      self.filters[key] = value;
    },
    clearFilters() {
      applySnapshot(self.filters, {});
    },
    fetchConversations: flow(function* () {
      try {
        const res = yield fetch("/api/conversations");
        const data = yield res.json();
        data.forEach((conv: any) => {
          self.conversations.set(conv.id, ConversationModel.create(conv));
        });
      } catch (err) {
        console.error("Failed to fetch conversations:", err);
      }
    }),
  }));
export const RootStore = store.create({
  conversations: {},
});
