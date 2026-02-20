import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Segment } from '../backend';

export function useRegisterUser() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (username: string) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.registerUser(username);
    },
    onSuccess: () => {
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['snakeSegments'] });
      queryClient.invalidateQueries({ queryKey: ['userCount'] });
    },
  });
}

export function useGetSnakeSegments() {
  const { actor, isFetching } = useActor();

  return useQuery<Segment[]>({
    queryKey: ['snakeSegments'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getSnakeSegments();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 3000, // Poll every 3 seconds
  });
}

export function useGetUserCount() {
  const { actor, isFetching } = useActor();

  return useQuery<bigint>({
    queryKey: ['userCount'],
    queryFn: async () => {
      if (!actor) return BigInt(0);
      return actor.getNumberOfUsers();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 3000, // Poll every 3 seconds
  });
}
