"use client";

import React from "react";
import { Table, Button } from "@heroui/react";
import { Trash2, Calendar, User, DollarSign } from "lucide-react";

export default function SalesHistoryTable({ data = [] }) {
  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-default-200 bg-content1">
      <Table aria-label="Sales History Table">
        <Table.Header>
          <Table.Column>Artwork</Table.Column>
          <Table.Column>Buyer</Table.Column>
          <Table.Column>Purchase Date</Table.Column>
          <Table.Column>Amount</Table.Column>
        </Table.Header>

        <Table.Body>
          {data.map((item) => (
            <Table.Row key={item._id}>
              
              {/* Artwork Title */}
              <Table.Cell>
                <div className="font-medium text-foreground">
                  {item?.artWorkName}
                </div>
                <div className="text-xs text-default-500">
                  {item?.category}
                </div>
              </Table.Cell>

              {/* Buyer */}
              <Table.Cell>
                <div className="flex items-center gap-2">
                  <User size={14} />
                  <span>{item?.buyerId}</span>
                </div>
              </Table.Cell>

              {/* Date */}
              <Table.Cell>
                <div className="flex items-center gap-2 text-default-600">
                  <Calendar size={14} />
                  <span>
                    {new Date(item?.purchasedAt).toLocaleDateString()}
                  </span>
                </div>
              </Table.Cell>

              {/* Amount */}
              <Table.Cell>
                <div className="flex items-center gap-2 font-semibold text-success">
                  <DollarSign size={14} />
                  <span>${item?.price}</span>
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}