import { queryClient } from "@/shared/config/reactQueryClient";

export function findQueryKeyBySearchTerm(
  searchTerm: string
): (unknown[] | string | number | object)[] | null {
  const allQueries = queryClient.getQueryCache().getAll();

  for (const query of allQueries) {
    const queryKey = query.queryKey;

    const keyString = JSON.stringify(queryKey).toLowerCase();
    const searchLower = searchTerm.toLowerCase();

    if (keyString.includes(searchLower)) {
      return queryKey as (unknown[] | string | number | object)[];
    }
  }

  return null;
}

export async function invalidateQueryBySearchTerm(searchTerm: string): Promise<void> {
  const queryKey = findQueryKeyBySearchTerm(searchTerm);

  if (queryKey) {
    await queryClient.invalidateQueries({ queryKey });
  }
}
