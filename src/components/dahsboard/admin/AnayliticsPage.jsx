"use client";

import CategoryPieChart from "@/components/dahsboard/admin/charts/CategoryPieChart";
import SalesLineChart from "@/components/dahsboard/admin/charts/SalesLineChart";
import { Card } from "@heroui/react";

const AdminAnalyticsPage = async ({ stats }) => {
  const { totalUsers, totalArtists, totalArtworksSold, totalRevenue } = stats;

  const salesData = [
    { name: "Mon", sales: 120 },
    { name: "Tue", sales: 200 },
    { name: "Wed", sales: 150 },
    { name: "Thu", sales: 300 },
    { name: "Fri", sales: 250 },
    { name: "Sat", sales: 400 },
    { name: "Sun", sales: 350 },
  ];

  const categoryData = [
    { name: "Digital", value: 40 },
    { name: "Oil", value: 25 },
    { name: "Sketch", value: 20 },
    { name: "Watercolor", value: 15 },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <Card.Content>Total Users: {totalUsers || 0}</Card.Content>
        </Card>

        <Card>
          <Card.Content>Total Artists: {totalArtists || 0}</Card.Content>
        </Card>

        <Card>
          <Card.Content>Artworks Sold: {totalArtworksSold || 0}</Card.Content>
        </Card>

        <Card>
          <Card.Content>
            Revenue: ${Number(totalRevenue || 0).toFixed(2)}
          </Card.Content>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <Card.Header>Sales Chart</Card.Header>
          <Card.Content>
            <SalesLineChart data={salesData} />
          </Card.Content>
        </Card>

        <Card>
          <Card.Header>Category Distribution</Card.Header>
          <Card.Content>
            <CategoryPieChart data={categoryData} />
          </Card.Content>
        </Card>
      </div>
    </div>
  );
};

export default AdminAnalyticsPage;
