import { authorship } from '../lib/knowledge';

type Review = { name: string; href: string };

export function EditorialCredit({ updated, review }: { updated: string; review?: Review }) {
  const date = new Intl.DateTimeFormat('nl-NL', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
  }).format(new Date(updated + 'T00:00:00Z'));

  return (
    <aside className="editorial-credit" aria-label="Redactionele informatie">
      <p>Geschreven in mensentaal door {authorship}</p>
      <ul>
        <li>{review ? <>Juridisch gecontroleerd door <a className="text-link" href={review.href}>{review.name}</a></> : 'Officiële bronnen geraadpleegd'}</li>
        <li>Laatst bijgewerkt <time dateTime={updated}>{date}</time></li>
      </ul>
    </aside>
  );
}

