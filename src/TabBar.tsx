import React, { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';

import { useCollapsibleTab } from './hooks';

export interface ICollapsibleTabTabBarProps {
  children?: ReactNode | Animated.Node<ReactNode>;
}

export function TabBar(props: ICollapsibleTabTabBarProps) {
  const { rTabBarStyle, onLayoutTabBar } = useCollapsibleTab();

  return (
    <Animated.View
      {...props}
      style={[styles.container, rTabBarStyle]}
      onLayout={onLayoutTabBar}
    />
  );
}


const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    zIndex: 1,
  },
});
