import { Button, Heading, Link } from '@chakra-ui/react';
import { useRouter } from 'next/router';

export default function NotLoggedIn() {
	const router = useRouter();

	function signIn() {
		router.push({
			pathname: '/login',
			query: { redirect: router.pathname },
		});
	}

	return (
		<>
			<Heading as='h1' size='2xl' marginTop='1rem' marginBottom='1rem'>
				Et ole kirjautunut sisään
			</Heading>
			<Heading as='h2' size='md' marginTop='1rem' marginBottom='1rem'>
				Kirjaudu sisään käyttääksesi palvelua.
			</Heading>
			<Button onClick={signIn}>Siirry sisäänkirjautumiseen</Button>
		</>
	);
}
