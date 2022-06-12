import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import { store, wrapper } from "../redux/store";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider>
      <Provider store={store}>
        <Head>
          <link rel="shortcut icon" href="/beijing-life/favicon.ico" />
        </Head>
        <Component {...pageProps}></Component>
      </Provider>
    </ChakraProvider>
  );
}

export default wrapper.withRedux(App);;