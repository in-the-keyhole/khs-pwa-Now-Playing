import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
	uri: "https://movies.keyhole.institute/graphql",
	cache: new InMemoryCache()
});

const ClientProvider = ({ children }) => {
	return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ClientProvider 