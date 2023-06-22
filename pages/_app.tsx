import '../public/antd.min.css';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from "react-redux";


import withTheme from '../theme';
import Layout from '../components/core/layout/Layout';
import store from '../store';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        {withTheme(<Component {...pageProps} />)}
      </Layout>
    </Provider>

  )
}
