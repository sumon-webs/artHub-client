"use client";

import React from "react";
import { Button, Modal, Table } from "@heroui/react";
import { Pencil, Rocket, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { deleteArtwork } from "@/lib/actions/artworks";
import { useRouter } from "next/navigation";

export default function ArtworksTable({ data = [] }) {
  const router = useRouter();

  const handleDelete = async (id) => {
    const res = await deleteArtwork(id);
    console.log(res);
    if (res.data.success && res.data.deletedCount > 0) {
      router.refresh();
    }
  };
  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content aria-label="Artworks Table" className="min-w-[900px]">
          <Table.Header>
            <Table.Column isRowHeader>Title</Table.Column>
            <Table.Column>Category</Table.Column>
            <Table.Column>Price</Table.Column>
            <Table.Column>Image</Table.Column>
            <Table.Column>Created At</Table.Column>
            <Table.Column>Actions</Table.Column>
          </Table.Header>

          <Table.Body>
            {data.map((item) => (
              <Table.Row key={item._id}>
                {/* Title */}
                <Table.Cell>{item.title}</Table.Cell>

                {/* Category */}
                <Table.Cell className="capitalize">{item.category}</Table.Cell>

                {/* Price */}
                <Table.Cell>${item.price}</Table.Cell>

                {/* Image */}
                <Table.Cell>
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    width={48}
                    height={48}
                    className="rounded object-cover"
                  />
                </Table.Cell>

                {/* Created At */}
                <Table.Cell>
                  {new Date(item.createdAt).toLocaleDateString()}
                </Table.Cell>

                {/* Actions */}
                <Table.Cell>
                  <div className="flex gap-3">
                    <Link
                      href={`/dashboard/artist/manage-artworks/${item?._id}`}
                    >
                      <Button variant=" default">
                        <Pencil size={18} />
                      </Button>
                    </Link>

                    <Modal>
                      <Button variant="danger">
                        <Trash2 />
                      </Button>
                      <Modal.Backdrop>
                        <Modal.Container>
                          <Modal.Dialog className="sm:max-w-[360px]">
                            <Modal.CloseTrigger />
                            <Modal.Header>
                              <Modal.Icon className="bg-default text-foreground">
                                <Rocket className="size-5" />
                              </Modal.Icon>
                              <Modal.Heading>Delete permanent</Modal.Heading>
                            </Modal.Header>
                            <Modal.Footer>
                              <Button
                                onClick={() => handleDelete(item._id)}
                                className="w-full"
                                variant="danger"
                                slot="close"
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
      </Table.ScrollContainer>
    </Table>
  );
}
