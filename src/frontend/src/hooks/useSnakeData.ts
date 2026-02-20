import { useGetSnakeSegments, useGetUserCount } from './useQueries';

export function useSnakeData() {
  const { data: segments = [], isLoading: segmentsLoading } = useGetSnakeSegments();
  const { data: userCountBigInt = BigInt(0), isLoading: countLoading } = useGetUserCount();

  const userCount = Number(userCountBigInt);
  const isLoading = segmentsLoading || countLoading;

  return {
    segments,
    userCount,
    isLoading,
  };
}
