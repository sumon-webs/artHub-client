"use client";

import { deleteComment, updateComment } from "@/lib/actions/comment";
import { Table, Button, TextArea } from "@heroui/react";
import { Edit, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { Rocket } from "@gravity-ui/icons";
import { Modal } from "@heroui/react";
import { useState } from "react";

export default function UsersCommentsTable({ comments = [], userId }) {
  const [text, setText] = useState("");
  const [comment, setComment] = useState("");

  const handleDeleteComment = async (id) => {
    const res = await deleteComment(id);
    if (res.success) {
      toast.success("Deleted comment successfull");
    }
  };

  const handleEditComment = async (id) => {
    console.log(id, text, userId);
    const res = await updateComment({ id, text, userId });
    if (res.success) {
      toast.success("Comment edit successfull");
    }
    console.log(res);
  };
  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content
          aria-label="User Comments Table"
          className="min-w-[700px]"
        >
          <Table.Header>
            <Table.Column isRowHeader>User</Table.Column>
            <Table.Column>Comment</Table.Column>
            <Table.Column>Date</Table.Column>
            <Table.Column>Actions</Table.Column>
          </Table.Header>

          <Table.Body>
            {comments.map((c) => (
              <Table.Row key={c._id}>
                {/* User */}
                <Table.Cell className="flex items-center gap-2">
                  {c.userImage ? (
                    <img
                      src={c.userImage}
                      alt={c.userName}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs">
                      {c.userName?.charAt(0)}
                    </div>
                  )}
                  <span>{c.userName}</span>
                </Table.Cell>

                {/* Comment */}
                <Table.Cell className="max-w-[300px] truncate">
                  {c.text}
                </Table.Cell>

                {/* Date */}
                <Table.Cell>
                  {new Date(c.createdAt).toLocaleDateString()}
                </Table.Cell>

                {/* Actions */}
                <Table.Cell>
                  <div className="flex gap-2">
                    <Modal>
                      <Button
                        isIconOnly
                        size="sm"
                        variant="flat"
                        color="primary"
                      >
                        <Edit size={16} />
                      </Button>
                      <Modal.Backdrop>
                        <Modal.Container>
                          <Modal.Dialog className="">
                            <Modal.CloseTrigger />
                            <Modal.Header>
                              <Modal.Icon className="bg-default text-foreground">
                                <Edit size={16} />
                              </Modal.Icon>
                              <Modal.Heading>
                                Edit Your comment here
                              </Modal.Heading>
                            </Modal.Header>
                            <Modal.Body>
                              <TextArea
                                aria-label="Quick project update"
                                className="h-32 w-96"
                                defaultValue={c.text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Update your comment..."
                              />
                            </Modal.Body>
                            <Modal.Footer>
                              <Button
                                onClick={() => handleEditComment(c?._id)}
                                className="w-full"
                                slot="close"
                              >
                                Continue
                              </Button>
                            </Modal.Footer>
                          </Modal.Dialog>
                        </Modal.Container>
                      </Modal.Backdrop>
                    </Modal>

                    <Button
                      onClick={() => handleDeleteComment(c?._id)}
                      isIconOnly
                      size="sm"
                      variant="flat"
                      color="danger"
                    >
                      <Trash2 size={16} />
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
