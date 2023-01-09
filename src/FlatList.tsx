import React, { useEffect, useRef } from 'react';
import {
  FlatList as RNFlatList,
  FlatListProps,
  RefreshControl,
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
  const { layouts, flatListNodes, contentOffset, enableScroll, scrollHandler } =
    useCollapsibleTab();

  const id = useRef(Math.random()).current;

  const paddingTop = layouts.header.height + layouts.tabBar.height;
  const minHeight = layouts.container.height + layouts.header.height;

  useEffect(() => {
    props.isFocused && enableScroll(id);
  }, [props.isFocused]);

  return (
    <AnimatedFlatList
      bounces={false}
      overScrollMode="never"
      {...props}
      contentContainerStyle={[
        styles.list,
        props.contentContainerStyle,
        { minHeight, paddingTop },
      ]}
      ref={(node: any) => (flatListNodes[id] = node)}
      progressViewOffset={
        (props.progressViewOffset ?? 0) - contentOffset.value.y + paddingTop
      }
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
