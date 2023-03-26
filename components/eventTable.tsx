import { Box, Heading, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { GrCheckbox, GrCheckboxSelected } from 'react-icons/gr';

export default function EventTable({ data }: { data: any }) {
	console.log(data);
	return (
		//table with all the data
		<Table variant='simple' size='sm' border='1px' borderColor='gray.200' borderRadius='md' p={4} m={2} width='min-content'>
			<TableContainer>
				<Thead>
					<Tr>
						{Object.keys(data[0])
							.sort()
							.map((key: string) => {
								//if key is "kuittaus" then return nothing, otherwise return the key
								if (key === 'kuitattu' || key === 'id' || key === 'kuittaaja') {
									return;
								} else {
									return <Th>{key}</Th>;
								}
							})}
						<Th>Kuitattu</Th>
					</Tr>
				</Thead>
				<Tbody>
					{data.map((event: any) => {
						return (
							<Tr>
								{Object.keys(event)
									.sort()
									.map((key) => {
										if (key === 'kuitattu' || key === 'id' || key === 'kuittaaja') {
											return;
										} else {
											return <Td>{event[key]}</Td>;
										}
									})}
								<Td>
									{event.kuitattu ? (
										<GrCheckboxSelected title={'Kuitannut: ' + event.kuittaaja} />
									) : (
										<GrCheckbox />
									)}
								</Td>
							</Tr>
						);
					})}
				</Tbody>
			</TableContainer>
		</Table>
	);
}
