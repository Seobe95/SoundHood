import { useMutation } from '@tanstack/react-query';
import { UseMutationCustomOptions } from '@/types';
import { createReport } from '@/api';

function useCreateReport(mutateOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: createReport,
    ...mutateOptions,
  });
}

export { useCreateReport };
