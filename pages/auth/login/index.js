import { useState } from 'react';
import styles from '/styles/Auth.module.css';
import Head from 'next/head';
import firebase_app from "/utils/firebaseconfig.js";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

const auth = getAuth(firebase_app);

export default function Auth() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = async () => {
		let result = null,
			error = null;
		try {
			result = await signInWithEmailAndPassword(auth, email, password);
		} catch (e) {
			error = e;
		}

		if (!error) {
			window.location = "/";
		}
		console.log({ result, error });
	};

	return (
		<div className={styles.Auth}>
			<Head>
				<title>Log in | Personalised ChatGPT for your brand</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>


			<div className={styles.wrapper}>
				<strong>Login to CeladonAI</strong>
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className={styles.input}
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className={styles.input}
				/>
				<button onClick={handleLogin} className={styles.button}>
					Login
				</button>
				<p>Don't have an account? <a href='/auth/signup'>Sign up</a> instead</p>
			</div>
		</div>
	);
}