"use client";

import { useState, type ReactNode } from "react";
import StelisCard from "./components/StelisCard";
import StelisCashflowControl from "./components/StelisCashflowControl";
import StelisLanguageToggle from "./components/StelisLanguageToggle";

type Language = "en" | "es";
type Severity = "warning" | "critical";

const availableCash = 180000;
const committedCash = 164171;
const freeCash = availableCash - committedCash;
const cashScore = 94;

const salesYesterday = 30347.25;
const salesLastYear = 26880.0;
const difference = salesYesterday - salesLastYear;
const percentChange = (difference / salesLastYear) * 100;

function formatMoney(amount: number) {
  return `L\u00A0${amount.toLocaleString("en-US")}`;
}

const smallMetricNumberClass =
  "mt-[13px] whitespace-nowrap font-sans text-[22px] font-semibold leading-none tracking-[-0.035em] text-[#07111F] [font-variant-numeric:tabular-nums]";

type SidebarItem = {
  label: string;
  active?: boolean;
  badge?: string;
};

const copy = {
  en: {
    greeting: "Good morning, Marvin.",
    date: "Friday, June 12, 2026",
    lastUpdate: "Last update: 7:15 AM",

    sidebar: {
      subtitle: "Executive Intelligence",
      items: [
        { label: "Morning Brief", active: true, badge: "3" },
        { label: "Cash Control" },
        { label: "Inventory" },
        { label: "Sales" },
        { label: "Operations" },
        { label: "Suppliers" },
        { label: "Reports" },
        { label: "Settings" },
      ] as SidebarItem[],
    },

    cashPosition: {
      label: "Cash Position",
      status: "Healthy",
      description: "No immediate cash risks detected.",
      payroll: "Payroll: Covered",
      suppliers: "Supplier Payments: Covered",
      scoreLabel: "Cash Score",
      availableCash: "Available Cash",
      committedCash: "Committed Cash",
    },

    health: {
      label: "Restaurant Health Index",
      title: "Operating condition",
      scoreLabel: "Overall score",
      trend: "+2.4% versus previous period",
      positiveLabel: "Biggest positive factor",
      negativeLabel: "Biggest negative factor",
      improvementLabel: "Fastest path to improvement",
      positiveTitle: "Cash obligations covered",
      positiveDetail:
        "Payroll and supplier payments remain protected after committed cash is removed.",
      positiveImpact: "+8 points from Cash Health",
      negativeTitle: "Cheese inventory pressure",
      negativeDetail:
        "Projected to fall below target within 2 days, increasing production risk.",
      negativeImpact: "-3 points from Inventory Health",
      improvementTitle: "Approve cheese purchase today",
      improvementDetail:
        "Protects high-demand items before the next service window and reduces stockout risk.",
      improvementImpact: "Expected to recover 3 Inventory Health points.",
    },

    attention: {
      label: "Attention Required",
      subtitle: "3 items need review today",
      items: [
        {
          title: "BELCA payment due Thursday",
          detail: "Payment should be protected to avoid supplier friction.",
          severity: "warning" as const,
        },
        {
          title: "Cheese inventory below target",
          detail: "Projected to fall below safe level within 2 days.",
          severity: "critical" as const,
        },
        {
          title: "Waste increased yesterday",
          detail:
            "Waste rose above target and should be reviewed by operations.",
          severity: "warning" as const,
        },
      ],
    },

    sales: {
      label: "Sales Yesterday",
      helper: "Compared with same day last year",
      lastYear: "Last Year Same Day",
      difference: "Difference",
    },

    intelligence: {
      label: "STELIS Intelligence",
      headline: "Payroll remains covered.",
      detailPrefix: "Current free cash is",
      detailSuffix:
        "after committed obligations. Continue protecting supplier payments and avoid non-essential purchases today.",
    },
  },

  es: {
    greeting: "Buenos días, Marvin.",
    date: "Viernes, 12 de junio de 2026",
    lastUpdate: "Última actualización: 7:15 AM",

    sidebar: {
      subtitle: "Inteligencia Ejecutiva",
      items: [
        { label: "Resumen Matutino", active: true, badge: "3" },
        { label: "Control de Caja" },
        { label: "Inventario" },
        { label: "Ventas" },
        { label: "Operaciones" },
        { label: "Proveedores" },
        { label: "Reportes" },
        { label: "Ajustes" },
      ] as SidebarItem[],
    },

    cashPosition: {
      label: "Posición de Caja",
      status: "Saludable",
      description: "No se detectan riesgos inmediatos de caja.",
      payroll: "Planilla: Cubierta",
      suppliers: "Pagos a proveedores: Cubiertos",
      scoreLabel: "Puntaje de Caja",
      availableCash: "Efectivo Disponible",
      committedCash: "Efectivo Comprometido",
    },

    health: {
      label: "Índice de Salud del Restaurante",
      title: "Condición operativa",
      scoreLabel: "Puntaje general",
      trend: "+2.4% contra el período anterior",
      positiveLabel: "Mayor factor positivo",
      negativeLabel: "Mayor factor negativo",
      improvementLabel: "Camino más rápido para mejorar",
      positiveTitle: "Obligaciones de caja cubiertas",
      positiveDetail:
        "La planilla y los pagos a proveedores siguen protegidos después de separar el efectivo comprometido.",
      positiveImpact: "+8 puntos desde Salud de Caja",
      negativeTitle: "Presión en inventario de queso",
      negativeDetail:
        "Se proyecta que caerá por debajo del objetivo en 2 días, aumentando el riesgo de producción.",
      negativeImpact: "-3 puntos desde Salud de Inventario",
      improvementTitle: "Aprobar compra de queso hoy",
      improvementDetail:
        "Protege los productos de alta demanda antes de la próxima ventana de servicio y reduce el riesgo de quedarse sin inventario.",
      improvementImpact: "Se espera recuperar 3 puntos de Salud de Inventario.",
    },

    attention: {
      label: "Atención Requerida",
      subtitle: "3 puntos necesitan revisión hoy",
      items: [
        {
          title: "Pago a BELCA vence el jueves",
          detail:
            "El pago debe protegerse para evitar fricción con el proveedor.",
          severity: "warning" as const,
        },
        {
          title: "Inventario de queso debajo del objetivo",
          detail:
            "Se proyecta que caerá por debajo del nivel seguro dentro de 2 días.",
          severity: "critical" as const,
        },
        {
          title: "La merma aumentó ayer",
          detail:
            "La merma subió por encima del objetivo y debe ser revisada por operaciones.",
          severity: "warning" as const,
        },
      ],
    },

    sales: {
      label: "Ventas de Ayer",
      helper: "Comparado con el mismo día del año anterior",
      lastYear: "Mismo Día Año Anterior",
      difference: "Diferencia",
    },

    intelligence: {
      label: "Inteligencia STELIS",
      headline: "La planilla sigue cubierta.",
      detailPrefix: "El efectivo libre actual es",
      detailSuffix:
        "después de separar las obligaciones comprometidas. Continúa protegiendo pagos a proveedores y evita compras no esenciales hoy.",
    },
  },
};

