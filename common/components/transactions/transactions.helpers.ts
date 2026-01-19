export function isSale(tx: TTransactionResponse): tx is TSaleResponse {
  return "price" in tx && "buyer" in tx && "seller" in tx;
}

export function isRent(tx: TTransactionResponse): tx is TRentResponse {
  return "rentPrice" in tx && "startDate" in tx && "endDate" in tx;
}

export function getCounterpartyName(
  transaction: TTransactionResponse,
  tab: ESalesTab | ERentsTab,
): string | undefined {
  if (isSale(transaction)) {
    return tab === ESalesTab.BOUGHT
      ? transaction.seller?.email
      : transaction.buyer?.email;
  } else {
    return tab === ERentsTab.BORROWS
      ? transaction.owner?.email
      : transaction.renter?.email;
  }
}

export function getTransactionAmount(
  transaction: TTransactionResponse,
): number {
  if (isSale(transaction)) {
    return transaction.price;
  }
  return transaction.rentPrice;
}

export function getCounterpartyIcon(): string {
  return "ph:user";
}
