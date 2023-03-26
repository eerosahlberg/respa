import { Button, Heading } from '@chakra-ui/react';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AllEvents from '../../../components/allEventsTable';
import { db } from '../../../firebase/conf';

export default function User() {
	const router = useRouter();
	const { id }: any = router.query;

	const [userData, setUserData] = useState<any>([]);
	const [loading, setLoading] = useState<boolean>(true);

	const getUser = async () => {
		console.log(id);
		const docRef = doc(db, 'users', id);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			setUserData(docSnap.data());
		} else {
			console.log('No such document!');
		}
	};

	useEffect(() => {
		if (id) {
			getUser();
			setLoading(false);
		} else {
			setLoading(true);
			console.log('No id');
		}
	}, [id]);

	if (loading) {
		return <h1>Ladataan...</h1>;
	}

	return (
		<>
			<Button onClick={() => router.push('/admin/users')}>Takaisin</Button>
			<Heading size='xl' marginTop='1rem'>
				{userData.name}
			</Heading>
			<Heading size='lg' marginTop='1rem' marginBottom='1rem'>
				{userData.email}
			</Heading>

			<AllEvents userData={userData} loading={loading} />
		</>
	);
}
