export type StelisLanguage = "en" | "es";

export const stelisText = {
  en: {
    header: {
      greeting: "Good morning, Marvin.",
      date: "Friday, June 12, 2026",
      lastUpdate: "Last update: 7:15 AM",
    },

    sidebar: {
      subtitle: "Executive Intelligence",
      morningBrief: "Morning Brief",
      cashControl: "Cash Control",
      inventory: "Inventory",
      sales: "Sales",
      operations: "Operations",
      suppliers: "Suppliers",
      reports: "Reports",
      settings: "Settings",
      riskWatch: "Risk Watch",
      riskWatchMessage: "3 items need attention today.",
      owner: "Owner",
    },

    cashPosition: {
      title: "Cash Position",
      healthy: "Healthy",
      stable: "Stable",
      review: "Review",
      attentionRequired: "Attention Required",
      noImmediateRisk: "No immediate cash risks detected.",
      riskMessage: "Cash needs attention before new commitments are approved.",
      payrollCovered: "Payroll: Covered",
      supplierPaymentsCovered: "Supplier Payments: Covered",
      cashScore: "Cash Score",
      availableCash: "Available Cash",
      committedCash: "Committed Cash",
    },

    cashflow: {
      title: "Cashflow Control",
      description:
        "Manual cashflow prototype for registering cash, card sales, bank balances, payments, and upcoming obligations.",
      critical: "Critical",
      tight: "Tight",
      healthy: "Healthy",
      cashProtectionRequired: "Cash protection required",
      cashMustBeWatched: "Cash must be watched",
      cashPositionStable: "Cash position stable",
      availableCash: "Available Cash",
      pendingCards: "Pending Cards",
      criticalCommitments: "Critical Commitments",
      trueFreeCash: "True Free Cash",
      registerMovement: "Register Movement",
      movementType: "Movement Type",
      account: "Account",
      amount: "Amount",
      amountPlaceholder: "Example: 5639.39",
      descriptionLabel: "Description",
      descriptionPlaceholder: "Example: BELCA payment",
      date: "Date",
      recommendation: "STELIS Recommendation",
      upcomingObligations: "Upcoming Obligations",
      recentMovements: "Recent Movements",
      securityRule: "Security Rule",
      securityMessage:
        "This prototype does not connect to real bank accounts. Future bank access must be read-only, never store bank passwords, and never move money automatically.",
      recommendations: {
        critical:
          "Protect payroll first. Delay non-critical purchases. Pay suppliers only in strict priority order.",
        tight:
          "Protect payroll and rent. Keep supplier payments controlled until card settlements arrive.",
        healthy:
          "Cash is currently stable. Continue protecting critical obligations before flexible purchases.",
      },
      movementTypes: {
        cash_received: "Cash Received",
        card_sales: "Card Sales",
        bank_deposit: "Bank Deposit",
        supplier_payment: "Supplier Payment",
        payroll: "Payroll",
        rent: "Rent",
        loan_payment: "Loan Payment",
        taxes: "Taxes",
        brand_usage: "Brand Usage",
        emergency_purchase: "Emergency Purchase",
      },
    },

    healthIndex: {
      title: "STELIS Health Index™",
      trend: "Trend",
      excellent: "Excellent",
      strong: "Strong",
      stable: "Stable",
      attentionRequired: "Attention Required",
      atRisk: "At Risk",
      critical: "Critical",
      description:
        "A single operating signal across cash, sales momentum, inventory readiness, supplier standing, waste control, and execution.",
      biggestPositive: "Biggest Positive",
      biggestNegative: "Biggest Negative",
      fastestImprovement: "Fastest Improvement",
    },

    attention: {
      title: "Attention Required",
      headline: "What can hurt the business today.",
      risks: "Risks",
      viewRiskDetails: "View risk details",
    },

    sales: {
      title: "Sales Yesterday",
      helper: "Compared with same day last year",
      lastYearSameDay: "Last Year Same Day",
      difference: "Difference",
    },

    intelligence: {
      title: "STELIS Intelligence",
      headline: "Payroll remains covered.",
      message:
        "Current free cash is positive after committed obligations. Continue protecting supplier payments and avoid non-essential purchases today.",
    },
  },

  es: {
    header: {
      greeting: "Buenos días, Marvin.",
      date: "Viernes, 12 de junio de 2026",
      lastUpdate: "Última actualización: 7:15 AM",
    },

    sidebar: {
      subtitle: "Inteligencia Ejecutiva",
      morningBrief: "Resumen Diario",
      cashControl: "Control de Caja",
      inventory: "Inventario",
      sales: "Ventas",
      operations: "Operaciones",
      suppliers: "Proveedores",
      reports: "Reportes",
      settings: "Ajustes",
      riskWatch: "Riesgos",
      riskWatchMessage: "3 puntos necesitan atención hoy.",
      owner: "Propietario",
    },

    cashPosition: {
      title: "Posición de Caja",
      healthy: "Saludable",
      stable: "Estable",
      review: "Revisar",
      attentionRequired: "Atención Requerida",
      noImmediateRisk: "No hay riesgos inmediatos de caja.",
      riskMessage:
        "La caja necesita atención antes de aprobar nuevos compromisos.",
      payrollCovered: "Planilla: Cubierta",
      supplierPaymentsCovered: "Proveedores: Cubiertos",
      cashScore: "Puntaje de Caja",
      availableCash: "Caja Disponible",
      committedCash: "Caja Comprometida",
    },

    cashflow: {
      title: "Control de Flujo de Caja",
      description:
        "Prototipo manual para registrar efectivo, ventas con tarjeta, saldos bancarios, pagos y obligaciones próximas.",
      critical: "Crítico",
      tight: "Ajustado",
      healthy: "Saludable",
      cashProtectionRequired: "Se requiere proteger caja",
      cashMustBeWatched: "La caja debe vigilarse",
      cashPositionStable: "La caja está estable",
      availableCash: "Caja Disponible",
      pendingCards: "Tarjetas Pendientes",
      criticalCommitments: "Compromisos Críticos",
      trueFreeCash: "Caja Libre Real",
      registerMovement: "Registrar Movimiento",
      movementType: "Tipo de Movimiento",
      account: "Cuenta",
      amount: "Monto",
      amountPlaceholder: "Ejemplo: 5639.39",
      descriptionLabel: "Descripción",
      descriptionPlaceholder: "Ejemplo: pago BELCA",
      date: "Fecha",
      recommendation: "Recomendación STELIS",
      upcomingObligations: "Obligaciones Próximas",
      recentMovements: "Movimientos Recientes",
      securityRule: "Regla de Seguridad",
      securityMessage:
        "Este prototipo no se conecta a cuentas bancarias reales. El acceso bancario futuro debe ser solo lectura, nunca guardar contraseñas bancarias y nunca mover dinero automáticamente.",
      recommendations: {
        critical:
          "Protege primero la planilla. Retrasa compras no críticas. Paga proveedores solo en estricto orden de prioridad.",
        tight:
          "Protege planilla y renta. Mantén controlados los pagos a proveedores hasta que entren las liquidaciones de tarjeta.",
        healthy:
          "La caja está estable. Sigue protegiendo obligaciones críticas antes de compras flexibles.",
      },
      movementTypes: {
        cash_received: "Efectivo Recibido",
        card_sales: "Ventas con Tarjeta",
        bank_deposit: "Depósito Bancario",
        supplier_payment: "Pago a Proveedor",
        payroll: "Planilla",
        rent: "Renta",
        loan_payment: "Pago de Préstamo",
        taxes: "Impuestos",
        brand_usage: "Uso de Marca",
        emergency_purchase: "Compra de Emergencia",
      },
    },

    healthIndex: {
      title: "Índice de Salud STELIS™",
      trend: "Tendencia",
      excellent: "Excelente",
      strong: "Fuerte",
      stable: "Estable",
      attentionRequired: "Atención Requerida",
      atRisk: "En Riesgo",
      critical: "Crítico",
      description:
        "Una señal operativa que resume caja, ventas, inventario, proveedores, desperdicio y ejecución.",
      biggestPositive: "Mayor Fortaleza",
      biggestNegative: "Mayor Riesgo",
      fastestImprovement: "Mejora Más Rápida",
    },

    attention: {
      title: "Atención Requerida",
      headline: "Lo que puede afectar el negocio hoy.",
      risks: "Riesgos",
      viewRiskDetails: "Ver detalles de riesgo",
    },

    sales: {
      title: "Ventas de Ayer",
      helper: "Comparado con el mismo día del año pasado",
      lastYearSameDay: "Mismo Día Año Pasado",
      difference: "Diferencia",
    },

    intelligence: {
      title: "Inteligencia STELIS",
      headline: "La planilla permanece cubierta.",
      message:
        "La caja libre actual es positiva después de compromisos. Sigue protegiendo pagos a proveedores y evita compras no esenciales hoy.",
    },
  },
} as const;