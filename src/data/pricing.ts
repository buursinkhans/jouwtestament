// Prijzen voor de smoketest, bevestigd door de eigenaar (zie businessmodel.md).
// Eén plek aanpassen als de prijs verandert.
export const pricing = {
  pricePerDocument: 399,
  coupleDiscount: 75,
  guaranteeWeeks: 3,
};

export const priceForTwo = pricing.pricePerDocument * 2 - pricing.coupleDiscount;
