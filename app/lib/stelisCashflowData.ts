export type StelisAccountType = "bank" | "cash" | "settlement";

export type StelisAccount = {
  id: string;
  name: string;
  type: StelisAccountType;
  balance: number;
};

export type StelisMovementType =
  | "cash_received"
  | "card_sales"
  | "bank_deposit"
  | "supplier_payment"
  | "payroll"
  | "rent"
  | "loan_payment"
  | "taxes"
  | "brand_usage"
  | "emergency_purchase";

export type StelisCashMovement = {
  id: string;
  type: StelisMovementType;
  descriptionEn: string;
  descriptionEs: string;
  accountId: string;
  amount: number;
  date: string;
};

export type StelisObligationPriority = "critical" | "important" | "flexible";

export type StelisObligation = {
  id: string;
  nameEn: string;
  nameEs: string;
  amount: number;
  dueDate: string;
  priority: StelisObligationPriority;
};

export const stelisInitialAccounts: StelisAccount[] = [
  {
    id: "bac",
    name: "BAC",
    type: "bank",
    balance: 27816.08,
  },
  {
    id: "occidente",
    name: "Banco Occidente",
    type: "bank",
    balance: 40281.39,
  },
  {
    id: "atlantida",
    name: "Banco Atlántida",
    type: "bank",
    balance: 0,
  },
  {
    id: "ficohsa",
    name: "Banco Ficohsa",
    type: "bank",
    balance: 0,
  },
  {
    id: "banpais",
    name: "Banpaís",
    type: "bank",
    balance: 0,
  },
  {
    id: "banrural",
    name: "Banrural",
    type: "bank",
    balance: 0,
  },
  {
    id: "cuscatlan",
    name: "Banco Cuscatlán",
    type: "bank",
    balance: 0,
  },
  {
    id: "cash-box",
    name: "Caja Física",
    type: "cash",
    balance: 15000,
  },
  {
    id: "pending-cards",
    name: "Tarjetas Pendientes",
    type: "settlement",
    balance: 14710,
  },
];

export const stelisInitialMovements: StelisCashMovement[] = [
  {
    id: "m-1",
    type: "cash_received",
    descriptionEn: "Cash sales from yesterday",
    descriptionEs: "Ventas en efectivo de ayer",
    accountId: "cash-box",
    amount: 15637,
    date: "2026-06-12",
  },
  {
    id: "m-2",
    type: "card_sales",
    descriptionEn: "BAC and Occidente card sales pending settlement",
    descriptionEs: "Ventas con tarjeta BAC y Occidente pendientes de liquidación",
    accountId: "pending-cards",
    amount: 14710,
    date: "2026-06-12",
  },
  {
    id: "m-3",
    type: "supplier_payment",
    descriptionEn: "BELCA planned payment",
    descriptionEs: "Pago planificado a BELCA",
    accountId: "bac",
    amount: -11233.34,
    date: "2026-06-13",
  },
];

export const stelisInitialObligations: StelisObligation[] = [
  {
    id: "o-1",
    nameEn: "Payroll",
    nameEs: "Planilla",
    amount: 79538.45,
    dueDate: "2026-06-15",
    priority: "critical",
  },
  {
    id: "o-2",
    nameEn: "Rent",
    nameEs: "Renta",
    amount: 61200,
    dueDate: "2026-06-20",
    priority: "critical",
  },
  {
    id: "o-3",
    nameEn: "Loan Payment",
    nameEs: "Pago de Préstamo",
    amount: 73000,
    dueDate: "2026-06-25",
    priority: "critical",
  },
  {
    id: "o-4",
    nameEn: "Brand Usage",
    nameEs: "Uso de Marca",
    amount: 33952.86,
    dueDate: "2026-06-15",
    priority: "important",
  },
  {
    id: "o-5",
    nameEn: "Taxes Reserve",
    nameEs: "Reserva de Impuestos",
    amount: 12200,
    dueDate: "2026-06-30",
    priority: "important",
  },
];

export function stelisFormatMoney(amount: number) {
  const sign = amount < 0 ? "-" : "";

  return `${sign}L ${Math.abs(amount).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function stelisTodayDate() {
  return new Date().toISOString().slice(0, 10);
}

export function stelisIsCashIn(type: StelisMovementType) {
  return (
    type === "cash_received" ||
    type === "card_sales" ||
    type === "bank_deposit"
  );
}

export function stelisNormalizeAmount(
  type: StelisMovementType,
  amount: number,
) {
  return stelisIsCashIn(type) ? Math.abs(amount) : -Math.abs(amount);
}

export function stelisCalculateCashTotals(
  accounts: StelisAccount[],
  obligations: StelisObligation[],
) {
  const availableCash = accounts.reduce((sum, account) => {
    if (account.type === "settlement") return sum;
    return sum + account.balance;
  }, 0);

  const pendingSettlements = accounts.reduce((sum, account) => {
    if (account.type !== "settlement") return sum;
    return sum + account.balance;
  }, 0);

  const criticalCommitments = obligations
    .filter((obligation) => obligation.priority === "critical")
    .reduce((sum, obligation) => sum + obligation.amount, 0);

  const importantCommitments = obligations
    .filter((obligation) => obligation.priority === "important")
    .reduce((sum, obligation) => sum + obligation.amount, 0);

  const trueFreeCash =
    availableCash + pendingSettlements - criticalCommitments;

  return {
    availableCash,
    pendingSettlements,
    criticalCommitments,
    importantCommitments,
    trueFreeCash,
  };
}

export function stelisGetCashRisk(trueFreeCash: number) {
  if (trueFreeCash < 0) return "critical";
  if (trueFreeCash < 25000) return "tight";
  return "healthy";
}