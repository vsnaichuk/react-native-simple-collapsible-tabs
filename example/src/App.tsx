import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { StyleSheet, View, Text } from 'react-native';
import { multiply } from 'react-native-simple-collapsible-tabs';

export default function App() {
  const [result, setResult] = React.useState<number | undefined>();

  React.useEffect(() => {
    multiply(3, 7).then(setResult);
  }, []);

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
