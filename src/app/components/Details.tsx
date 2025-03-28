"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";


// Define User Type
type User = {
  id: number;
  name: string;
  email: string;
};

export default function Details() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data: User[]) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleSort = () => {
    const sortedUsers = [...users].sort((a, b) =>
      sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
    setUsers(sortedUsers);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );
  const paginatedUsers = filteredUsers.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <>
        <Sidebar />
        <h1 className="text-2xl font-bold mb-4">Details Dashboard</h1>

        {/* Search Bar */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search Users"
            className="p-2 mb-4 bg-gray-700 rounded-2xl"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* User Table */}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full max-w-3xl">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user) => (
                <tr key={user.id} className="bg-white border-b dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex gap-2">
          <button 
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="text-white bg-blue-700 px-5 py-2.5 rounded-lg hover:bg-blue-800 disabled:opacity-50"
          >
            Prev
          </button>
          <button 
            disabled={page * itemsPerPage >= filteredUsers.length}
            onClick={() => setPage(page + 1)}
            className="text-white bg-blue-700 px-5 py-2.5 rounded-lg hover:bg-blue-800 disabled:opacity-50"
          >
            Next
          </button>
        </div>

        {/* Sort Button */}
        <div className="mt-4">
          <button 
            onClick={handleSort} 
            className="text-white bg-blue-700 px-10 py-2.5 rounded-lg hover:bg-blue-800"
          >
            Sort {sortOrder === "asc" ? "↑" : "↓"}
          </button>
        </div>
    </>
  );
}
