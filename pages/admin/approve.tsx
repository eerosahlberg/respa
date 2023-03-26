import { Heading } from '@chakra-ui/react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../firebase/conf';
import ApproveCard from '../../components/approveEventCard';

export default function approve(props: any) {
	const [userData, setUserData] = useState<any>([]);
	const [loading, setLoading] = useState(true);

	async function getUserData() {
		const querySnapshot = await getDocs(collection(db, 'users'));
		const userData = querySnapshot.docs.map((doc) => doc.data());
		setUserData(userData);
	}

	useEffect(() => {
		getUserData();
		setLoading(false);
	}, []);

	if (loading) {
		return <Heading size={'sm'}>Ladataan...</Heading>;
	}

	return (
		<>
			<Heading size={'md'}>Kuittausta vaativat tapahtumat:</Heading>
			{userData.map((user: { nimi: string; id: string; events: any; email: string }) => {
				console.log(user);
				return (
					<>
						{user.events ? (
							<>
								{Object.keys(user.events).map((eventGroup: string) => {
									return (
										<>
											{user.events[eventGroup].map((event: any) => {
												return (
													<>
														{event.kuitattu === false ? (
															<ApproveCard
																event={event}
																user={user}
																checker={props.user.email}
																eventType={eventGroup}
															/>
														) : null}
													</>
												);
											})}
										</>
									);
								})}
							</>
						) : null}
					</>
				);
			})}
		</>
	);
}
