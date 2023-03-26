import { Button, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';

export default function login(props: any) {
	const router = useRouter();
	const redirect: any = router?.query?.redirect;

	if (props?.user) {
		router.push(redirect || '/');
	}

	return (
		<>
			<Heading as='h1' size='2xl' marginTop='1rem' marginBottom='1rem'>
				Kirjaudu sisään
			</Heading>

			<Button onClick={props.signIn}>Kirjaudu sisään</Button>
		</>
	);
}
