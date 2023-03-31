import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { db } from '../firebase/conf';

import RedirectUnauthorized from '../components/redirectUnauthorized';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useEffect, useState } from 'react';
import { provider, auth } from '../firebase/conf';

import { ChakraProvider } from '@chakra-ui/react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';

import Layout from '../components/Layout';

const signIn = () => {
	auth.signInWithPopup(provider)
		.then(async (result) => {
			const userId: string = result.user?.uid || '';
			const docRef = doc(db, 'users', userId);
			const docSnap = await getDoc(docRef);
			if (!docSnap.exists()) {
				await setDoc(doc(db, 'users', userId), {
					name: result.user?.displayName,
					email: result.user?.email,
					id: result.user?.uid,
					role: 'user',
				});
			}
		})
		.catch((error) => {
			console.log(error);
		});
};
const signOut = () => {
	auth.signOut();
};

export default function App({ Component, pageProps }: AppProps) {
	const [user, setUser] = useState<firebase.User | null>(null);

	useEffect(() => {
		firebase.auth().onAuthStateChanged((user) => {
			setUser(user);
		});
	}, []);

	return (
		<ChakraProvider>
			<Layout user={user} signIn={signIn} signOut={signOut}>
				<RedirectUnauthorized router={useRouter()}>
					<Component {...pageProps} user={user} signIn={signIn} signOut={signOut} />
				</RedirectUnauthorized>
			</Layout>
		</ChakraProvider>
	);
}
