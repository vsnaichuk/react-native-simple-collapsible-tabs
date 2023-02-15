import React, { useEffect, useMemo, useRef } from 'react';
import {
  ScrollView as RNScrollView,
  ScrollViewProps,
  StyleSheet,
  Platform,
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
    enableScroll,
    scrollHandler,
  } = useCollapsibleTab();

  const id = useRef(Math.random()).current;

  useEffect(() => {
    props.isFocused && enableScroll(id);
  }, [props.isFocused]);

  const listStyles = useMemo(() => ({
    contentContainerStyle: {
      paddingTop:(layouts.header.height || 0) + (layouts.tabBar.height || 0),
      minHeight: (layouts.container.height || 0) + (layouts.header.height || 0),
    },
    progressViewOffset:
      // on iOS we need the refresh control to be at the top
      Platform.OS === 'ios'
        ? 0
        : // on android we need it below the header or it doesn't show because of z-index
          (layouts.header.height || 0) + (layouts.tabBar.height || 0),
  }),
  [
    layouts.container.height,
    layouts.header.height,
    layouts.tabBar.height
  ]);

  const listRefreshControl = useMemo(
    () =>
      props.refreshControl &&
      React.cloneElement(props.refreshControl, {
        progressViewOffset: listStyles.progressViewOffset,
        ...props.refreshControl.props,
      }),
    [listStyles.progressViewOffset, props.refreshControl]
  );

  return (
    <AnimatedScrollView
      bounces={false}
      overScrollMode="never"
      {...props}
      contentContainerStyle={[
        styles.contentContainerStyle,
        props.contentContainerStyle,
        listStyles.contentContainerStyle,
      ]}
      ref={(node: any) => (scrollViewNodes[id] = node)}
      scrollEventThrottle={1}
      refreshControl={listRefreshControl}
      onScroll={scrollHandler(id)}
    />
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
  },
});
