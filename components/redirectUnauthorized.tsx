import { Heading, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/conf';
import Unauthorized from './unauthorized';
import NotLoggedIn from './notLoggedIn';

const RedirectUnauthorized = ({ router, children }: { router: any; children: any }) => {
	const isBrowser = typeof window !== 'undefined';
	const toast = useToast();

	const [user, setUser] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [isAdmin, setIsAdmin] = useState(false);
	const [protectedRoute, setProtectedRoute] = useState(true);
	const [loggedIn, setLoggedIn] = useState(false);

	const auth = getAuth();

	onAuthStateChanged(auth, (user) => {
		if (user) {
			setLoggedIn(true);
			setUser(user);
			setLoading(false);
			/* getAdminUsers().then((adminUsers) => {
				if (adminUsers.includes(user.uid)) {
					setLoading(false);
					setUserAdmin(true);
				} else {
					setLoading(false);
				}
			}); */
		} else {
			setLoggedIn(false);
			setLoading(false);
		}
	});

	useEffect(() => {
		if (user) {
			getAuth()
				.currentUser?.getIdTokenResult()
				.then((idTokenResult) => {
					if (idTokenResult.claims.admin) {
						setIsAdmin(true);
					}
				});
		}
	}, [user]);

	useEffect(() => {
		if (router.pathname.startsWith('/admin')) {
			setProtectedRoute(true);
		} else {
			setProtectedRoute(false);
		}
	}, []);

	async function getAdminUsers() {
		const q = query(collection(db, 'users'), where('role', '==', 'admin'));
		var adminUsers: any[] = [];
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			adminUsers.push(doc.data().id);
		});
		return adminUsers;
	}

	console.log(children.props);

	if (!loading) {
		if (!loggedIn && router.pathname !== '/login') {
			return (
				<>
					<NotLoggedIn />
				</>
			);
		} else if (!loggedIn && router.pathname === '/login') {
			return <>{children}</>;
		} else if (!isAdmin && protectedRoute) {
			return (
				<>
					<Unauthorized />
				</>
			);
		} else {
			return <>{children}</>;
		}
	} else {
		return <>Ladataan...</>;
	}
};

export default RedirectUnauthorized;
