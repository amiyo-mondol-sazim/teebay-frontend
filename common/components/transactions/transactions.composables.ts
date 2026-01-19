import {
  getCounterpartyIcon,
  getCounterpartyName,
  getTransactionAmount,
  isRent,
  isSale,
} from "./transactions.helpers";

export function useTransactionCard(
  transaction: TTransactionResponse,
  tab: ESalesTab | ERentsTab,
) {
  const counterpartyName = computed(() => getCounterpartyName(transaction, tab));

  const amount = computed(() => getTransactionAmount(transaction));

  const productId = computed(() => transaction.product.id);

  const counterpartyIcon = computed(() => getCounterpartyIcon());

  const sale = computed(() => {
    if (isSale(transaction)) {
      return transaction;
    }
    return null;
  });

  const rent = computed(() => {
    if (isRent(transaction)) {
      return transaction;
    }
    return null;
  });

  const relativeTime = computed(() => {
    const createdAt = sale.value?.createdAt ?? rent.value?.createdAt;
    if (!createdAt) return "";
    return formatDistanceToNow(new Date(createdAt), { addSuffix: true });
  });

  return {
    counterpartyName,
    amount,
    productId,
    counterpartyIcon,
    sale,
    rent,
    relativeTime,
  };
}
