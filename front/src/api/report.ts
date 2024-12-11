import { apiInstance } from '@/api/axios.ts';

export interface ReportParams {
  reason: string;
  targetPostId: string;
}

export interface ReportResponse {
  isReported: boolean;
}

async function createReport({ reason, targetPostId }: ReportParams) {
  const { data } = await apiInstance.post<ReportResponse>('/report', {
    reason,
    targetPostId,
  });
  return data;
}

export { createReport };
