"use client";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { RootStore } from "@/store/RootStore";

export default observer(function InsightsPage() {
  const store = RootStore;

  // Optional: Load data from API
  useEffect(() => {
    store.fetchConversations();
  }, []);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Conversation Insights</h1>

      {/* Filters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <input
          placeholder="Agent"
          className="border p-2"
          onChange={(e) =>
            store.setFilters("agent", e.target.value || undefined)
          }
        />
        <select
          className="border p-2"
          onChange={(e) =>
            store.setFilters(
              "type",
              e.target.value as "inbound" | "outbound" | undefined
            )
          }
        >
          <option value="">Type</option>
          <option value="inbound">Inbound</option>
          <option value="outbound">Outbound</option>
        </select>
        <select
          className="border p-2"
          onChange={(e) =>
            store.setFilters("status", e.target.value || undefined)
          }
        >
          <option value="">Status</option>
          <option value="busy">Busy</option>
          <option value="success">Success</option>
          <option value="transfer">Transfer</option>
          <option value="no_answer">No Answer</option>
          <option value="dropped">Dropped</option>
        </select>
        <button
          onClick={store.clearFilters}
          className="bg-gray-100 px-3 py-2 rounded border"
        >
          Clear Filters
        </button>
      </div>

      {/* Table of Filtered Conversations */}
      <table className="w-full text-left border mt-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Agent</th>
            <th className="p-2 border">Type</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Cost</th>
            <th className="p-2 border">Duration</th>
          </tr>
        </thead>
        <tbody>
          {store.filteredConversations.map((conv) => (
            <tr key={conv.id}>
              <td className="p-2 border">{conv.id}</td>
              <td className="p-2 border">{conv.agent}</td>
              <td className="p-2 border">{conv.callInfo.type}</td>
              <td className="p-2 border">{conv.status}</td>
              <td className="p-2 border">${conv.cost.toFixed(2)}</td>
              <td className="p-2 border">{conv.duration}s</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});
