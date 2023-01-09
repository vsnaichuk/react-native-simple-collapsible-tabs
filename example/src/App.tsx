import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { StyleSheet, View, Text } from 'react-native';

export default function App() {
  const [result] = React.useState<number | undefined>();

  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Text>Result: {result}</Text>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
