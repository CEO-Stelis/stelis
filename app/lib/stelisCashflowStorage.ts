import {
  stelisInitialAccounts,
  stelisInitialMovements,
  type StelisAccount,
  type StelisCashMovement,
} from "./stelisCashflowData";

const STELIS_ACCOUNTS_KEY = "stelis_cashflow_accounts";
const STELIS_MOVEMENTS_KEY = "stelis_cashflow_movements";

function canUseBrowserStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function safeParse<T>(value: string | null, fallback: T): T {
  if (!value) return fallback;

  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export function stelisLoadAccounts() {
  if (!canUseBrowserStorage()) {
    return stelisInitialAccounts;
  }

  return safeParse<StelisAccount[]>(
    window.localStorage.getItem(STELIS_ACCOUNTS_KEY),
    stelisInitialAccounts,
  );
}

export function stelisSaveAccounts(accounts: StelisAccount[]) {
  if (!canUseBrowserStorage()) return;

  window.localStorage.setItem(STELIS_ACCOUNTS_KEY, JSON.stringify(accounts));
}

export function stelisLoadMovements() {
  if (!canUseBrowserStorage()) {
    return stelisInitialMovements;
  }

  return safeParse<StelisCashMovement[]>(
    window.localStorage.getItem(STELIS_MOVEMENTS_KEY),
    stelisInitialMovements,
  );
}

export function stelisSaveMovements(movements: StelisCashMovement[]) {
  if (!canUseBrowserStorage()) return;

  window.localStorage.setItem(STELIS_MOVEMENTS_KEY, JSON.stringify(movements));
}

export function stelisResetCashflowStorage() {
  if (!canUseBrowserStorage()) return;

  window.localStorage.removeItem(STELIS_ACCOUNTS_KEY);
  window.localStorage.removeItem(STELIS_MOVEMENTS_KEY);
}