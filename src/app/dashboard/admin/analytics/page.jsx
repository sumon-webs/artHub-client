
import AdminAnalyticsPage from "@/components/dahsboard/admin/AnayliticsPage";
import { getDashboardStats } from "@/lib/api/stats";

const page = async () => {
  const statsRes = await getDashboardStats();
  const stats = statsRes?.data?.data || {};
  return <div>
    <AdminAnalyticsPage stats={stats}/>
    </div>;
};

export default page;
