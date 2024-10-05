import { useIsFocused } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CollapsibleTab } from 'react-native-simple-collapsible-tabs';

const DATA = [
  {
    name: 'Auroora Gettins',
    value: 5.27,
  },
  {
    name: 'Lacey Arrol',
    value: 31.9,
  },
  {
    name: 'Jeno Pykett',
    value: 54.39,
  },
  {
    name: 'Julina Maunders',
    value: 92.77,
  },
  {
    name: 'Chane McGarel',
    value: 33.52,
  },
  {
    name: 'Micheil Ringwood',
    value: 12.38,
  },
  {
    name: 'Vidovic Gunston',
    value: 97.43,
  },
  {
    name: 'Grenville Dightham',
    value: 27.41,
  },
  {
    name: 'Edd Harmson',
    value: 49.53,
  },
  {
    name: 'Lacey Arrol',
    value: 31.9,
  },
  {
    name: 'Jeno Pykett',
    value: 54.39,
  },
  {
    name: 'Julina Maunders',
    value: 92.77,
  },
];

export function List() {
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();

  async function onRefresh() {
    setRefreshing(true);
    await new Promise((res) => setTimeout(res, 2000));
    setRefreshing(false);
  }

  return (
    <CollapsibleTab.FlatList
      isFocused={isFocused}
      contentContainerStyle={styles.contentContainer}
      data={DATA}
      keyExtractor={(_, index) => index.toString()}
      numColumns={1}
      removeClippedSubviews={true}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      refreshing={refreshing}
      onRefresh={onRefresh}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemValue}>{item.value.toFixed(2)}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: 16,
    marginTop: 16,
    paddingBottom: 40,
    backgroundColor: '#f8f9fa',
  },
  separator: {
    height: 1,
    backgroundColor: '#e9ecef',
    marginVertical: 8,
  },
  itemContainer: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#343a40',
  },
  itemValue: {
    fontSize: 16,
    color: '#495057',
  },
});
