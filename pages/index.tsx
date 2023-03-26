import { Button } from '@chakra-ui/react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { db } from '../firebase/conf';

export default function Home(props: any) {
	const router = useRouter();

	return (
		<>
			<h1>RESPA</h1>
			<div>
				{props.user ? (
					<>
						<h2>Logged in as {props.user.displayName}</h2>
						<h3>ID: {props.user.uid}</h3>

						<Button onClick={props.signOut}>Sign out</Button>
						<Button onClick={() => router.push('/events')}>Meeppä tarkastelemaan tapahtumias</Button>
					</>
				) : (
					<>
						<h2>Not logged in</h2>
						<Button onClick={props.signIn}>Sign in</Button>
					</>
				)}
			</div>
		</>
	);
}
