import { Box, Button } from '@chakra-ui/react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Heading } from '@chakra-ui/react';
import Login from './login';

import { db } from '../firebase/conf';
import { getAuth } from 'firebase/auth';

export default function Home(props: any) {
	const router = useRouter();

	const [isAdmin, setIsAdmin] = useState<boolean>(false);

	const checkAdmin = async () => {
		const docRef = doc(db, 'users', props.user.uid);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			if (docSnap.data().role === 'admin') {
				setIsAdmin(true);
			}
		} else {
			console.log('No such document!');
		}
	};

	useEffect(() => {
		if (props.user) {
			checkAdmin();
		}
	}, [props.user]);

	return (
		<>
			{props.user ? (
				<>
					<Box
						margin='auto'
						textAlign='center'
						border='2px'
						borderRadius={'2xl'}
						maxWidth='25rem'
						backgroundColor={'gray.300'}
					>
						<Heading as='h1' size='xl' marginTop='1rem' marginBottom='1rem'>
							Tervetuloa {props.user.displayName}!
						</Heading>
						{isAdmin ? (
							<Box margin={'1rem'}>
								<Button onClick={() => router.push('/admin')}>Admin</Button>
							</Box>
						) : null}
						<Box margin={'1rem'}>
							<Button onClick={() => router.push('/events/add')}>Lisää uusi tapahtumakirjaus</Button>
						</Box>
						<Box margin={'1rem'}>
							<Button onClick={() => router.push('/events')}>Omien kirjausten tarkastelu</Button>
						</Box>

						<Box margin={'1rem'}>
							<Button onClick={props.signOut}>Kirjaudu ulos</Button>
						</Box>
					</Box>
				</>
			) : (
				<>
					<Login />
				</>
			)}
		</>
	);
}
