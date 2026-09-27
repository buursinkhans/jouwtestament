// All prices (docs/01, docs/10). Single source of truth: never hard-code prices in components.
// Derived amounts (savings, examples) are computed, never typed in.
// TODO(owner): confirm VAT, living will and cohabitation agreement prices with the partner.
export const pricing = {
  advice: { min: 500, max: 1000 },
  adviceComplex: { min: 750, max: 1000 }, // e.g. blended families. TODO(owner): confirm with partner
  willSingle: 500,
  willCouple: 800, // for 2 testaments
  livingWill: null as number | null,
  cohabitationAgreement: null as number | null,
  vatIncluded: true, // TODO(owner)
};

export const coupleSaving = pricing.willSingle * 2 - pricing.willCouple;

export const PRICE_PLACEHOLDER = '[PRIJS]';

const nl = (amount: number) => amount.toLocaleString('nl-NL');

/** "€ 1.300", or [PRIJS] for an unconfirmed price. */
export function euro(amount: number | null): string {
  return amount === null ? PRICE_PLACEHOLDER : `€ ${nl(amount)}`;
}

/** "€ 500 – 1.000" */
export function euroRange(range: { min: number; max: number }): string {
  return `€ ${nl(range.min)} – ${nl(range.max)}`;
}
