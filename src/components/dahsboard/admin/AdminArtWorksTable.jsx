"use client";

import { Table } from "@heroui/react";
import DeleteModal from "./DeleteModal";

export default function AdminArtworksTable({ artworks = [] }) {
  
  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content aria-label="Artworks Table" className="min-w-[600px]">
          <Table.Header>
            <Table.Column isRowHeader>Title</Table.Column>
            <Table.Column>Artist Name</Table.Column>
            <Table.Column>Price</Table.Column>
            <Table.Column>Actions</Table.Column>
          </Table.Header>

          <Table.Body>
            {artworks.map((artwork) => (
              <Table.Row key={artwork._id}>
                <Table.Cell>{artwork.title}</Table.Cell>
                <Table.Cell>{artwork.artistName}</Table.Cell>
                <Table.Cell>${artwork.price}</Table.Cell>
                <Table.Cell>
                  
                  <DeleteModal artwork={artwork}/>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}
