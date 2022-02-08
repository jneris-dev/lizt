import type { AppProps } from 'next/app';

import '../service/firebase';
import { AuthContextProvider } from "../context/AuthContext";

import GlobalStyles from '../styles/global'
import { ThemeProvider } from 'styled-components';
import light from '../styles/themes/light';
import dark from '../styles/themes/dark';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <ThemeProvider theme={light}>
        <GlobalStyles />
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthContextProvider>
  )
}
export default MyApp
