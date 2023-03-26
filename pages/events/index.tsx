import { db } from '../../firebase/conf';
import {
	addDoc,
	setDoc,
	doc,
	collection,
	QueryDocumentSnapshot,
	DocumentData,
	query,
	where,
	limit,
	getDoc,
} from 'firebase/firestore';
import EventTable from '../../components/eventTable';

import { useEffect, useState } from 'react';
import { Button, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import AllEvents from '../../components/allEventsTable';

export default function Events(props: any) {
	const [userData, setUserData] = useState<any>();
	const [loading, setLoading] = useState<boolean>(true);

	const getUser = async () => {
		const docRef: any = doc(db, 'users', props.user.uid);
		const docSnap: any = await getDoc(docRef);

		if (docSnap.exists()) {
			setUserData(docSnap.data());
			setLoading(false);
		} else {
			console.log('No such document!');
		}
	};

	useEffect(() => {
		if (props.user) {
			getUser();
		}
	}, [props.user]);

	const router = useRouter();

	if (loading) {
		return <h1>Ladataan...</h1>;
	}

	return (
		<>
			<Button onClick={() => router.push('/events/add')}>Lisää uusia suorituksia</Button>
			<AllEvents userData={userData} loading={loading} />
		</>
	);
}
