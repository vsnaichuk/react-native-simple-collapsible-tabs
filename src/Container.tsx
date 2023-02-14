import React from 'react';
import { ViewProps, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';

import { CollapsibleTabProvider } from './context';
import { useCollapsibleTab } from './hooks';

function ContainerInner(props: ViewProps) {
  const { rContainerStyle, onLayoutContainer } = useCollapsibleTab();

  return (
    <Animated.View
      {...props}
      style={[styles.container, props.style, rContainerStyle]}
      onLayout={onLayoutContainer}
    />
  );
}

export function Container(props: ViewProps) {
  return (
    <CollapsibleTabProvider>
      <ContainerInner {...props} />
    </CollapsibleTabProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden'
  },
});
