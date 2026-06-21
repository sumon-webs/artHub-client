"use client";

import React from "react";
import { Button, Modal, Table } from "@heroui/react";
import { Pencil, Rocket, Trash2 } from "lucide-react";
import Link from "next/link";
import { deleteArtwork } from "@/lib/actions/artworks";
import { useRouter } from "next/navigation";

export default function ArtworksTable({ data = [] }) {
  const router = useRouter();

  const handleDelete = async (id) => {
    try {
      const res = await deleteArtwork(id);

      if (res?.data?.success && res?.data?.deletedCount > 0) {
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      <Table className=" mx-auto">
        <Table.Content aria-label="Artworks Table" className="min-w-[900px]">
          <Table.Header>
            <Table.Column isRowHeader>Title</Table.Column>
            <Table.Column>Price</Table.Column>
            <Table.Column>Actions</Table.Column>
          </Table.Header>

          <Table.Body>
            {data.map((item) => (
              <Table.Row key={item._id}>
                <Table.Cell>{item.title}</Table.Cell>

                <Table.Cell>${item.price}</Table.Cell>

                <Table.Cell>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/dashboard/artist/manage-artworks/${item._id}`}
                    >
                      <Button isIconOnly variant="flat">
                        <Pencil size={18} />
                      </Button>
                    </Link>

                    <Modal>
                      <Button isIconOnly variant="danger">
                        <Trash2 size={18} />
                      </Button>

                      <Modal.Backdrop>
                        <Modal.Container>
                          <Modal.Dialog className="sm:max-w-[360px]">
                            <Modal.CloseTrigger />

                            <Modal.Header>
                              <Modal.Icon className="bg-default text-foreground">
                                <Rocket className="size-5" />
                              </Modal.Icon>

                              <Modal.Heading>Delete Artwork?</Modal.Heading>
                            </Modal.Header>

                            <Modal.Body>
                              This action cannot be undone.
                            </Modal.Body>

                            <Modal.Footer>
                              <Button variant="secondary" slot="close">
                                Cancel
                              </Button>

                              <Button
                                variant="danger"
                                slot="close"
                                onClick={() => handleDelete(item._id)}
                              >
                                Delete
                              </Button>
                            </Modal.Footer>
                          </Modal.Dialog>
                        </Modal.Container>
                      </Modal.Backdrop>
                    </Modal>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Content>
      </Table>
    </div>
  );
}
