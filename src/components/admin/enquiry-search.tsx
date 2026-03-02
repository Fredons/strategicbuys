"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

export function EnquirySearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [priorityFilter, setPriorityFilter] = useState(
    searchParams.get("priority") || "ALL"
  );

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      updateURL(search, priorityFilter);
    }, 300);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  function updateURL(searchValue: string, priority: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (searchValue) {
      params.set("search", searchValue);
    } else {
      params.delete("search");
    }

    if (priority && priority !== "ALL") {
      params.set("priority", priority);
    } else {
      params.delete("priority");
    }

    const query = params.toString();
    router.push(`/admin/enquiries${query ? `?${query}` : ""}`);
  }

  function handlePriorityChange(value: string) {
    setPriorityFilter(value);
    updateURL(search, value);
  }

  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email, or message..."
          className="w-full rounded-lg border-[1.5px] border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-800 focus:border-gold focus:outline-none"
        />
      </div>
      <select
        value={priorityFilter}
        onChange={(e) => handlePriorityChange(e.target.value)}
        className="rounded-lg border-[1.5px] border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 focus:border-gold focus:outline-none"
      >
        <option value="ALL">All Priorities</option>
        <option value="HOT">🔴 Hot</option>
        <option value="WARM">🟡 Warm</option>
        <option value="COLD">⚪ Cold</option>
      </select>
    </div>
  );
}
