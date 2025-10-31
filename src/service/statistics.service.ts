import { axiosClient } from '@/config/axios';
import { END_POINT } from '@/constants';
import { IResponse } from '@/interface';
import {
  IApplicationStatsForCompany,
  ICompanyOverview,
  ICompanyStats,
  ICompanyTrend,
  IJobStats,
  IJobStatsForCompany,
  IOverviewData,
  IProvinceStats,
} from '@/interface/statistic';

import { IApplicationStats } from './../interface/statistic';

export const useStatisticsService = () => {
  const getOverview = async () => {
    const res: IResponse<IOverviewData> = await axiosClient.get(END_POINT.STATISTICS.OVERVIEW);

    return res.data;
  };

  const getCompanies = async () => {
    const res: IResponse<ICompanyStats> = await axiosClient.get(END_POINT.STATISTICS.COMPANIES);

    return res.data;
  };
  const getJobs = async () => {
    const res: IResponse<IJobStats> = await axiosClient.get(END_POINT.STATISTICS.JOBS);

    return res.data;
  };

  const getApplications = async () => {
    const res: IResponse<IApplicationStats> = await axiosClient.get(END_POINT.STATISTICS.APPLICATIONS);

    return res.data;
  };

  const getTopProvinces = async () => {
    const res: IResponse<IProvinceStats[]> = await axiosClient.get(END_POINT.STATISTICS.TOP_PROVINCES);

    return res.data;
  };

  const getOverviewCompany = async () => {
    const res: IResponse<ICompanyOverview> = await axiosClient.get(END_POINT.STATISTICS.OVERVIEW_COMPANY);

    return res.data;
  };

  const getJobsForCompany = async () => {
    const res: IResponse<IJobStatsForCompany> = await axiosClient.get(END_POINT.STATISTICS.JOBS_COMPANY);

    return res.data;
  };

  const getApplicationsForCompany = async () => {
    const res: IResponse<IApplicationStatsForCompany> = await axiosClient.get(
      END_POINT.STATISTICS.APPLICATIONS_COMPANY,
    );

    return res.data;
  };

  const getTrendsForCompany = async (year: number) => {
    const res: IResponse<ICompanyTrend[]> = await axiosClient.get(END_POINT.STATISTICS.COMPANY_TRENDS, {
      params: { year },
    });

    return res.data;
  };

  return {
    getOverview,
    getCompanies,
    getJobs,
    getApplications,
    getTopProvinces,
    getOverviewCompany,
    getJobsForCompany,
    getApplicationsForCompany,
    getTrendsForCompany,
  };
};
