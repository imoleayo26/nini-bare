import type { Money } from "./types";

export function formatMoney(money: Money): string {
  const amount = money.amount / 100;

  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: money.currency,
    maximumFractionDigits: 0,
  }).format(amount);
}
