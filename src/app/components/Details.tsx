"use client";
import React, { useEffect, useState } from "react";
import VantaBackground from "./VantaBackground";
import Sidebar from "./Sidebar";

// Define the user type
type User = {
  id: number;
  name: string;
  email: string;
};

export default function Details() {
  const [users, setUsers] = useState<User[]>([]); // Use the defined User type
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(5);


  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data: User[]) => setUsers(data)) // Ensure TypeScript knows the response type
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
    <div className="container mx-auto p-4" id="vanta">
    <VantaBackground />
    <Sidebar/>
    <div className="flex justify-center items-center">
      <h1 className="text-2xl font-bold mb-4 text-gray-200">Details Dashboard</h1>
      </div>
      <div className="flex gap-2 justify-center items-center">
      <input
        type="text"
        placeholder="Search Users"
        className="p-2 mb-4 bg-gray-300 rounded-2xl"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      </div>
      <div className="rounded-3xl">
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Email
                </th>
            </tr>
        </thead>
        <tbody>
        {paginatedUsers.map((user) => (
            <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {user.name}
                </th>
                <td className="px-6 py-4">
                {user.email}
                </td>
            </tr>
            ))}
        </tbody>
    </table>
</div>
      </div>
      <div className="mt-4 flex justify-center items-center gap-1">
        <button disabled={page === 1}
          onClick={() => setPage(page - 1)}
          type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Prev
            </button>
        <button disabled={page * itemsPerPage >= filteredUsers.length}
          onClick={() => setPage(page + 1)}
          type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Next
            </button>
      </div>
      <div className="flex items-center justify-center mt-4">
      <button onClick={handleSort} className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Sort {sortOrder === "asc" ? "↑" : "↓"}
      </button>
      </div>
    </div>
  );
}
