export interface IOverviewData {
  usersCount: number;
  companiesCount: number;
  jobsCount: number;
  applicationsCount: number;
}

export interface ICompanyStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  topCompaniesByJobs: { id: string; name: string; jobsCount: number }[];
}

export interface IJobStats {
  total: number;
  activeJobs: number;
  byType: Record<string, number>;
  byLevel: Record<string, number>;
  averageSalary: number;
}

export interface IApplicationStats {
  total: number;
  approved: { num: number; rate: number };
  rejected: { num: number; rate: number };
  pending: { num: number; rate: number };
}

export interface IProvinceStats {
  province: string;
  count: number;
}

export interface ICompanyOverview {
  totalJobs: number;
  activeJobs: number;
  totalApplications: number;
  acceptedRate: number;
}

export interface IJobStatsForCompany {
  byType: Record<string, number>;
  byLevel: Record<string, number>;
  averageSalary: number;
}

export interface IApplicationStatsForCompany {
  total: number;
  approved: { num: number; rate: number };
  rejected: { num: number; rate: number };
  pending: { num: number; rate: number };
}

export interface ICompanyTrend {
  month: string;
  count: number;
}
