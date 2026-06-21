"use client";

import { updateUserRole } from "@/lib/actions/user";
import { Table, Button } from "@heroui/react";
import { useState } from "react";
import toast from "react-hot-toast";

export function UsersTable({ users = [] }) {
  const [data, setData] = useState(users);

  const handleRoleChange = async (id, role) => {
    const previousData = [...data];

    const updated = data.map((user) =>
      user._id === id ? { ...user, role } : user,
    );

    setData(updated);

    try {
      const res = await updateUserRole(id, role);

      if (res?.success) {
        toast.success("Role updated successfully");
      } else {
        setData(previousData);
        toast.error(res?.message || "Failed to update role");
      }
    } catch (error) {
      setData(previousData);
      toast.error("Something went wrong");
    }
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
            <Table.Column>Name</Table.Column>
            <Table.Column>Email</Table.Column>
            <Table.Column>Role</Table.Column>
            <Table.Column>Actions</Table.Column>
          </Table.Header>

          <Table.Body>
            {data.map((user) => (
              <Table.Row key={user._id}>
                <Table.Cell>{user.name}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell className="capitalize">{user.role}</Table.Cell>

                <Table.Cell>
                  <div className="flex gap-2 flex-wrap">
                    <Button
                      size="sm"
                      color="primary"
                      isDisabled={user.role === "buyer"}
                      onPress={() => handleRoleChange(user._id, "buyer")}
                    >
                      Buyer
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
