import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import { store, wrapper } from "../redux/store";
import { BASE_PATH } from "../src/constants/app";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider>
      <Provider store={store}>
        <Head>
          <link rel="shortcut icon" href={`${BASE_PATH}/favicon.ico`} />
        </Head>
        <Component {...pageProps}></Component>
      </Provider>
    </ChakraProvider>
  );
}

export default wrapper.withRedux(App);;