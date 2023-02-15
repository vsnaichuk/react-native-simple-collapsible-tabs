import React, { useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';

import {
  CollapsibleTab,
} from 'react-native-simple-collapsible-tabs';

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
      renderItem={() => (
        <View
          style={{
            width: 400,
            height: 400,
            backgroundColor: 'lightgreen',
          }}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 1,
    paddingBottom: 2,
  },
  separator: {
    paddingTop: 16
  }
});
