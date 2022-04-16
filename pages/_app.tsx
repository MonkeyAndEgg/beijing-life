import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store, wrapper } from "../redux/store";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider>
      <Provider store={store}>
        <Component {...pageProps}></Component>
      </Provider>
    </ChakraProvider>
  );
}

export default wrapper.withRedux(App);;