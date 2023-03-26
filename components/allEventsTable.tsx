import { Heading, Button } from '@chakra-ui/react';
import router from 'next/router';
import EventTable from './eventTable';

export default function AllEvents({ userData, loading }: { userData: any; loading: boolean }) {
	if (loading) {
		return <h1>Ladataan...</h1>;
	}

	return (
		<>
			<Heading size={'lg'}>Suoritukset ja tapahtumat</Heading>

			<Heading size={'md'}>Retket:</Heading>
			{userData.events?.retket?.length > 0 ? <EventTable data={userData.events?.retket} /> : <>Ei retkiä</>}

			<Heading size={'md'}>Leirit:</Heading>
			{userData.events?.leirit?.length > 0 ? <EventTable data={userData.events?.leirit} /> : <>Ei leirejä</>}

			<Heading size={'md'}>Vaellukset:</Heading>
			{userData.events?.vaellukset?.length > 0 ? <EventTable data={userData.events?.vaellukset} /> : <>Ei vaelluksia</>}

			<Heading size={'md'}>Kisat:</Heading>
			{userData.events?.kisat?.length > 0 ? <EventTable data={userData.events?.kisat} /> : <>Ei kisoja</>}

			<Heading size={'md'}>Ansiomerkit:</Heading>
			{userData.events?.ansiomerkit?.length > 0 ? (
				<EventTable data={userData.events?.ansiomerkit} />
			) : (
				<>Ei ansiomerkkejä</>
			)}

			<Heading size={'md'}>Kurssit:</Heading>
			{userData.events?.kurssit?.length > 0 ? <EventTable data={userData.events?.kurssit} /> : <>Ei kursseja</>}

			<Heading size={'md'}>Riihitykset:</Heading>
			{userData.events?.riihitykset?.length > 0 ? (
				<EventTable data={userData.events?.riihitykset} />
			) : (
				<>Ei riihityksiä</>
			)}

			<Heading size={'md'}>Nahkaliljat:</Heading>
			{userData.events?.nahkaliljat?.length > 0 ? (
				<EventTable data={userData.events?.nahkaliljat} />
			) : (
				<>Ei nahkaliljoja</>
			)}

			<Heading size={'md'}>Jankasudet:</Heading>
			{userData.events?.jankasudet?.length > 0 ? <EventTable data={userData.events?.jankasudet} /> : <>Ei jänkäsusia</>}
		</>
	);
}
