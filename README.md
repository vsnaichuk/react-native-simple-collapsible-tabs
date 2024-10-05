# react-native-simple-collapsible-tabs

https://github.com/user-attachments/assets/1de11ab7-348e-454d-8cd7-a5b3eb261b4d

## Installation

```sh
npm install react-native-simple-collapsible-tabs
```

## Usage

```js
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { CollapsibleTab } from 'react-native-simple-collapsible-tabs';
import { Header, TabBar } from './components';

const Tab = createMaterialTopTabNavigator();

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
</CollapsibleTab.Container>;
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
