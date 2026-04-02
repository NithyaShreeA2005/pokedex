import { useEffect, useState } from "react";
import { Image, ScrollView, Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";

interface Pokemon {
  name: string;
  url?: string;
  image?: string;
  imageBack?: string;
  types?: PokemonType[];
}

interface PokemonType {
  type: {
    name: string;
    url: string;
  };
}

const colorByType: Record<string, string> = {
  grass: "green",
  fire: "orange",
  water: "blue",
  bug: "lightgreen",
};

export default function Index() {
  const [Pokemons, setPokemons] = useState<Pokemon[]>([]);

  console.log(JSON.stringify(Pokemons[0], null, 2));

  useEffect(() => {
    fetchPokemons();
  }, []);

  async function fetchPokemons() {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon/?limit=10"
      );
      const data = await response.json();

      const detailedPokemons = await Promise.all(
        data.results.map(async (pokemon: Pokemon) => {
          const res = await fetch(pokemon.url!);
          const details = await res.json();
          return {
            name: pokemon.name,
            image: details.sprites.front_default,
            imageBack: details.sprites.back_default,
            types: details.types,
          };
        })
      );

      setPokemons(detailedPokemons);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <ScrollView>
      {Pokemons.map((pokemon: Pokemon) => (
        <Link
          key={pokemon.name}
          href={{
            pathname: "/details",
            params: { name: pokemon.name },
          }}
        >
          <View
            style={{
              // @ts-ignore
              backgroundColor:
                pokemon.types && pokemon.types.length > 0
                  ? colorByType[pokemon.types[0].type.name]
                  : "gray",
              padding: 10,
              margin: 10,
            }}
          >
            <Text style={styles.name}>{pokemon.name}</Text>

            {pokemon.types && pokemon.types.length > 0 && (
              <Text style={styles.type}>
                {pokemon.types[0].type.name}
              </Text>
            )}

            <View style={{ flexDirection: "row" }}>
              <Image
                source={{ uri: pokemon.image }}
                style={{ width: 100, height: 100 }}
              />
            </View>
          </View>
        </Link>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 28,
    fontWeight: "bold",
  },
  type: {
    fontSize: 20,
    fontWeight: "bold",
    color: "gray",
  },
});