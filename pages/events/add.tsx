import { db } from '../../firebase/conf';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { useState } from 'react';

import { Button, Heading, Input, Select, useToast } from '@chakra-ui/react';

export default function AddEvent(props: any) {
	const [type, setType] = useState<string>('');

	const [eventData, setEventData] = useState<any>([]);
	const handleChange = (e: any) => {
		setEventData({ ...eventData, [e.target.name]: e.target.value });
	};
	const toast = useToast();

	const submit = async () => {
		const userRef = doc(db, 'users', props.user.uid);
		if (type === 'retki') {
			await updateDoc(userRef, {
				'events.retket': arrayUnion({
					aika: eventData?.retki_aika,
					paikka: eventData?.retki_paikka,
					organisaatio: eventData?.retki_organisaatio,
					majoite: eventData?.retki_majoite,
					kuitattu: false,
					id: Math.floor(Math.random() * 1000000000),
				}),
			});
		}
		if (type === 'leiri') {
			await updateDoc(userRef, {
				'events.leirit': arrayUnion({
					aika: eventData?.leiri_aika,
					paikka: eventData?.leiri_paikka,
					organisaatio: eventData?.leiri_organisaatio,
					nimi: eventData?.leiri_nimi,
					kuitattu: false,
					id: Math.floor(Math.random() * 1000000000),
				}),
			});
		}
		if (type === 'kisa') {
			await updateDoc(userRef, {
				'events.kisat': arrayUnion({
					aika: eventData?.kisa_aika,
					paikka: eventData?.kisa_paikka,
					nimi: eventData?.kisa_nimi,
					vartion_nimi: eventData?.kisa_vartionnimi,
					sarja: eventData?.kisa_sarja,
					sija: eventData?.kisa_sija,
					kuitattu: false,
					id: Math.floor(Math.random() * 1000000000),
				}),
			});
		}
		if (type === 'vaellus') {
			await updateDoc(userRef, {
				'events.vaellukset': arrayUnion({
					aika: eventData?.vaellus_aika,
					paikka: eventData?.vaellus_paikka,
					kesto: eventData?.vaellus_kesto,
					matka: eventData?.vaellus_matka,
					kuitattu: false,
					id: Math.floor(Math.random() * 1000000000),
				}),
			});
		}
		if (type === 'ansiomerkki') {
			await updateDoc(userRef, {
				'events.ansiomerkit': arrayUnion({
					merkki: eventData?.ansiomerkki_merkki,
					aika: eventData?.ansiomerkki_aika,
					kuitattu: false,
					id: Math.floor(Math.random() * 1000000000),
				}),
			});
		}
		if (type === 'kurssi') {
			await updateDoc(userRef, {
				'events.kurssit': arrayUnion({
					aika: eventData?.kurssi_aika,
					nimi: eventData?.kurssi_nimi,
					organisaatio: eventData?.kurssi_organisaatio,
					kuitattu: false,
					id: Math.floor(Math.random() * 1000000000),
				}),
			});
		}
		if (type === 'riihitys') {
			await updateDoc(userRef, {
				'events.riihitykset': arrayUnion({
					luokka: eventData?.riihitys_luokka,
					aika: eventData?.riihitys_aika,
					paikka: eventData?.riihitys_paikka,
					arvosana: eventData?.riihitys_arvosana,
					kuitattu: false,
					id: Math.floor(Math.random() * 1000000000),
				}),
			});
		}
		if (type === 'nahkalilja') {
			await updateDoc(userRef, {
				'events.nahkaliljat': arrayUnion({
					tyyppi: eventData?.nahkalilja_tyyppi,
					aika: eventData?.nahkalilja_aika,
					paikka: eventData?.nahkalilja_paikka,
					kuitattu: false,
					id: Math.floor(Math.random() * 1000000000),
				}),
			});
		}
		if (type === 'jankasusi') {
			await updateDoc(userRef, {
				'events.jankasudet': arrayUnion({
					tyyppi: eventData?.jankasusi_tyyppi,
					aika: eventData?.jankasusi_aika,
					myonnetty: eventData?.jankasusi_myonnetty,
					kuitattu: false,
					id: Math.floor(Math.random() * 1000000000),
				}),
			});
		}
		toast({
			title: 'Tapahtuma lisätty!',
			description: 'Tapahtuma lisättiin onnistuneesti!',
			status: 'success',
			duration: 5000,
			isClosable: true,
		});
		setEventData({});
	};

	return (
		<>
			<div>
				<Heading>Kirjaa uusi tapahtuma</Heading>
				<form>
					<Heading size='md'>Suorituksen tyyppi:</Heading>
					<Select
						placeholder='Valitse suorituksen tyyppi'
						onChange={(e) => {
							setType(e.target.value);
						}}
						value={type}
					>
						<option value='retki'>Retki</option>
						<option value='leiri'>Leiri</option>
						<option value='kisa'>Kisa</option>
						<option value='vaellus'>Vaellus</option>
						<option value='kurssi'>Kurssi</option>
						<option value='ansiomerkki'>Ansiomerkki</option>
						<option value='riihitys'>Riihitys</option>
						<option value='nahkalilja'>Nahkalilja</option>
						<option value='jankasusi'>Jänkäsusi</option>
					</Select>

					{type === 'retki' ? (
						<>
							<Heading size='md'>Retken ajankohta:</Heading>
							<Input name='retki_aika' onChange={handleChange} type='text' />
							<Heading size='md'>Retkipaikka:</Heading>
							<Input name='retki_paikka' onChange={handleChange} type='text' />
							<Heading size='md'>Retken järjestäjä:</Heading>
							<Input name='retki_organisaatio' onChange={handleChange} type='text' />
							<Heading size='md'>Majoite:</Heading>
							<Input name='retki_majoite' onChange={handleChange} type='text' />
						</>
					) : type === 'leiri' ? (
						<>
							<Heading size='md'>Leirin ajankohta:</Heading>
							<Input name='leiri_aika' type='text' onChange={handleChange} />
							<Heading size='md'>Leirin nimi:</Heading>
							<Input name='leiri_nimi' type='text' onChange={handleChange} />
							<Heading size='md'>Leiripaikka:</Heading>
							<Input name='leiri_paikka' type='text' onChange={handleChange} />
							<Heading size='md'>Leirin järjestäjä:</Heading>
							<Input name='leiri_organisaatio' type='text' onChange={handleChange} />
						</>
					) : type === 'kisa' ? (
						<>
							<Heading size='md'>Kisan ajankohta:</Heading>
							<Input name='kisa_aika' type='date' onChange={handleChange} />
							<Heading size='md'>Kisan nimi:</Heading>
							<Input name='kisa_nimi' type='text' onChange={handleChange} />
							<Heading size='md'>Kisapaikka:</Heading>
							<Input name='kisa_paikka' type='text' onChange={handleChange} />
							<Heading size='md'>Kisavartion nimi:</Heading>
							<Input name='kisa_vartionnimi' type='text' onChange={handleChange} />
							<Heading size='md'>Sarja:</Heading>
							<Input name='kisa_sarja' type='text' onChange={handleChange} />
							<Heading size='md'>Sija:</Heading>
							<Input name='kisa_sija' type='number' onChange={handleChange} />
						</>
					) : type === 'vaellus' ? (
						<>
							<Heading size='md'>Vaelluksen ajankohta:</Heading>
							<Input name='vaellus_aika' type='text' onChange={handleChange} />
							<Heading size='md'>Paikka:</Heading>
							<Input name='vaellus_paikka' type='text' onChange={handleChange} />
							<Heading size='md'>Kesto päivinä:</Heading>
							<Input name='vaellus_kesto' type='number' onChange={handleChange} />
							<Heading size='md'>Matka, km:</Heading>
							<Input name='vaellus_matka' type='number' onChange={handleChange} />
						</>
					) : type === 'ansiomerkki' ? (
						<>
							<Heading size='md'>Merkki:</Heading>
							<Input name='ansiomerkki_merkki' type='text' onChange={handleChange} />
							<Heading size='md'>Myönnetty pvm:</Heading>
							<Input name='ansiomerkki_aika' type='date' onChange={handleChange} />
						</>
					) : type === 'kurssi' ? (
						<>
							<Heading size='md'>Kurssin nimi:</Heading>
							<Input name='kurssi_nimi' type='text' onChange={handleChange} />
							<Heading size='md'>Kurssin järjestäjä:</Heading>
							<Input name='kurssi_organisaatio' type='text' onChange={handleChange} />
							<Heading size='md'>Kurssin ajankohta:</Heading>
							<Input name='kurssi_aika' type='text' onChange={handleChange} />
						</>
					) : type === 'riihitys' ? (
						<>
							<Select
								name='riihitys_luokka'
								onChange={handleChange}
								value={eventData.riihitys_luokka || 'Valitse luokka'}
							>
								<option value='III-luokka'>III-luokka</option>
								<option value='II-luokka'>II-luokka</option>
								<option value='I-luokka'>I-luokka</option>
							</Select>
							<Heading size='md'>Riihityksen ajankohta:</Heading>
							<Input name='riihitys_aika' type='text' onChange={handleChange} />
							<Heading size='md'>Riihityksen paikka:</Heading>
							<Input name='riihitys_paikka' type='text' onChange={handleChange} />
							<Heading size='md'>Arvosana</Heading>
							<Input name='riihitys_arvosana' type='text' onChange={handleChange} />
						</>
					) : type === 'nahkalilja' ? (
						<>
							<Heading size='md'>Nahkaliljat:</Heading>
							<Select name='nahkalilja_tyyppi' onChange={handleChange}>
								<option value='Vihreä'>Vihreä</option>
								<option value='Punainen'>Punainen</option>
								<option value='Harmaa'>Harmaa</option>
								<option value='Musta'>Musta</option>
							</Select>
							<Heading size='md'>Nahkaliljan ajankohta:</Heading>
							<Input name='nahkalilja_aika' type='text' onChange={handleChange} />
							<Heading size='md'>Nahkaliljan paikka:</Heading>
							<Input name='nahkalilja_paikka' type='text' onChange={handleChange} />
						</>
					) : type === 'jankasusi' ? (
						<>
							<Select name='jankasusi_tyyppi' onChange={handleChange}>
								<option value='Vihreä'>Vihreä</option>
								<option value='Sininen'>Sininen</option>
								<option value='Punainen'>Punainen</option>
								<option value='Musta'>Musta</option>
							</Select>
							<Heading size='md'>Vaatimukset täyttyneet pvm:</Heading>
							<Input name='jankasusi_aika' type='text' onChange={handleChange} />
							<Heading size='md'>Myönnetty pvm:</Heading>
							<Input name='jankasusi_myonnetty' type='text' onChange={handleChange} />
						</>
					) : null}

					<Button onClick={() => submit()}>Lähetä</Button>
				</form>
			</div>
		</>
	);
}
