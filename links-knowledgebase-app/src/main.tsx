import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { createTheme, MantineProvider } from "@mantine/core";
import App from "./App.js";
import "./index.css";

const theme = createTheme({
  /** Put your mantine theme override here */
});

const client = new ApolloClient({
  uri: "http://localhost:1337/graphql",

  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </MantineProvider>
  </React.StrictMode>
);
