import { t, Instance } from "mobx-state-tree";

const StatsModel = t.model("ConversationStats", {
  llmLatency: t.number,
  ttsLatency: t.number,
  interruptions: t.number,
});

const CallInfoModel = t.model("CallInfo", {
  caller: t.string,
  callee: t.string,
  type: t.union(t.literal("inbound"), t.literal("outbound")),
  stats: t.maybe(StatsModel),
});

export const ConversationModel = t.model("Conversation", {
  id: t.identifier,
  agent: t.string,
  startTime: t.number,
  duration: t.number,
  cost: t.number,
  status: t.union(
    t.literal("busy"),
    t.literal("success"),
    t.literal("transfer"),
    t.literal("no_answer"),
    t.literal("dropped")
  ),
  callInfo: CallInfoModel,
});

export type ConversationType = Instance<typeof ConversationModel>;
