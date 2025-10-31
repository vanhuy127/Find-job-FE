import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { useStatisticsService } from "@/service/statistics.service";
import { formatSalary } from "@/utils";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "@/constants";

const Dashboard = () => {
  const { getOverview, getCompanies, getJobs, getApplications, getTopProvinces } = useStatisticsService();
  const navigate = useNavigate();

  const { data: overview } = useQuery({
    queryKey: ['admin-stats-overview'],
    queryFn: () =>
      getOverview()
  });

  const { data: company } = useQuery({
    queryKey: ['admin-stats-company'],
    queryFn: () =>
      getCompanies()
  });

  const { data: job } = useQuery({
    queryKey: ['admin-stats-job'],
    queryFn: () =>
      getJobs()
  });

  const { data: application } = useQuery({
    queryKey: ['admin-stats-app'],
    queryFn: () =>
      getApplications()
  });

  const { data: topProvinces } = useQuery({
    queryKey: ['admin-stats-top-provinces'],
    queryFn: () =>
      getTopProvinces()
  });

  if (!overview || !company || !job || !application || !topProvinces) return <p>Loading...</p>;

  const COLORS = ["#4ade80", "#60a5fa", "#facc15", "#f87171"];

  return (
    <div className="space-y-8">
      {/* --- OVERVIEW --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 transition-all duration-200">
        <Card className="hover:scale-105" onClick={() => navigate(ROUTE_PATH.ADMIN.USERS.LIST)}><CardContent className="text-center"><p>Người dùng</p><h2 className="text-3xl font-bold">{overview.usersCount}</h2></CardContent></Card>
        <Card className="hover:scale-105" onClick={() => navigate(ROUTE_PATH.ADMIN.COMPANIES.LIST)}><CardContent className="text-center"><p>Công ty</p><h2 className="text-3xl font-bold">{overview.companiesCount}</h2></CardContent></Card>
        <Card className="hover:scale-105" onClick={() => navigate(ROUTE_PATH.ADMIN.JOBS.LIST)}><CardContent className="text-center"><p>Việc làm</p><h2 className="text-3xl font-bold">{overview.jobsCount}</h2></CardContent></Card>
      </div>

      {/* --- COMPANY STATS --- */}
      <Card>
        <CardHeader><CardTitle>Thống kê công ty</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mb-4">
            <div><p>Tổng</p><h2 className="text-2xl font-bold">{company.total}</h2></div>
            <div><p>Đang chờ</p><h2 className="text-2xl font-bold">{company.pending}</h2></div>
            <div><p>Đã duyệt</p><h2 className="text-2xl font-bold">{company.approved}</h2></div>
            <div><p>Bị từ chối</p><h2 className="text-2xl font-bold">{company.rejected}</h2></div>
          </div>
        </CardContent>
        <CardHeader>
          <CardTitle>Top các công ty có nhiều việc làm</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={company.topCompaniesByJobs}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="jobsCount" fill="#60a5fa" />
            </BarChart>
          </ResponsiveContainer>

        </CardContent>
      </Card>
      <div className="flex flex-col gap-5 md:flex-row ">
        {/* --- JOB STATS --- */}
        <Card className="flex-1">
          <CardHeader><CardTitle>Thống kê công việc</CardTitle></CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-6 justify-between">
              <div>
                <p>Tổng: <b>{job.total}</b></p>
                <p>Đang hoạt động: <b>{job.activeJobs}</b></p>
                <p>Mức lương TB: <b>{formatSalary(job.averageSalary)}</b></p>
              </div>
              <div className="w-full md:w-1/2 h-64">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={Object.entries(job.byType).map(([key, value]) => ({ name: key, value }))}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={80}
                    >
                      {Object.keys(job.byType).map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* --- APPLICATION STATS --- */}
        <Card className="flex-1">
          <CardHeader><CardTitle>Thống kê đơn ứng tuyển</CardTitle></CardHeader>
          <CardContent className="flex justify-center">
            <ResponsiveContainer width="50%" height={250}>
              <PieChart>
                <Pie
                  data={[
                    { name: "Đã duyệt", value: application.approved.rate },
                    { name: "Từ chối", value: application.rejected.rate },
                    { name: "Chờ xử lý", value: application.pending.rate },
                  ]}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={80}
                  label
                >
                  {COLORS.map((c, i) => <Cell key={i} fill={c} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* --- PROVINCE STATS --- */}
      <Card>
        <CardHeader><CardTitle>Top tỉnh thành có nhiều việc làm</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topProvinces}>
              <XAxis dataKey="province" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#4ade80" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
