import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';

import GlobalStyles from '../styles/global'

import { ThemeProvider } from 'styled-components';
import light from '../styles/themes/light';
import dark from '../styles/themes/dark';

import { ToDoList } from '../components/ToDoList';
import { Header } from '../components/Header';

const Home: NextPage = () => {
	const [theme, setTheme] = useState('dark');
	const themeMode = theme === 'light' ? light : dark;

	function toggleTheme() {
		theme === 'dark' ? setMode('light') : setMode('dark');
	}

	function setMode(mode: string) {
		window.localStorage.setItem('theme', mode);
		setTheme(mode);
	}

	useEffect(() => {
		const localTheme = window.localStorage.getItem('theme');
		localTheme ? setTheme(localTheme) : setMode('dark');
	}, []);

	return (
		<ThemeProvider theme={themeMode}>
			<Head>
				<title>Lizt - Simple To-do List</title>
			</Head>
			<GlobalStyles />
			<main className="todoapp">
				<Header theme={theme} toggleTheme={toggleTheme} />
				<ToDoList />
			</main>
		</ThemeProvider>
	)
}

export default Home;