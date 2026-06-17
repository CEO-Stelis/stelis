"use client";

import { useEffect, useMemo, useState } from "react";
import { stelisText, type StelisLanguage } from "../lib/stelisText";
import {
  stelisBankOptions,
  stelisCalculateCashTotals,
  stelisFormatMoney,
  stelisGetCashRisk,
  stelisInitialAccounts,
  stelisInitialMovements,
  stelisInitialObligations,
  stelisNormalizeAmount,
  stelisTodayDate,
  type StelisAccount,
  type StelisAccountType,
  type StelisCashMovement,
  type StelisMovementType,
  type StelisObligation,
} from "../lib/stelisCashflowData";
import {
  stelisLoadAccounts,
  stelisLoadMovements,
  stelisResetCashflowStorage,
  stelisSaveAccounts,
  stelisSaveMovements,
} from "../lib/stelisCashflowStorage";
import StelisCard from "./StelisCard";

export type StelisCashflowControlProps = {
  language: StelisLanguage;
};

type StelisFormErrors = {
  movementType?: string;
  accountId?: string;
  amount?: string;
  description?: string;
  date?: string;
};

type StelisAccountErrors = {
  name?: string;
  type?: string;
  openingBalance?: string;
  bank?: string;
};

function getPriorityStyle(priority: StelisObligation["priority"]) {
  if (priority === "critical") {
    return "border-[#D62828]/20 bg-[#D62828]/[0.03] text-[#D62828]";
  }

  if (priority === "important") {
    return "border-[#07111F]/10 bg-[#F6F8FB] text-[#07111F]";
  }

  return "border-[#07111F]/10 bg-white text-slate-500";
}

function getPriorityLabel(
  priority: StelisObligation["priority"],
  language: StelisLanguage,
) {
  if (language === "es") {
    if (priority === "critical") return "crítico";
    if (priority === "important") return "importante";
    return "flexible";
  }

  return priority;
}

function getDueLabel(language: StelisLanguage) {
  return language === "es" ? "Vence" : "Due";
}

function getMovementDescription(
  movement: StelisCashMovement,
  language: StelisLanguage,
) {
  return language === "es" ? movement.descriptionEs : movement.descriptionEn;
}

function getRequiredMessage(language: StelisLanguage) {
  return language === "es" ? "Campo requerido" : "Required";
}

function getResetLabel(language: StelisLanguage) {
  return language === "es" ? "Reiniciar Datos Demo" : "Reset Demo Data";
}