export default function Home() {
  const [language, setLanguage] = useState<Language>("es");
  const t = copy[language];

  return (
    <main className="min-h-screen bg-[#F6F8FB] text-[#07111F] lg:flex">
      <StelisSidebar language={language} />

      <section className="min-h-screen w-full flex-1 px-[21px] py-[34px] md:px-[34px]">
        <header className="flex items-start justify-between gap-[21px]">
          <div>
            <p className="font-serif text-[34px] font-medium leading-none tracking-tight text-[#07111F]">
              {t.greeting}
            </p>

            <p className="mt-[8px] text-[13px] font-semibold uppercase tracking-[0.34em] text-[#07111F]/70">
              {t.date}
            </p>
          </div>

          <div className="flex items-center gap-[13px]">
            <StelisLanguageToggle language={language} onChange={setLanguage} />

            <div className="rounded-full bg-[#07111F] px-[21px] py-[8px] text-[13px] font-medium text-white shadow-[0_13px_34px_rgba(7,17,31,0.16)]">
              {t.lastUpdate}
            </div>
          </div>
        </header>

        <div className="mt-[34px]">
          <CashPositionCard language={language} />
        </div>

        <div className="mt-[34px]">
          <StelisCashflowControl language={language} />
        </div>

        <div className="mt-[34px] grid gap-[34px] xl:grid-cols-2">
          <HealthIndexCard language={language} />
          <AttentionRequiredCard language={language} />
        </div>

        <div className="mt-[34px] grid gap-[34px] lg:grid-cols-[1.618fr_1fr]">
          <StelisCard>
            <MetricLabel>{t.sales.label}</MetricLabel>

            <p className="mt-[13px] font-serif text-[42px] font-medium leading-none tracking-tight text-[#07111F]">
              {formatMoney(salesYesterday)}
            </p>

            <div className="mt-[13px] flex items-center gap-[13px]">
              <span className="rounded-full bg-[#E9F8EF] px-[13px] py-[5px] text-[13px] font-bold text-[#1E9E45]">
                +{percentChange.toFixed(1)}%
              </span>

              <p className="text-[15px] leading-[24px] text-slate-500">
                {t.sales.helper}
              </p>
            </div>

            <div className="mt-[34px] grid gap-[21px] md:grid-cols-2">
              <div className="rounded-[13px] border border-[#07111F]/10 bg-[#F6F8FB] p-[21px]">
                <MetricLabel muted>{t.sales.lastYear}</MetricLabel>

                <p className={smallMetricNumberClass}>
                  {formatMoney(salesLastYear)}
                </p>
              </div>

              <div className="rounded-[13px] border border-[#07111F]/10 bg-[#F6F8FB] p-[21px]">
                <MetricLabel muted>{t.sales.difference}</MetricLabel>

                <p className={`${smallMetricNumberClass} text-[#1E9E45]`}>
                  +{formatMoney(difference)}
                </p>
              </div>
            </div>
          </StelisCard>

          <StelisCard>
            <MetricLabel>{t.intelligence.label}</MetricLabel>

            <p className="mt-[21px] max-w-[610px] text-[21px] leading-[34px] text-[#07111F]">
              {t.intelligence.headline}
            </p>

            <p className="mt-[13px] text-[21px] leading-[34px] text-slate-500">
              {t.intelligence.detailPrefix} {formatMoney(freeCash)}{" "}
              {t.intelligence.detailSuffix}
            </p>
          </StelisCard>
        </div>
      </section>
    </main>
  );
}

