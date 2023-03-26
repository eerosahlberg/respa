import { Box, Button, Heading, HStack, useToast } from '@chakra-ui/react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { db } from '../firebase/conf';
export default function ApproveCard({
	event,
	user,
	eventType,
	checker,
}: {
	event: any;
	user: any;
	eventType: string;
	checker: string;
}) {
	const toast = useToast();
	const [showCard, setShowCard] = useState(true);

	async function approveEvent() {
		const docRef = doc(db, 'users', user.id);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			const data = docSnap.data();

			data.events[eventType].forEach((event: any) => {
				if (event.id === event.id) {
					event.kuitattu = true;
					event.kuittaaja = checker;
				}
			});
			await setDoc(docRef, data)
				.then(() => {
					console.log('Document successfully written!');
					toast({
						title: 'Suoritus kuitattu',
						status: 'success',
						duration: 5000,
						isClosable: true,
					});
					setShowCard(false);
				})
				.catch((error) => {
					console.error('Error writing document: ', error);
				});
		} else {
			// doc.data() will be undefined in this case
			console.log('No such document!');
		}
	}

	if (!showCard) return <></>;

	return (
		<Box border='1px' borderColor='gray.200' borderRadius='md' p={4} m={2} width={'min-content'}>
			<HStack>
				<Box position={'relative'} width={'150px'} height={'100px'} overflow={'hidden'} display={'inline-block'} mr={4}>
					<Heading size={'md'}>{user.name}</Heading>
					<Heading size={'sm'}>{eventType}</Heading>
				</Box>
				<Box position={'relative'} width={'150px'} height={'100px'} overflow={'hidden'} display={'inline-block'} mr={4}>
					{Object.keys(event).map((eventKey: string) => {
						return (
							<>
								{eventKey !== 'kuitattu' ? (
									<Box>
										{eventKey}: {event[eventKey]}
									</Box>
								) : null}
							</>
						);
					})}
				</Box>

				<Button onClick={() => approveEvent()} colorScheme='green' variant='outline' p={2} m={'auto'}>
					Kuittaa
				</Button>
			</HStack>
		</Box>
	);
}
