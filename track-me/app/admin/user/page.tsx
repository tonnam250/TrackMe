"use client";

import { useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
}

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "John Doe", email: "john.doe@example.com", phone: "123-456-7890", role: "Admin" },
    { id: 2, name: "Tony Stark", email: "tony.stark@example.com", phone: "123-456-7890", role: "User" },
    { id: 3, name: "Mark Johnson", email: "mark.johnson@example.com", phone: "123-456-7890", role: "User" },
    { id: 4, name: "Jack Spalow", email: "jack.spalow@example.com", phone: "123-456-7890", role: "User" },
  ]);

  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-5xl font-extrabold text-blue-900">User Management</h1>
        <button className="bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-800">
          Add User
        </button>
      </div>

      <div className="bg-white rounded-xl shadow border border-gray-200 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-blue-100">
            <tr>
              <th className="p-4 border-b border-gray-300">Name</th>
              <th className="p-4 border-b border-gray-300">Email</th>
              <th className="p-4 border-b border-gray-300">Phone</th>
              <th className="p-4 border-b border-gray-300">Role</th>
              <th className="p-4 border-b border-gray-300 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="p-4">{u.name}</td>
                <td className="p-4">{u.email}</td>
                <td className="p-4">{u.phone}</td>
                <td className="p-4">{u.role}</td>
                <td className="p-4 text-center">
                  <button className="bg-blue-700 text-white px-4 py-1 rounded-lg hover:bg-blue-800">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