export function StelisCashflowControl({
  language,
}: StelisCashflowControlProps) {
  const text = stelisText[language].cashflow;
  const accountText = stelisText[language].accountCreation;

  const [storageReady, setStorageReady] = useState(false);
  const [accounts, setAccounts] =
    useState<StelisAccount[]>(stelisInitialAccounts);
  const [movements, setMovements] = useState<StelisCashMovement[]>(
    stelisInitialMovements,
  );

  const [movementType, setMovementType] =
    useState<StelisMovementType>("cash_received");
  const [accountId, setAccountId] = useState(stelisInitialAccounts[0].id);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(stelisTodayDate());

  const [errors, setErrors] = useState<StelisFormErrors>({});

  // Account creation form state
  const [showAccountForm, setShowAccountForm] = useState(false);
  const [newAccountName, setNewAccountName] = useState("");
  const [newAccountType, setNewAccountType] =
    useState<StelisAccountType>("bank");
  const [newOpeningBalance, setNewOpeningBalance] = useState("");
  const [newBank, setNewBank] = useState<string>("BAC");
  const [newNotes, setNewNotes] = useState("");
  const [accountErrors, setAccountErrors] = useState<StelisAccountErrors>({});

  useEffect(() => {
    setAccounts(stelisLoadAccounts());
    setMovements(stelisLoadMovements());
    setStorageReady(true);
  }, []);

  useEffect(() => {
    if (!storageReady) return;
    stelisSaveAccounts(accounts);
  }, [accounts, storageReady]);

  useEffect(() => {
    if (!storageReady) return;
    stelisSaveMovements(movements);
  }, [movements, storageReady]);

  const totals = useMemo(() => {
    return stelisCalculateCashTotals(accounts, stelisInitialObligations);
  }, [accounts]);

  const cashRisk = stelisGetCashRisk(totals.trueFreeCash);

  const cashRiskLabel =
    cashRisk === "critical"
      ? text.critical
      : cashRisk === "tight"
        ? text.tight
        : text.healthy;

  const cashRiskBadge =
    cashRisk === "critical"
      ? text.cashProtectionRequired
      : cashRisk === "tight"
        ? text.cashMustBeWatched
        : text.cashPositionStable;

  const recommendation =
    cashRisk === "critical"
      ? text.recommendations.critical
      : cashRisk === "tight"
        ? text.recommendations.tight
        : text.recommendations.healthy;

  function validateForm(): StelisFormErrors {
    const newErrors: StelisFormErrors = {};
    const required = getRequiredMessage(language);

    if (!movementType) newErrors.movementType = required;
    if (!accountId) newErrors.accountId = required;

    const parsedAmount = Number(amount);
    if (!amount || Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      newErrors.amount = required;
    }

    if (!description.trim()) newErrors.description = required;
    if (!date) newErrors.date = required;

    return newErrors;
  }

  function handleAddMovement() {
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const parsedAmount = Number(amount);
    const normalizedAmount = stelisNormalizeAmount(movementType, parsedAmount);

    const newMovement: StelisCashMovement = {
      id: `m-${Date.now()}`,
      type: movementType,
      descriptionEn: description.trim(),
      descriptionEs: description.trim(),
      accountId,
      amount: normalizedAmount,
      date,
    };

    setMovements((current) => [newMovement, ...current]);

    setAccounts((current) =>
      current.map((account) =>
        account.id === accountId
          ? { ...account, balance: account.balance + normalizedAmount }
          : account,
      ),
    );

    setAmount("");
    setDescription("");
    setMovementType("cash_received");
    setAccountId(accountId);
    setDate(stelisTodayDate());
  }

  function handleResetDemo() {
    stelisResetCashflowStorage();
    setAccounts(stelisInitialAccounts);
    setMovements(stelisInitialMovements);
    setErrors({});
    setAmount("");
    setDescription("");
    setMovementType("cash_received");
    setAccountId(stelisInitialAccounts[0].id);
    setDate(stelisTodayDate());
  }

  function validateAccountForm(): StelisAccountErrors {
    const newErrors: StelisAccountErrors = {};
    const required = getRequiredMessage(language);

    // Name required + duplicate check (case-insensitive)
    const trimmedName = newAccountName.trim();
    if (!trimmedName) {
      newErrors.name = required;
    } else {
      const exists = accounts.some(
        (account) =>
          account.name.trim().toLowerCase() === trimmedName.toLowerCase(),
      );
      if (exists) {
        newErrors.name = accountText.duplicateName;
      }
    }

    if (!newAccountType) newErrors.type = required;

    const parsedBalance = Number(newOpeningBalance);
    if (
      newOpeningBalance === "" ||
      Number.isNaN(parsedBalance) ||
      parsedBalance < 0
    ) {
      newErrors.openingBalance = required;
    }

    // Bank required only for bank accounts, and must not be "none"
    if (newAccountType === "bank" && (!newBank || newBank === "none")) {
      newErrors.bank = required;
    }

    return newErrors;
  }

  function handleAddAccount() {
    const newErrors = validateAccountForm();

    if (Object.keys(newErrors).length > 0) {
      setAccountErrors(newErrors);
      return;
    }

    setAccountErrors({});

    const parsedBalance = Number(newOpeningBalance);

    const newAccount: StelisAccount = {
      id: `acct-${Date.now()}`,
      name: newAccountName.trim(),
      type: newAccountType,
      balance: parsedBalance,
      bank: newAccountType === "cash" ? "none" : newBank,
      notes: newNotes.trim() || undefined,
    };

    setAccounts((current) => [...current, newAccount]);

    // Select the newly created account in the movement form
    setAccountId(newAccount.id);

    // Clear the account form
    setNewAccountName("");
    setNewAccountType("bank");
    setNewOpeningBalance("");
    setNewBank("BAC");
    setNewNotes("");
    setShowAccountForm(false);
  }

  function getBankLabel(bank: string) {
    if (bank === "none") return accountText.noBank;
    return bank;
  }

  return (
    <StelisCard className="border-[#07111F]/10 shadow-[0_21px_55px_rgba(7,17,31,0.08)]">
      <div className="flex flex-col gap-[34px]">
        <div className="flex flex-wrap items-start justify-between gap-[21px]">
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.28em] text-[#07111F]/65">
              {text.title}
            </p>

            <h2 className="mt-[13px] font-serif text-[44px] font-medium leading-none tracking-[-0.035em] text-[#07111F]">
              {cashRiskLabel}
            </h2>

            <p className="mt-[13px] max-w-[620px] text-[16px] leading-[25px] text-slate-500">
              {text.description}
            </p>
          </div>

          <div className="flex items-center gap-[13px]">
            <button
              type="button"
              onClick={handleResetDemo}
              className="rounded-full border border-[#07111F]/15 px-[16px] py-[9px] text-[13px] font-semibold text-[#07111F]/55 transition duration-150 hover:border-[#D62828]/30 hover:text-[#D62828]"
            >
              {getResetLabel(language)}
            </button>

            <div
              className={`rounded-full px-[16px] py-[9px] text-[13px] font-semibold ring-1 ${
                cashRisk === "critical"
                  ? "bg-[#D62828]/10 text-[#D62828] ring-[#D62828]/20"
                  : cashRisk === "tight"
                    ? "bg-[#07111F]/5 text-[#07111F] ring-[#07111F]/10"
                    : "bg-[#34C759]/10 text-[#1E9E45] ring-[#34C759]/25"
              }`}
            >
              {cashRiskBadge}
            </div>
          </div>
        </div>

        <div className="grid gap-[21px] md:grid-cols-4">
          <CashSummaryBox
            label={text.availableCash}
            value={stelisFormatMoney(totals.availableCash)}
          />

          <CashSummaryBox
            label={text.pendingCards}
            value={stelisFormatMoney(totals.pendingSettlements)}
          />

          <CashSummaryBox
            label={text.criticalCommitments}
            value={stelisFormatMoney(totals.criticalCommitments)}
          />

          <div
            className={`rounded-[16px] border p-[18px] ${
              totals.trueFreeCash < 0
                ? "border-[#D62828]/20 bg-[#D62828]/[0.03]"
                : "border-[#34C759]/20 bg-[#34C759]/[0.04]"
            }`}
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#07111F]/55">
              {text.trueFreeCash}
            </p>

            <p
              className={`mt-[12px] whitespace-nowrap font-sans text-[24px] font-semibold leading-none tracking-[-0.04em] [font-variant-numeric:tabular-nums] ${
                totals.trueFreeCash < 0 ? "text-[#D62828]" : "text-[#1E9E45]"
              }`}
            >
              {stelisFormatMoney(totals.trueFreeCash)}
            </p>
          </div>
        </div>

        <div className="grid gap-[34px] xl:grid-cols-[1fr_1.1fr]">
          <div className="rounded-[18px] border border-[#07111F]/10 bg-[#F6F8FB] p-[21px]">
            <p className="text-[12px] font-bold uppercase tracking-[0.24em] text-[#07111F]/65">
              {text.registerMovement}
            </p>

            <div className="mt-[21px] grid gap-[16px]">

              {/* Movement Type */}
              <label className="grid gap-[8px]">
                <span className="text-[13px] font-semibold text-[#07111F]">
                  {text.movementType}
                </span>

                <select
                  value={movementType}
                  onChange={(event) => {
                    setMovementType(event.target.value as StelisMovementType);
                    setErrors((prev) => ({ ...prev, movementType: undefined }));
                  }}
                  className={`rounded-[13px] border bg-white px-[14px] py-[12px] text-[14px] font-medium outline-none ${
                    errors.movementType
                      ? "border-[#D62828]"
                      : "border-[#07111F]/10"
                  }`}
                >
                  {Object.entries(text.movementTypes).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>

                {errors.movementType && (
                  <span className="text-[12px] font-semibold text-[#D62828]">
                    {errors.movementType}
                  </span>
                )}
              </label>

              {/* Account */}
              <label className="grid gap-[8px]">
                <span className="text-[13px] font-semibold text-[#07111F]">
                  {text.account}
                </span>

                <select
                  value={accountId}
                  onChange={(event) => {
                    setAccountId(event.target.value);
                    setErrors((prev) => ({ ...prev, accountId: undefined }));
                  }}
                  className={`rounded-[13px] border bg-white px-[14px] py-[12px] text-[14px] font-medium outline-none ${
                    errors.accountId
                      ? "border-[#D62828]"
                      : "border-[#07111F]/10"
                  }`}
                >
                  {accounts.map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.name}
                    </option>
                  ))}
                </select>

                {errors.accountId && (
                  <span className="text-[12px] font-semibold text-[#D62828]">
                    {errors.accountId}
                  </span>
                )}
              </label>

              {/* Amount */}
              <label className="grid gap-[8px]">
                <span className="text-[13px] font-semibold text-[#07111F]">
                  {text.amount}
                </span>

                <input
                  value={amount}
                  onChange={(event) => {
                    setAmount(event.target.value);
                    setErrors((prev) => ({ ...prev, amount: undefined }));
                  }}
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder={text.amountPlaceholder}
                  className={`rounded-[13px] border bg-white px-[14px] py-[12px] text-[14px] font-medium outline-none ${
                    errors.amount ? "border-[#D62828]" : "border-[#07111F]/10"
                  }`}
                />

                {errors.amount && (
                  <span className="text-[12px] font-semibold text-[#D62828]">
                    {errors.amount}
                  </span>
                )}
              </label>

              {/* Description */}
              <label className="grid gap-[8px]">
                <span className="text-[13px] font-semibold text-[#07111F]">
                  {text.descriptionLabel}
                </span>

                <input
                  value={description}
                  onChange={(event) => {
                    setDescription(event.target.value);
                    setErrors((prev) => ({ ...prev, description: undefined }));
                  }}
                  placeholder={text.descriptionPlaceholder}
                  className={`rounded-[13px] border bg-white px-[14px] py-[12px] text-[14px] font-medium outline-none ${
                    errors.description
                      ? "border-[#D62828]"
                      : "border-[#07111F]/10"
                  }`}
                />

                {errors.description && (
                  <span className="text-[12px] font-semibold text-[#D62828]">
                    {errors.description}
                  </span>
                )}
              </label>

              {/* Date */}
              <label className="grid gap-[8px]">
                <span className="text-[13px] font-semibold text-[#07111F]">
                  {text.date}
                </span>

                <input
                  value={date}
                  onChange={(event) => {
                    setDate(event.target.value);
                    setErrors((prev) => ({ ...prev, date: undefined }));
                  }}
                  type="date"
                  className={`rounded-[13px] border bg-white px-[14px] py-[12px] text-[14px] font-medium outline-none ${
                    errors.date ? "border-[#D62828]" : "border-[#07111F]/10"
                  }`}
                />

                {errors.date && (
                  <span className="text-[12px] font-semibold text-[#D62828]">
                    {errors.date}
                  </span>
                )}
              </label>

              <button
                type="button"
                onClick={handleAddMovement}
                className="mt-[5px] rounded-full bg-[#07111F] px-[21px] py-[13px] text-[14px] font-semibold text-white transition duration-150 hover:bg-[#0B1F3A]"
              >
                {text.registerMovement}
              </button>
            </div>

            {/* Account Creation Section */}
            <div className="mt-[21px] border-t border-[#07111F]/10 pt-[21px]">
              {!showAccountForm ? (
                <button
                  type="button"
                  onClick={() => setShowAccountForm(true)}
                  className="w-full rounded-full border border-dashed border-[#07111F]/25 px-[21px] py-[12px] text-[13px] font-semibold text-[#07111F]/65 transition duration-150 hover:border-[#07111F]/50 hover:text-[#07111F]"
                >
                  + {accountText.addAccount}
                </button>
              ) : (
                <div className="rounded-[16px] border border-[#07111F]/10 bg-white p-[18px]">
                  <p className="text-[12px] font-bold uppercase tracking-[0.24em] text-[#07111F]/65">
                    {accountText.title}
                  </p>

                  <div className="mt-[16px] grid gap-[16px]">

                    {/* Account Name */}
                    <label className="grid gap-[8px]">
                      <span className="text-[13px] font-semibold text-[#07111F]">
                        {accountText.accountName}
                      </span>

                      <input
                        value={newAccountName}
                        onChange={(event) => {
                          setNewAccountName(event.target.value);
                          setAccountErrors((prev) => ({
                            ...prev,
                            name: undefined,
                          }));
                        }}
                        placeholder={accountText.accountNamePlaceholder}
                        className={`rounded-[13px] border bg-white px-[14px] py-[12px] text-[14px] font-medium outline-none ${
                          accountErrors.name
                            ? "border-[#D62828]"
                            : "border-[#07111F]/10"
                        }`}
                      />

                      {accountErrors.name && (
                        <span className="text-[12px] font-semibold text-[#D62828]">
                          {accountErrors.name}
                        </span>
                      )}
                    </label>

                    {/* Account Type */}
                    <label className="grid gap-[8px]">
                      <span className="text-[13px] font-semibold text-[#07111F]">
                        {accountText.accountType}
                      </span>

                      <select
                        value={newAccountType}
                        onChange={(event) => {
                          setNewAccountType(
                            event.target.value as StelisAccountType,
                          );
                          setAccountErrors((prev) => ({
                            ...prev,
                            type: undefined,
                            bank: undefined,
                          }));
                        }}
                        className={`rounded-[13px] border bg-white px-[14px] py-[12px] text-[14px] font-medium outline-none ${
                          accountErrors.type
                            ? "border-[#D62828]"
                            : "border-[#07111F]/10"
                        }`}
                      >
                        {Object.entries(accountText.accountTypes).map(
                          ([value, label]) => (
                            <option key={value} value={value}>
                              {label}
                            </option>
                          ),
                        )}
                      </select>

                      {accountErrors.type && (
                        <span className="text-[12px] font-semibold text-[#D62828]">
                          {accountErrors.type}
                        </span>
                      )}
                    </label>

                    {/* Opening Balance */}
                    <label className="grid gap-[8px]">
                      <span className="text-[13px] font-semibold text-[#07111F]">
                        {accountText.openingBalance}
                      </span>

                      <input
                        value={newOpeningBalance}
                        onChange={(event) => {
                          setNewOpeningBalance(event.target.value);
                          setAccountErrors((prev) => ({
                            ...prev,
                            openingBalance: undefined,
                          }));
                        }}
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder={accountText.openingBalancePlaceholder}
                        className={`rounded-[13px] border bg-white px-[14px] py-[12px] text-[14px] font-medium outline-none ${
                          accountErrors.openingBalance
                            ? "border-[#D62828]"
                            : "border-[#07111F]/10"
                        }`}
                      />

                      {accountErrors.openingBalance && (
                        <span className="text-[12px] font-semibold text-[#D62828]">
                          {accountErrors.openingBalance}
                        </span>
                      )}
                    </label>

                    {/* Bank (dropdown) - hidden for cash registers */}
                    {newAccountType !== "cash" && (
                      <label className="grid gap-[8px]">
                        <span className="text-[13px] font-semibold text-[#07111F]">
                          {accountText.bankName}
                        </span>

                        <select
                          value={newBank}
                          onChange={(event) => {
                            setNewBank(event.target.value);
                            setAccountErrors((prev) => ({
                              ...prev,
                              bank: undefined,
                            }));
                          }}
                          className={`rounded-[13px] border bg-white px-[14px] py-[12px] text-[14px] font-medium outline-none ${
                            accountErrors.bank
                              ? "border-[#D62828]"
                              : "border-[#07111F]/10"
                          }`}
                        >
                          {stelisBankOptions.map((bank) => (
                            <option key={bank} value={bank}>
                              {getBankLabel(bank)}
                            </option>
                          ))}
                        </select>

                        {accountErrors.bank && (
                          <span className="text-[12px] font-semibold text-[#D62828]">
                            {accountErrors.bank}
                          </span>
                        )}
                      </label>
                    )}

                    {/* Notes (optional) */}
                    <label className="grid gap-[8px]">
                      <span className="text-[13px] font-semibold text-[#07111F]">
                        {accountText.notes}
                      </span>

                      <input
                        value={newNotes}
                        onChange={(event) => setNewNotes(event.target.value)}
                        placeholder={accountText.notesPlaceholder}
                        className="rounded-[13px] border border-[#07111F]/10 bg-white px-[14px] py-[12px] text-[14px] font-medium outline-none"
                      />
                    </label>

                    <div className="mt-[5px] flex items-center gap-[10px]">
                      <button
                        type="button"
                        onClick={handleAddAccount}
                        className="flex-1 rounded-full bg-[#07111F] px-[21px] py-[13px] text-[14px] font-semibold text-white transition duration-150 hover:bg-[#0B1F3A]"
                      >
                        {accountText.addAccount}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setShowAccountForm(false);
                          setAccountErrors({});
                          setNewAccountName("");
                          setNewAccountType("bank");
                          setNewOpeningBalance("");
                          setNewBank("BAC");
                          setNewNotes("");
                        }}
                        className="rounded-full border border-[#07111F]/15 px-[18px] py-[13px] text-[14px] font-semibold text-[#07111F]/55 transition duration-150 hover:text-[#07111F]"
                      >
                        {language === "es" ? "Cancelar" : "Cancel"}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid gap-[21px]">
            <div className="rounded-[18px] border border-[#07111F]/10 bg-white p-[21px]">
              <p className="text-[12px] font-bold uppercase tracking-[0.24em] text-[#07111F]/65">
                {text.recommendation}
              </p>

              <p className="mt-[13px] text-[18px] font-semibold leading-[25px] tracking-[-0.02em] text-[#07111F]">
                {recommendation}
              </p>
            </div>

            <div className="rounded-[18px] border border-[#07111F]/10 bg-white p-[21px]">
              <p className="text-[12px] font-bold uppercase tracking-[0.24em] text-[#07111F]/65">
                {text.upcomingObligations}
              </p>

              <div className="mt-[16px] space-y-[10px]">
                {stelisInitialObligations.map((obligation) => (
                  <div
                    key={obligation.id}
                    className={`flex items-center justify-between gap-[16px] rounded-[14px] border px-[14px] py-[12px] ${getPriorityStyle(
                      obligation.priority,
                    )}`}
                  >
                    <div>
                      <p className="text-[14px] font-semibold text-[#07111F]">
                        {language === "es"
                          ? obligation.nameEs
                          : obligation.nameEn}
                      </p>

                      <p className="mt-[4px] text-[12px] text-slate-500">
                        {getDueLabel(language)} {obligation.dueDate} ·{" "}
                        {getPriorityLabel(obligation.priority, language)}
                      </p>
                    </div>

                    <p className="whitespace-nowrap font-sans text-[15px] font-semibold tracking-[-0.03em] text-[#07111F] [font-variant-numeric:tabular-nums]">
                      {stelisFormatMoney(obligation.amount)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[18px] border border-[#07111F]/10 bg-white p-[21px]">
              <p className="text-[12px] font-bold uppercase tracking-[0.24em] text-[#07111F]/65">
                {text.recentMovements}
              </p>

              <div className="mt-[16px] space-y-[10px]">
                {movements.slice(0, 5).map((movement) => (
                  <div
                    key={movement.id}
                    className="flex items-center justify-between gap-[16px] rounded-[14px] border border-[#07111F]/10 bg-[#F6F8FB] px-[14px] py-[12px]"
                  >
                    <div>
                      <p className="text-[14px] font-semibold text-[#07111F]">
                        {getMovementDescription(movement, language)}
                      </p>

                      <p className="mt-[4px] text-[12px] text-slate-500">
                        {text.movementTypes[movement.type]} · {movement.date}
                      </p>
                    </div>

                    <p
                      className={`whitespace-nowrap font-sans text-[15px] font-semibold tracking-[-0.03em] [font-variant-numeric:tabular-nums] ${
                        movement.amount < 0
                          ? "text-[#D62828]"
                          : "text-[#1E9E45]"
                      }`}
                    >
                      {stelisFormatMoney(movement.amount)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[18px] border border-[#07111F]/10 bg-[#07111F] p-[21px] text-white">
          <p className="text-[12px] font-bold uppercase tracking-[0.24em] text-white/55">
            {text.securityRule}
          </p>

          <p className="mt-[10px] text-[15px] leading-[24px] text-white/80">
            {text.securityMessage}
          </p>
        </div>
      </div>
    </StelisCard>
  );
}

function CashSummaryBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[16px] border border-[#07111F]/10 bg-[#F6F8FB] p-[18px]">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#07111F]/55">
        {label}
      </p>

      <p className="mt-[12px] whitespace-nowrap font-sans text-[24px] font-semibold leading-none tracking-[-0.04em] text-[#07111F] [font-variant-numeric:tabular-nums]">
        {value}
      </p>
    </div>
  );
}

export default StelisCashflowControl;