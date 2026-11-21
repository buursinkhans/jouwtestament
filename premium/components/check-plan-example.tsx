import { actionPlan, type Answers } from '../lib/check-guide';

const exampleAnswers: Answers = {
  family: 'no-contract',
  children: 'young',
  home: 'mortgage',
  driver: 'protect',
  status: 'nothing',
};

export function CheckPlanExample() {
  const { items } = actionPlan(exampleAnswers);
  const first = items[0];

  return (
    <section className="knowledge-next check-example" aria-labelledby="check-example-title">
      <h2 id="check-example-title">Voorbeeld van een persoonlijk actieplan</h2>
      <p>Fictief voorbeeld. Jullie wonen samen zonder contract, hebben jonge kinderen en een koophuis met hypotheek. Jullie willen vooral de kinderen en elkaar beschermen.</p>
      <dl>
        <div><dt>Dit staat bovenaan</dt><dd><strong>{first.title}.</strong> {first.text}</dd></div>
        <div><dt>Dit kun je thuis bespreken</dt><dd>Wie zouden we vragen om voor de kinderen te zorgen als geen van ons die zorg meer kan dragen?</dd></div>
        <div><dt>Dit kun je uitzoeken</dt><dd>Vraag welke afspraken over jullie woning al vastliggen en wat jullie samen willen regelen. Bekijk <a className="text-link" href="/kennisbank/voogdij-regelen/">hoe je iemand aanwijst voor de zorg voor je kinderen</a>.</dd></div>
      </dl>
      <p>De check geeft ook andere aandachtspunten en mogelijke stappen, zoals het bespreken van een samenlevingscontract. Je kunt je eigen actieplan gratis als PDF downloaden.</p>
    </section>
  );
}

