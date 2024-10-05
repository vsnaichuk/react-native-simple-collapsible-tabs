import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CollapsibleTab } from 'react-native-simple-collapsible-tabs';

export function Header() {
  return (
    <CollapsibleTab.Header>
      <View style={styles.container} pointerEvents="box-none">
        <Text>Collapsible</Text>
      </View>
    </CollapsibleTab.Header>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 200,
    backgroundColor: '#FF6F61',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
