import type { Metadata } from 'next';
import { Hub } from '../../components/hub';
export const metadata:Metadata={title:'Goed geregeld voor later',description:'Breng wensen voor je woning, schenkingen en hulp voor later in kaart.',alternates:{canonical:'/voor-later/'}};
export default function Page(){return <Hub slug="voor-later"/>;}

