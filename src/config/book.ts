export const bookPath = '/invulboek/';
export const businessPath = '/zakelijk/';
export const bookFormsEnabled = import.meta.env.PUBLIC_BOOK_VALIDATION_ENABLED === 'true';
export const bookTitle = 'Als jullie iets moeten regelen';
export const bookVariants = {
  single: { title: 'Eén invulboek', price: '€24,95', description: 'Eén boek voor jezelf, om samen in te vullen of cadeau te geven.' },
  duo: { title: 'Generatie-duo', price: '€44,99', description: 'Twee boeken, bijvoorbeeld één voor een ouder en één voor een volwassen kind.' },
} as const;
export const organizationTypes = ['Notaris', 'Hypotheekadvies', 'Uitvaart', 'Werkgever', 'Zorg of welzijn', 'Anders'] as const;
export const printRuns = ['25–49', '50–99', '100–499', '500+'] as const;
