import type { Metadata } from 'next';
import { Breadcrumb } from '../../../components/blueprint';
import { FamilyAgenda } from '../../../components/family-agenda';
import { agendaPath, familyPath } from '../../../lib/familiegesprek';

export const metadata: Metadata = {
  title: 'Gratis gespreksagenda voor je familiegesprek',
  description: 'Kies de onderwerpen die je met je familie wilt bespreken en maak gratis een printbare agenda met vragen en ruimte voor afspraken.',
  alternates: { canonical: agendaPath },
};

export default function Page() {
  return <div className="subpage section-space article blueprint-page family-page">
    <Breadcrumb title="Gespreksagenda" path={agendaPath} parents={[{ title: 'Erfenis bespreken', path: familyPath }]} />
    <h1>Maak je gespreksagenda</h1>
    <FamilyAgenda />
  </div>;
}

