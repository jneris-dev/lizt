import type { NextPage } from 'next';

import GlobalStyles from '../styles/global'

import { ThemeProvider } from 'styled-components';
import light from '../styles/themes/light';
import dark from '../styles/themes/dark';
import { useState } from 'react';

import { ToDoList } from '../components/ToDoList';
import { Header } from '../components/Header';

const Home: NextPage = () => {
	const [theme, setTheme] = useState('dark')

	function toggleTheme() {
		if (theme === 'light') {
			setTheme('dark');
		} else {
			setTheme('light');
		}
	}

	return (
		<ThemeProvider theme={theme === 'dark' ? dark : light}>
			<GlobalStyles />
			<main className="todoapp">
				<Header toggleTheme={toggleTheme} />
				<ToDoList />
			</main>
		</ThemeProvider>
	)
}

export default Home