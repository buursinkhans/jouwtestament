const experiences = [
  {
    group: 'Jong gezin',
    title: 'Wie zorgt er voor de kinderen?',
    text: 'Toen Karin ging trouwen met de vader van haar jongste zoon, wilde ze vastleggen wie voor haar kinderen zou zorgen als dat nodig werd.',
    source: 'https://www.rtl.nl/lifestyle/artikel/5474773/voogdij-kind-vastleggen-notaris-gezagsregister-gezin-overlijden',
    publisher: 'RTL Nieuws',
  },
  {
    group: 'Samengesteld gezin',
    title: 'Een huis voor samen, aandacht voor alle kinderen',
    text: 'Aad en Marieke kochten samen een appartement. Ze wilden dat de ander er kon blijven wonen én dat hun kinderen uit eerdere relaties goed waren meegenomen.',
    source: 'https://www.knb.nl/actueel/notariaat-magazine/2025/notariaat-magazine-nr-1-februari-2025/%27voorkom-spitten-oude-administraties%27/',
    publisher: 'Notariaat Magazine',
  },
  {
    group: '55-plus huishouden',
    title: 'Een avond om de wensen uit te leggen',
    text: 'Het echtpaar Eikelboom nodigde de kinderen en hun partners uit om met de notaris te bespreken waarom het hun afspraken had bijgewerkt.',
    source: 'https://www.knb.nl/actueel/notariaat-magazine/2021/notariaat-magazine-nr-5-juli-2021/actualiseren-%28levens%29testament/',
    publisher: 'Notariaat Magazine',
  },
];

export function Testimonials() {
  return (
    <section className="wrap section-space home-experiences" aria-labelledby="experiences-title">
      <h2 id="experiences-title">Hoe andere families het gesprek begonnen</h2>
      <p>Drie ervaringen uit openbare interviews.</p>
      <div className="home-story-grid">
        {experiences.map((item) => (
          <article className="home-experience" key={item.group}>
            <p className="home-experience-group">{item.group}</p>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            <a className="text-link" href={item.source}>Lees bij {item.publisher}<span className="sr-only"> over {item.title}</span></a>
          </article>
        ))}
      </div>
    </section>
  );
}

