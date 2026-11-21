import { CheckLink } from './blueprint';

const myths = [
  {
    title: 'Mijn partner erft automatisch alles',
    text: 'Woon je ongehuwd samen zonder geregistreerd partnerschap? Dan erft je partner zonder testament niet automatisch. Dat geldt ook als jullie een samenlevingscontract hebben. Een afspraak daarin kan wél bepalen welke gezamenlijke spullen bij je partner blijven.',
    source: 'https://www.notaris.nl/samen-verder/samenwonen',
    sourceLabel: 'Notaris.nl over samenwonen',
  },
  {
    title: 'Mijn kinderen zijn automatisch beschermd',
    text: 'Wie voor je kinderen zorgt, hangt af van wie nu het gezag heeft. Bij gezamenlijk gezag krijgt de andere ouder het gezag als één ouder overlijdt. Je kunt in je testament of in het gezagsregister een voogd aanwijzen voor als er geen ouder met gezag meer is.',
    source: 'https://www.rijksoverheid.nl/documenten/vraag-en-antwoord/ouderlijk-gezag/wie-krijgt-het-gezag-over-mijn-kind-als-ik-kom-te-overlijden',
    sourceLabel: 'Rijksoverheid over ouderlijk gezag',
  },
  {
    title: 'Mijn oude testament is nog actueel',
    text: 'Een oud testament kan nog geldig zijn en tegelijk minder goed passen. Een nieuwe relatie, andere overwaarde of gewijzigde regels zijn goede aanleidingen om je wensen en afspraken opnieuw te bekijken.',
    source: 'https://www.notaris.nl/testamentmoment/checklist',
    sourceLabel: 'Notaris.nl over je testament nakijken',
  },
  {
    title: 'Mijn woning is goed geregeld',
    text: 'Wie kan in het huis blijven als je overlijdt? En wat betekent verkoop bij opname in een zorginstelling? Als de opbrengst meetelt bij je vermogen, kan dit gevolgen hebben voor je eigen bijdrage. Het CAK kijkt naar je inkomen, vermogen en persoonlijke situatie.',
    source: 'https://www.hetcak.nl/zorg-vanuit-de-wlz/uitleg-eigen-bijdrage-wlz/gegevens-berekening/',
    sourceLabel: 'Het CAK over de eigen bijdrage',
  },
];

export function MythBuster() {
  return (
    <section className="wrap section-space home-myths" aria-labelledby="myths-title">
      <h2 id="myths-title">Dit denken veel Nederlanders ten onrechte</h2>
      <div className="home-card-grid">
        {myths.map((item) => (
          <article className="home-myth" key={item.title}>
            <h3>‘{item.title}’</h3>
            <p>{item.text}</p>
            <a className="text-link" href={item.source}>{item.sourceLabel}</a>
          </article>
        ))}
      </div>
      <div className="home-bridge">
        <p>Herken je een van deze gedachten? Met vijf vragen ontdek je wat jij als eerste kunt bespreken.</p>
        <CheckLink>Doe De Goed Geregeld Check</CheckLink>
      </div>
    </section>
  );
}

