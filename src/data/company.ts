// Bedrijfsgegevens uit CLAUDE.md. Eén bron voor de footer, de Over ons-pagina
// en de structured data (Organization), zodat een wijziging maar op één plek
// hoeft. Verzin hier nooit ontbrekende gegevens bij (zie CLAUDE.md).
export const company = {
  name: 'jouwtestament',
  // Vestigingsadres (uit CLAUDE.md) staat op verzoek van de eigenaar niet
  // op de website. Alleen het e-mailadres wordt getoond. Deze velden blijven
  // hier staan voor eventueel toekomstig gebruik (bv. KvK-registratie),
  // maar worden nergens gerenderd.
  street: 'Pablo Picassostraat 61',
  city: 'Rotterdam',
  // Postcode, KvK-nummer en btw-nummer zijn nog niet bevestigd door de
  // eigenaar. Vul ze hier pas in zodra dat is gebeurd (zie CLAUDE.md,
  // sectie "Bedrijfsgegevens") — niet eerder, en niet verzonnen.
  postalCode: undefined as string | undefined,
  kvkNumber: undefined as string | undefined,
  vatNumber: undefined as string | undefined,
  email: 'info@jouwtestament.nl',
  country: 'NL',
};
