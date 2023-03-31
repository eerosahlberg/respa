import { Box, Heading, Link } from '@chakra-ui/react';

export default function Header() {
	return (
		<>
			<Box
				as='header'
				position='fixed'
				top='0'
				left='0'
				width='100%'
				height='4rem'
				backgroundColor='gray.800'
				color='white'
				display='flex'
				alignItems='center'
				justifyContent='center'
				zIndex='100'
			>
				<Link href='/'>
					<Heading as='h1' size='2xl' marginTop='1rem' marginBottom='1rem' letterSpacing='.4rem'>
						RESPA
					</Heading>
				</Link>
			</Box>
		</>
	);
}
