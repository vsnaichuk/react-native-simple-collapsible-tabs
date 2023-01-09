import React from 'react';
import { GestureResponderEvent, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { useCollapsibleTab } from './hooks';

export interface ICollapsibleTabTabButtonProps extends TouchableOpacityProps {
  isActive: boolean;
}

export function TabButton(props: ICollapsibleTabTabButtonProps) {
  const { fixScrolls, lockScrolls } = useCollapsibleTab();

  const { isActive, onPress } = props;

  const handlePress = (event: GestureResponderEvent) => {
    onPress?.(event);

    if (!isActive) {
      lockScrolls();
      fixScrolls();
    }
  };

  return <TouchableOpacity {...props} onPress={handlePress} />;
}
