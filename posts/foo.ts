import { useQuery, QueryClient } from "@tanstack/react-query";

const partialQuery = (id: number) => {
  return {
    queryKey: ["pokemon", id],
    runQuery: () =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) =>
        res.json()
      ),
  };
};

const queryRegistry = {
  partialQuery,
} satisfies Record<
  string,
  (...args: any[]) => { queryKey: unknown[]; runQuery: () => Promise<unknown> }
>;

const getClientQuery = (registryKey: keyof typeof queryRegistry) => {
  const registryEntry = queryRegistry[registryKey];
  return (...args: Parameters<typeof registryEntry>) => {
    const item = registryEntry(...args);
    return {
      queryKey: item.queryKey,
      runQuery: () => {
        item.runQuery();
      },
    };
  };
};

// Pass to any react-query hook/function
const _pokemon = useQuery(partialQuery());

const queryClient = new QueryClient();
queryClient.prefetchQuery(partialQuery());

// easily override as needed
const shouldGetPokemon = false;
const _pokemon2 = useQuery({
  ...partialQuery(),
  enabled: shouldGetPokemon,
});
