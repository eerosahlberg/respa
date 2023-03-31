import { Button, Heading, Link } from '@chakra-ui/react';
import { useRouter } from 'next/router';

export default function Unauthorized() {
	const router = useRouter();

	return (
		<>
			<Heading as='h1' size='2xl' marginTop='1rem' marginBottom='1rem'>
				Ei käyttöoikeutta
			</Heading>
			<Heading as='h2' size='md' marginTop='1rem' marginBottom='1rem'>
				Sinulla ei ole käyttöoikeutta tälle sivulle.
			</Heading>
			<Link href='/'>
				<Button>Siirry etusivulle</Button>
			</Link>
		</>
	);
}
