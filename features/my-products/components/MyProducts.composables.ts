export interface TProductStatItem {
  label: string;
  value: number;
  icon: string;
  color: string;
  bgColor: string;
}

export interface TProductStats {
  total: number;
  available: number;
  rented: number;
  sold: number;
}

interface UseProductStatsReturn {
  stats: ComputedRef<TProductStats>;
  statItems: ComputedRef<TProductStatItem[]>;
}

export function useProductStats(
  products: MaybeRefOrGetter<TProductResponse[]>,
): UseProductStatsReturn {
  const stats = computed<TProductStats>(() => {
    const productList = toValue(products) || [];
    return {
      total: productList.length,
      available: productList.filter((p) => p.status === EProductStatus.AVAILABLE).length,
      rented: productList.filter((p) => p.status === EProductStatus.RENTED).length,
      sold: productList.filter((p) => p.status === EProductStatus.SOLD).length,
    };
  });

  const statItems = computed<TProductStatItem[]>(() => [
    {
      label: "Total",
      value: stats.value.total,
      icon: "ph:package",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      label: "Available",
      value: stats.value.available,
      icon: "ph:check-circle",
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      label: "Rented",
      value: stats.value.rented,
      icon: "ph:clock",
      color: "text-chart-3",
      bgColor: "bg-chart-3/10",
    },
    {
      label: "Sold",
      value: stats.value.sold,
      icon: "ph:currency-dollar",
      color: "text-chart-2",
      bgColor: "bg-chart-2/10",
    },
  ]);

  return {
    stats,
    statItems,
  };
}
