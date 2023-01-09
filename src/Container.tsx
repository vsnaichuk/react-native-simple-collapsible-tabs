import React from 'react';
import type { ViewProps } from 'react-native';
import Animated from 'react-native-reanimated';

import { globalStyles } from './styles';
import { CollapsibleTabProvider } from './context';
import { useCollapsibleTab } from './hooks';

function ContainerInner(props: ViewProps) {
  const { rContainerStyle, onLayoutContainer } = useCollapsibleTab();

  return (
    <Animated.View
      {...props}
      style={[globalStyles.wrapper, props.style, rContainerStyle]}
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
