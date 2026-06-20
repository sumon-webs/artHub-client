"use client";

import { Table, Button } from "@heroui/react";
import { useState } from "react";

export function UsersTable({ users = [] }) {
  const [data, setData] = useState(users);

  const handleRoleChange = (id, role) => {
    const updated = data.map((user) =>
      user._id === id ? { ...user, role } : user,
    );

    setData(updated);

    // 👉 এখানে API call দিবে পরে
    // await updateUserRole(id, role);
  };

  if (!data.length) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-400 py-10">
        No users found
      </p>
    );
  }

  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content aria-label="Users Table" className="min-w-[700px]">
          <Table.Header>
            <Table.Column isRowHeader>Name</Table.Column>
            <Table.Column>Email</Table.Column>
            <Table.Column>Role</Table.Column>
            <Table.Column>Actions</Table.Column>
          </Table.Header>

          <Table.Body>
            {data.map((user) => (
              <Table.Row key={user._id}>
                <Table.Cell className="text-gray-800 dark:text-gray-100">
                  {user.name}
                </Table.Cell>

                <Table.Cell className="text-gray-600 dark:text-gray-300">
                  {user.email}
                </Table.Cell>

                <Table.Cell className="capitalize text-gray-700 dark:text-gray-200">
                  {user.role}
                </Table.Cell>

                <Table.Cell>
                  <div className="flex gap-2 flex-wrap">
                    <Button
                      size="sm"
                      color="primary"
                      isDisabled={user.role === "user"}
                      onPress={() => handleRoleChange(user._id, "user")}
                    >
                      User
                    </Button>

                    <Button
                      size="sm"
                      color="secondary"
                      isDisabled={user.role === "artist"}
                      onPress={() => handleRoleChange(user._id, "artist")}
                    >
                      Artist
                    </Button>

                    <Button
                      size="sm"
                      color="success"
                      isDisabled={user.role === "admin"}
                      onPress={() => handleRoleChange(user._id, "admin")}
                    >
                      Admin
                    </Button>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}