function StelisSidebar({ language }: { language: Language }) {
  const t = copy[language];

  return (
    <aside className="hidden min-h-screen w-[323px] shrink-0 bg-[#07111F] px-[30px] py-[42px] text-white lg:flex lg:flex-col">
      <div>
        <p className="font-serif text-[42px] font-medium leading-none tracking-[0.18em]">
          STELIS
        </p>

        <p className="mt-[13px] text-[12px] font-bold uppercase tracking-[0.48em] text-white/65">
          {t.sidebar.subtitle}
        </p>
      </div>

      <nav className="mt-[68px] flex flex-col gap-[13px]">
        {t.sidebar.items.map((item) => (
          <div
            key={item.label}
            className={
              item.active
                ? "flex items-center justify-between rounded-[21px] border-l-2 border-[#18B7FF] bg-white/10 px-[21px] py-[17px] text-[16px] font-bold text-white"
                : "flex items-center justify-between rounded-[21px] px-[21px] py-[17px] text-[16px] font-bold text-white/85"
            }
          >
            <div className="flex items-center gap-[13px]">
              <span
                className={
                  item.active
                    ? "h-[9px] w-[9px] rounded-full bg-[#18B7FF]"
                    : "h-[9px] w-[9px] rounded-full bg-white/20"
                }
              />

              <span>{item.label}</span>
            </div>

            {item.badge ? (
              <span className="rounded-full bg-[#D93131]/20 px-[12px] py-[5px] text-[13px] font-bold text-[#FF5A5A]">
                {item.badge}
              </span>
            ) : null}
          </div>
        ))}
      </nav>

      <div className="mt-auto">
        <div className="flex h-[44px] w-[44px] items-center justify-center rounded-full border border-white/15 bg-black text-[21px] font-medium text-white shadow-[0_13px_34px_rgba(0,0,0,0.34)]">
          N
        </div>
      </div>
    </aside>
  );
}

