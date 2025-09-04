import React, { useState } from "react";
import data from "./data.json";

function App() {
  const [tableData] = useState(data);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  // Sorting logic
  const sortedData = [...tableData].sort((a, b) => {
    if (!sortConfig.key) return 0;
    if (a[sortConfig.key] < b[sortConfig.key])
      return sortConfig.direction === "asc" ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key])
      return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Filter + Pagination
  const paginatedData = sortedData
    .filter((row) =>
      row.name.toLowerCase().includes(search.toLowerCase())
    )
    .slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">React Data Table</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by name..."
        className="border px-2 py-1 mb-4"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1); // reset to page 1 when search changes
        }}
      />

      {/* Table */}
      <table className="table-auto border-collapse border w-full">
        <thead>
          <tr className="bg-gray-200">
            <th
              className="border px-4 py-2 cursor-pointer"
              onClick={() => handleSort("id")}
            >
              ID {sortConfig.key === "id" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
            </th>
            <th
              className="border px-4 py-2 cursor-pointer"
              onClick={() => handleSort("name")}
            >
              Name {sortConfig.key === "name" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
            </th>
            <th
              className="border px-4 py-2 cursor-pointer"
              onClick={() => handleSort("date")}
            >
              Date {sortConfig.key === "date" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
            </th>
            <th
              className="border px-4 py-2 cursor-pointer"
              onClick={() => handleSort("status")}
            >
              Status {sortConfig.key === "status" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
            </th>
            <th
              className="border px-4 py-2 cursor-pointer"
              onClick={() => handleSort("amount")}
            >
              Amount {sortConfig.key === "amount" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row) => (
            <tr key={row.id}>
              <td className="border px-4 py-2">{row.id}</td>
              <td className="border px-4 py-2">{row.name}</td>
              <td className="border px-4 py-2">{row.date}</td>
              <td className="border px-4 py-2">{row.status}</td>
              <td className="border px-4 py-2">{row.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className="flex gap-2 mt-4">
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>
        <span>Page {page}</span>
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          disabled={page * rowsPerPage >= sortedData.filter((row) =>
            row.name.toLowerCase().includes(search.toLowerCase())
          ).length}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
