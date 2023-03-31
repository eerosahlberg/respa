import { Container } from '@chakra-ui/react';
import { Head } from 'next/document';
import Header from './Header';

export default function Layout(props: any) {
	const { children } = props;

	return (
		<>
			<Header />
			<Container maxW='container.xl' marginTop='5rem'>
				{children}
			</Container>
		</>
	);
}
