import React from 'react';
import { View, useWindowDimensions, StyleSheet } from 'react-native';
import { Ionicons, Feather, FontAwesome } from '@expo/vector-icons';
import Animated, { interpolate } from 'react-native-reanimated';
import type { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import { CollapsibleTab } from 'react-native-simple-collapsible-tabs';

const tabBarBorderBottomWidth = 1;
const tabBarLineHeight = 2;
const tabBarBottom = -1.5 * (tabBarLineHeight - tabBarBorderBottomWidth);

const styles = StyleSheet.create({
  tabBar: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopWidth: tabBarBorderBottomWidth,
    borderBottomWidth: tabBarBorderBottomWidth,
    borderColor: '#EFEFEF',
  },
  tabBarLine: {
    position: 'absolute',
    bottom: tabBarBottom,
    height: tabBarLineHeight,
    backgroundColor: '#000000',
  },
  tabBarButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarButtonIcon: {
    fontSize: 20,
  },

  optionBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  optionBarButton: {
    width: '30%',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: 5,
  },
  optionBarBlueButton: {
    backgroundColor: '#3A98F1',
    borderWidth: 0,
  },
  optionBarButtonText: {
    fontSize: 12,
    color: '#333333',
  },
  optionBarButtonWhiteText: {
    color: '#EFEFEF',
  },
});

const icons: { [name: string]: JSX.Element } = {
  Example1: <Ionicons style={styles.tabBarButtonIcon} name="grid-outline" />,
  Example2: <Feather style={styles.tabBarButtonIcon} name="camera" />,
  Example3: <FontAwesome style={styles.tabBarButtonIcon} name="user-o" />,
};

export function TabBar({ state, navigation }: MaterialTopTabBarProps) {
  const { width } = useWindowDimensions();
  const tabButtonWidth = width / state.routeNames.length;

  const translateX = interpolate(
    state.index,
    [0, 1, 2],
    [0, tabButtonWidth, 2 * tabButtonWidth]
  );

  return (
    <CollapsibleTab.TabBar>
      <View style={styles.tabBar}>
        <Animated.View
          style={[
            styles.tabBarLine,
            { width: tabButtonWidth, transform: [{ translateX }] },
          ]}
        />
        {state.routes.map(({ key, name }, index) => {
          const inputRange = state.routes.map((_, i) => i);

          const opacity = interpolate(
            state.index,
            inputRange,
            inputRange.map((i) => (i === index ? 1 : 0.7))
          );

          const isActive = index === state.index;

          return (
            <CollapsibleTab.TabButton
              key={key}
              style={styles.tabBarButton}
              isActive={isActive}
              activeOpacity={1}
              onPress={() => navigation.navigate(name)}
            >
              <Animated.View style={{ opacity }}>{icons[name]}</Animated.View>
            </CollapsibleTab.TabButton>
          );
        })}
      </View>
    </CollapsibleTab.TabBar>
  );
}
