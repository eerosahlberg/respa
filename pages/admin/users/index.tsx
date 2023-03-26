import { Heading, Button } from '@chakra-ui/react';
import { getDocs, collection } from 'firebase/firestore';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { db } from '../../../firebase/conf';

export default function Users(props: any) {
	const router = useRouter();

	const [users, setUsers] = useState<any>([]);
	const [loading, setLoading] = useState<boolean>(true);

	const getUsers = async () => {
		const querySnapshot = await getDocs(collection(db, 'users'));
		const users = querySnapshot.docs.map((doc) => doc.data());
		setUsers(users);
	};

	if (loading) {
		getUsers();
		setLoading(false);
	}

	return (
		<>
			<Heading as='h1' size='2xl' textAlign='center' marginTop='1rem' marginBottom='1rem'>
				Käyttäjät
			</Heading>

			{users.map((user: any) => {
				return (
					<>
						<Link
							href={{
								pathname: '/admin/users/[id]',
								query: { id: user.id },
							}}
						>
							<Heading
								_hover={{ 'text-decoration': 'underline' }}
								as='h2'
								size='md'
								textAlign='center'
								marginTop='1rem'
								marginBottom='1rem'
							>
								{user.name}
							</Heading>
						</Link>
					</>
				);
			})}
		</>
	);
}
