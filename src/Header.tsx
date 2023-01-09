import React, { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';

import { useCollapsibleTab } from './hooks';

export interface ICollapsibleTabHeaderProps {
  children?: ReactNode | Animated.Node<ReactNode>;
}

export function Header(props: ICollapsibleTabHeaderProps) {
  const { rHeaderStyle, onLayoutHeader } = useCollapsibleTab();

  return (
    <Animated.View
      {...props}
      style={[styles.container, rHeaderStyle]}
      pointerEvents="box-none"
      onLayout={onLayoutHeader}
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
