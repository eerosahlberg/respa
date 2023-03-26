import { Heading, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/conf';

const RedirectUnauthorized = ({ router, children, props }: { router: any; children: any; props: any }) => {
	const isBrowser = typeof window !== 'undefined';
	const toast = useToast();

	const [user, setUser] = useState<any>(null);
	const [loading, setLoading] = useState(true);

	const auth = getAuth();
	onAuthStateChanged(auth, (user) => {
		if (user) {
			setUser(user);
			getAdminUsers().then((adminUsers) => {
				if (adminUsers.includes(user.uid)) {
					console.log('admin');
					setLoading(false);
				} else {
					console.log('not admin');
					if (router.pathname.startsWith('/admin')) {
						redirectToHome();
					} else {
						setLoading(false);
					}
				}
			});
		} else {
			if (isBrowser && router.pathname !== '/login') {
				setLoading(false);
				redirectToLogin();
			}
		}
	});

	async function getAdminUsers() {
		const q = query(collection(db, 'users'), where('role', '==', 'admin'));
		var adminUsers: any[] = [];
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			adminUsers.push(doc.data().id);
		});
		return adminUsers;
	}

	function redirectToLogin() {
		router.push({
			pathname: '/login',
			query: { redirect: router.pathname },
		});
		setLoading(false);
	}

	function redirectToHome() {
		setLoading(false);
		return <>Ei käyttöoikeuksia</>;
	}
	function unAuthToast() {
		toast({
			title: 'Ei käyttöoikeuksia',
			description: 'Sinulla ei ole käyttöoikeuksia tälle sivulle',
			status: 'error',
			duration: 5000,
			isClosable: true,
		});
	}

	if (!loading) {
		return <>{children}</>;
	} else {
		return <>Ladataan...</>;
	}
};

export default RedirectUnauthorized;
