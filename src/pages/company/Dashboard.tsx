import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMemo, useState } from "react";
import { useStatisticsService } from "@/service/statistics.service";
import { formatSalary } from "@/utils";

const COLORS = ["#60a5fa", "#4ade80", "#facc15", "#f87171"];

const CompanyDashboard = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const {
    getOverviewCompany,
    getJobsForCompany,
    getApplicationsForCompany,
    getTrendsForCompany,
  } = useStatisticsService();

  const { data: overview } = useQuery({
    queryKey: ["company-overview"],
    queryFn: getOverviewCompany,
  });

  const { data: jobStats } = useQuery({
    queryKey: ["company-job-stats"],
    queryFn: getJobsForCompany,
  });

  const { data: appStats } = useQuery({
    queryKey: ["company-application-stats"],
    queryFn: getApplicationsForCompany,
  });

  const { data: trend } = useQuery({
    queryKey: ["company-trend", year],
    queryFn: () => getTrendsForCompany(year),
  });

  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();

    return Array.from({ length: 11 }, (_, i) => currentYear - i);
  }, []);

  if (!overview || !jobStats || !appStats || !trend)
    return <p>Loading...</p>;

  return (
    <div className="space-y-8">
      {/* --- OVERVIEW --- */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="text-center p-4">
            <p>Tổng việc làm</p>
            <h2 className="text-3xl font-bold">{overview.totalJobs}</h2>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="text-center p-4">
            <p>Đang hoạt động</p>
            <h2 className="text-3xl font-bold">{overview.activeJobs}</h2>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="text-center p-4">
            <p>Tổng đơn ứng tuyển</p>
            <h2 className="text-3xl font-bold">{overview.totalApplications}</h2>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="text-center p-4">
            <p>Tỷ lệ chấp nhận (%)</p>
            <h2 className="text-3xl font-bold">{overview.acceptedRate}%</h2>
          </CardContent>
        </Card>
      </div>

      {/* --- JOB STATS --- */}
      <Card>
        <CardHeader>
          <CardTitle>Thống kê việc làm</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <p>
              Mức lương trung bình:{" "}
              <b>{formatSalary(jobStats.averageSalary)}</b>
            </p>
            <div className="mt-4">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart
                  data={Object.entries(jobStats.byLevel).map(([k, v]) => ({
                    level: k,
                    count: v,
                  }))}
                >
                  <XAxis dataKey="level" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#60a5fa" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="flex-1">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={Object.entries(jobStats.byType).map(([k, v]) => ({
                    name: k,
                    value: v,
                  }))}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={90}
                  label
                >
                  {COLORS.map((c, i) => (
                    <Cell key={i} fill={c} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* --- APPLICATION STATS --- */}
      <Card>
        <CardHeader>
          <CardTitle>Thống kê đơn ứng tuyển</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <ResponsiveContainer width="50%" height={250}>
            <PieChart>
              <Pie
                data={[
                  { name: "Đã duyệt", value: appStats.approved.rate },
                  { name: "Từ chối", value: appStats.rejected.rate },
                  { name: "Chờ xử lý", value: appStats.pending.rate },
                ]}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                label
              >
                {COLORS.map((c, i) => (
                  <Cell key={i} fill={c} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* --- TREND --- */}
      <Card>
        <CardHeader className="flex flex-col md:flex-row justify-between">
          <CardTitle>Biểu đồ đơn ứng tuyển theo tháng</CardTitle>
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="border rounded px-2 py-1"
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trend}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#4ade80" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyDashboard;
