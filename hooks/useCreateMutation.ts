import {
  QueryKey,
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";

type UseCreateMutationConfig<TData, TVariables> = {
  invalidate?: QueryKey[];
} & UseMutationOptions<TData, unknown, TVariables>;

export function useCreateMutation<TData, TVariables>(
  mutationFn: (input: TVariables) => Promise<TData>,
  config?: UseCreateMutationConfig<TData, TVariables>
) {
  const queryClient = useQueryClient();

  return useMutation<TData, unknown, TVariables>({
    mutationFn,
    onSuccess: async (data, variables, context) => {
      if (config?.invalidate) {
        for (const key of config.invalidate) {
          await queryClient.invalidateQueries({ queryKey: key });
        }
      }
      config?.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      config?.onError?.(error, variables, context);
    },
    ...config,
  });
}
