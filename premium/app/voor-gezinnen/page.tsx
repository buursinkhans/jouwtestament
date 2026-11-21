import type { Metadata } from 'next';
import { Hub } from '../../components/hub';
export const metadata:Metadata={title:'Goed geregeld voor gezinnen',description:'Bereid met je gezin een gesprek voor over kinderen, jullie woning en afspraken voor later.',alternates:{canonical:'/voor-gezinnen/'}};
export default function Page(){return <Hub slug="voor-gezinnen"/>;}

