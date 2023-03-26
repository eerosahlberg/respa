import { Button, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';

export default function Admin(props: any) {
	const router = useRouter();

	return (
		<>
			<Heading as='h1' size='2xl' textAlign='center' marginTop='1rem' marginBottom='1rem'>
				Super upea admin näkymä
			</Heading>

			<Button onClick={() => router.push('/admin/approve')}>Uusien merkkausten checkaus</Button>
			<Button onClick={() => router.push('/admin/users')}>Tarkastele kaikkia tietoja</Button>
		</>
	);
}
