import type { NextPage } from 'next';

import { ToDoList } from '../components/ToDoList';

const Home: NextPage = () => {
	return (
		<main className="todoapp">
			<ToDoList />
		</main>
	)
}

export default Home