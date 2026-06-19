"use client";

import React from "react";
import { Table } from "@heroui/react";

import { User, Calendar, DollarSign } from "lucide-react";

export default function BuyerSalesHistory({ data = [] }) {
  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-default-200 bg-content1">
      <Table>
        <Table.ScrollContainer>
          <Table.Content
            aria-label="Sales History Table"
            className="min-w-[600px]"
          >
            <Table.Header>
              <Table.Column isRowHeader>Artwork</Table.Column>
              <Table.Column>Artist</Table.Column>
              <Table.Column>Purchase Date</Table.Column>
              <Table.Column>Amount</Table.Column>
            </Table.Header>

            <Table.Body>
              {data.map((item) => (
                <Table.Row key={item._id}>
                  {/* Artwork */}
                  <Table.Cell>
                    <div className="font-medium">{item.artWorkName}</div>
                    <div className="text-xs text-default-500">
                      {item.category}
                    </div>
                  </Table.Cell>

                  {/* Buyer */}
                  <Table.Cell>
                    <div className="flex items-center gap-2">
                      <User size={14} />
                      <span>{item.artistName}</span>
                    </div>
                  </Table.Cell>

                  {/* Date */}
                  <Table.Cell>
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      <span>
                        {new Date(item.purchasedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </Table.Cell>

                  {/* Amount */}
                  <Table.Cell>
                    <div className="flex items-center gap-2 font-semibold text-success">
                      <DollarSign size={14} />
                      <span>${item.price}</span>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
}