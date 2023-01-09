import * as React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { CollapsibleTab } from 'react-native-simple-collapsible-tabs'
import { Header, List, TabBar } from './components';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <CollapsibleTab.Container>
            <Header />
            <Tab.Navigator
              tabBar={(props) => <TabBar {...props} />}
              initialRouteName="Example1"
            >
              <Tab.Screen name="Example1" component={List} />
              <Tab.Screen name="Example2" component={List} />
              <Tab.Screen name="Example3" component={List} />
            </Tab.Navigator>
          </CollapsibleTab.Container>
        </SafeAreaView>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Platform.OS === 'web' ? '100vh' : '100%'
  },
});