function CashPositionCard({ language }: { language: Language }) {
  const t = copy[language].cashPosition;

  return (
    <div className="rounded-[21px] border border-[#07111F]/10 bg-white p-[34px] shadow-[0_21px_55px_rgba(7,17,31,0.08)]">
      <div className="grid gap-[34px] lg:grid-cols-[1.618fr_1fr]">
        <div>
          <MetricLabel>{t.label}</MetricLabel>

          <p className="mt-[18px] font-serif text-[55px] font-medium leading-none tracking-tight text-[#07111F]">
            {t.status}
          </p>

          <p className="mt-[21px] text-[21px] leading-[34px] text-slate-500">
            {t.description}
          </p>

          <div className="mt-[21px] flex flex-wrap gap-[21px]">
            <CoveredPill>{t.payroll}</CoveredPill>
            <CoveredPill>{t.suppliers}</CoveredPill>
          </div>
        </div>

        <div className="border-[#07111F]/10 lg:border-l lg:pl-[42px]">
          <MetricLabel>{t.scoreLabel}</MetricLabel>

          <p className="mt-[18px] font-sans text-[47px] font-semibold leading-none tracking-[-0.04em] text-[#07111F] [font-variant-numeric:tabular-nums]">
            {cashScore} / 100
          </p>

          <div className="mt-[24px] h-[9px] overflow-hidden rounded-full bg-[#07111F]/10">
            <div
              className="h-full rounded-full bg-[#34C759]"
              style={{ width: `${cashScore}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mt-[34px] border-t border-[#07111F]/10 pt-[34px]">
        <div className="grid gap-[34px] md:grid-cols-2">
          <CashAmount
            letter="A"
            label={t.availableCash}
            value={formatMoney(availableCash)}
          />

          <CashAmount
            letter="C"
            label={t.committedCash}
            value={formatMoney(committedCash)}
          />
        </div>
      </div>
    </div>
  );
}

function HealthIndexCard({ language }: { language: Language }) {
  const t = copy[language].health;

  return (
    <StelisCard>
      <div className="flex items-start justify-between gap-[21px]">
        <div>
          <MetricLabel>{t.label}</MetricLabel>

          <p className="mt-[18px] font-serif text-[42px] font-medium leading-none tracking-tight text-[#07111F]">
            {t.title}
          </p>
        </div>

        <div className="text-right">
          <p className="text-[13px] font-bold uppercase tracking-[0.24em] text-[#07111F]/55">
            {t.scoreLabel}
          </p>

          <p className="mt-[8px] font-sans text-[34px] font-semibold leading-none tracking-[-0.04em] text-[#07111F] [font-variant-numeric:tabular-nums]">
            91 / 100
          </p>
        </div>
      </div>

      <div className="mt-[24px] h-[9px] overflow-hidden rounded-full bg-[#07111F]/10">
        <div className="h-full w-[91%] rounded-full bg-[#34C759]" />
      </div>

      <p className="mt-[13px] text-[15px] font-medium text-[#1E9E45]">
        {t.trend}
      </p>

      <div className="mt-[34px] grid gap-[21px]">
        <InsightBlock
          label={t.positiveLabel}
          title={t.positiveTitle}
          detail={t.positiveDetail}
          impact={t.positiveImpact}
        />

        <InsightBlock
          label={t.negativeLabel}
          title={t.negativeTitle}
          detail={t.negativeDetail}
          impact={t.negativeImpact}
        />

        <InsightBlock
          label={t.improvementLabel}
          title={t.improvementTitle}
          detail={t.improvementDetail}
          impact={t.improvementImpact}
        />
      </div>
    </StelisCard>
  );
}

function AttentionRequiredCard({ language }: { language: Language }) {
  const t = copy[language].attention;

  return (
    <StelisCard>
      <div className="flex items-start justify-between gap-[21px]">
        <div>
          <MetricLabel>{t.label}</MetricLabel>

          <p className="mt-[18px] font-serif text-[42px] font-medium leading-none tracking-tight text-[#07111F]">
            {t.subtitle}
          </p>
        </div>

        <span className="rounded-full bg-[#D93131]/10 px-[13px] py-[6px] text-[13px] font-bold text-[#D93131]">
          3
        </span>
      </div>

      <div className="mt-[34px] grid gap-[13px]">
        {t.items.map((item) => (
          <AttentionItem
            key={item.title}
            title={item.title}
            detail={item.detail}
            severity={item.severity}
          />
        ))}
      </div>
    </StelisCard>
  );
}

function AttentionItem({
  title,
  detail,
  severity,
}: {
  title: string;
  detail: string;
  severity: Severity;
}) {
  const toneClass =
    severity === "critical"
      ? "border-red-200 bg-red-50 text-red-600"
      : "border-amber-200 bg-amber-50 text-amber-700";

  return (
    <div className="rounded-[18px] border border-[#07111F]/10 bg-[#F6F8FB] p-[21px]">
      <div className="flex items-start gap-[13px]">
        <span
          className={`mt-[3px] h-[13px] w-[13px] shrink-0 rounded-full border ${toneClass}`}
        />

        <div>
          <p className="text-[16px] font-bold leading-[24px] text-[#07111F]">
            {title}
          </p>

          <p className="mt-[5px] text-[15px] leading-[24px] text-slate-500">
            {detail}
          </p>
        </div>
      </div>
    </div>
  );
}

function InsightBlock({
  label,
  title,
  detail,
  impact,
}: {
  label: string;
  title: string;
  detail: string;
  impact: string;
}) {
  return (
    <div className="rounded-[18px] border border-[#07111F]/10 bg-[#F6F8FB] p-[21px]">
      <MetricLabel muted>{label}</MetricLabel>

      <p className="mt-[13px] text-[17px] font-bold leading-[26px] text-[#07111F]">
        {title}
      </p>

      <p className="mt-[8px] text-[15px] leading-[24px] text-slate-500">
        {detail}
      </p>

      <p className="mt-[13px] text-[14px] font-bold text-[#07111F]">
        {impact}
      </p>
    </div>
  );
}

function CoveredPill({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-[10px] text-[15px] font-bold text-[#07111F]">
      <span className="h-[13px] w-[13px] rounded-full border border-[#34C759] bg-[#34C759]/15" />
      <span>{children}</span>
    </div>
  );
}

function CashAmount({
  letter,
  label,
  value,
}: {
  letter: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-[21px]">
      <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-[#07111F] text-[15px] font-bold text-white">
        {letter}
      </div>

      <div>
        <MetricLabel muted>{label}</MetricLabel>

        <p className="mt-[13px] font-sans text-[42px] font-semibold leading-none tracking-[-0.04em] text-[#07111F] [font-variant-numeric:tabular-nums]">
          {value}
        </p>
      </div>
    </div>
  );
}

function MetricLabel({
  children,
  muted = false,
}: {
  children: ReactNode;
  muted?: boolean;
}) {
  return (
    <p
      className={
        muted
          ? "text-[12px] font-bold uppercase tracking-[0.24em] text-[#07111F]/55"
          : "text-[13px] font-bold uppercase tracking-[0.34em] text-[#07111F]/70"
      }
    >
      {children}
    </p>
  );
}