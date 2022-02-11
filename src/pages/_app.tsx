import type { AppProps } from 'next/app';

import '../service/firebase';
import { AuthContextProvider } from "../context/AuthContext";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<AuthContextProvider>
			<Component {...pageProps} />
		</AuthContextProvider>
	)
}
export default MyApp
