import { ScrollView, StyleSheet, Text } from "react-native";
import { useEffect } from "react";
import { useLocalSearchParams, Stack } from "expo-router";

export default function Details() {
  const params = useLocalSearchParams();

  console.log(params.name);

  useEffect(() => {
    // you can fetch data here later
  }, [params.name]);

  async function fetchPokemonByName(name: string) {}

  return (
    <>
      <Stack.Screen options={{ title: params.name as string }} />

      <ScrollView
        contentContainerStyle={{
          gap: 16,
          padding: 16,
        }}
      >
        <Text>{params.name}</Text>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({});