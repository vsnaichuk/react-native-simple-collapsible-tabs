import React, { useEffect, useRef } from 'react';
import {
  ScrollView as RNScrollView,
  ScrollViewProps,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import Animated from 'react-native-reanimated';

import { useCollapsibleTab } from './hooks';

// TODO: Fix type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ICollapsibleTabScrollViewProps extends ScrollViewProps {
  isFocused: boolean;
}

const AnimatedScrollView = Animated.createAnimatedComponent(RNScrollView);

export function ScrollView(props: ICollapsibleTabScrollViewProps) {
  const {
    layouts,
    scrollViewNodes,
    contentOffset,
    enableScroll,
    scrollHandler,
  } = useCollapsibleTab();

  const id = useRef(Math.random()).current;

  const paddingTop = layouts.header.height + layouts.tabBar.height;
  const minHeight = layouts.container.height + layouts.header.height;

  useEffect(() => {
    props.isFocused && enableScroll(id);
  }, [props.isFocused]);

  return (
    <AnimatedScrollView
      bounces={false}
      overScrollMode="never"
      {...props}
      contentContainerStyle={[
        styles.list,
        props.contentContainerStyle,
        { minHeight, paddingTop },
      ]}
      ref={(node: any) => (scrollViewNodes[id] = node)}
      scrollEventThrottle={1}
      refreshControl={
        props.refreshControl ? (
          <RefreshControl
            {...props.refreshControl?.props}
            progressViewOffset={
              (props.refreshControl?.props?.progressViewOffset ?? 0) -
              contentOffset.value.y +
              paddingTop
            }
          />
        ) : undefined
      }
      onScroll={scrollHandler(id)}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flexGrow: 1,
  },
});
