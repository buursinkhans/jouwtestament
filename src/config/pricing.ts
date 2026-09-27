// Helder Nalaten pricing (see CLAUDE.md and docs/06). Single source of truth:
// never hard-code prices in components. `null` = not confirmed yet, shown as [PRIJS].
// TODO(owner): confirm all amounts with the partner (incl. or excl. VAT?).
export const pricing = {
  advice: 500, // financial advice, standard situation
  adviceComplex: { from: 750, to: 1000 }, // e.g. blended families. TODO(owner): confirm with partner
  testamentSingle: 500, // one testament at a network notary
  testamentCouple: 800, // two testaments (partners)
  cohabitationContract: null as number | null, // samenlevingscontract
  livingWill: null as number | null, // levenstestament
};

export const PRICE_PLACEHOLDER = '[PRIJS]';

export function formatEuro(amount: number | null): string {
  return amount === null ? PRICE_PLACEHOLDER : `€ ${amount.toLocaleString('nl-NL')}`;
}
