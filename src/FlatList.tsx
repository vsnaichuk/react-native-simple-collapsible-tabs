import React, { useEffect, useMemo, useRef } from 'react';
import {
  FlatList as RNFlatList,
  FlatListProps,
  Platform,
  StyleSheet,
} from 'react-native';
import Animated from 'react-native-reanimated';

import { useCollapsibleTab } from './hooks';

// TODO: Fix type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ICollapsibleTabFlatListProps extends FlatListProps<any> {
  isFocused: boolean;
}

const AnimatedFlatList = Animated.createAnimatedComponent(RNFlatList);

export function FlatList(props: ICollapsibleTabFlatListProps) {
  const { layouts, flatListNodes, enableScroll, scrollHandler } =
    useCollapsibleTab();

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
    <AnimatedFlatList
      {...props}
      contentContainerStyle={[
        styles.contentContainerStyle,
        props.contentContainerStyle,
        listStyles.contentContainerStyle,
      ]}
      ref={(node: any) => (flatListNodes[id] = node)}
      progressViewOffset={listStyles.progressViewOffset}
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
