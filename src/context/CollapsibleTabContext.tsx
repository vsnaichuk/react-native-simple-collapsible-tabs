import React, { createContext, ReactNode, useState } from 'react';
import type {
  LayoutChangeEvent,
  LayoutRectangle,
  NativeScrollPoint,
} from 'react-native';
import {
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

import type {
  ICollapsibleTabContext,
  ICollapsibleTabFlatListNodes,
  ICollapsibleTabScrollViewNodes,
  ICollapsibleTabScrollPositions,
  ICollapsibleTabLayout,
  CollapsibleTabLayoutsType,
  CollapsibleTabLayoutsNameType,
} from '../types';

export const CollapsibleTabContext = createContext<ICollapsibleTabContext>(
  {} as ICollapsibleTabContext
);

const flatListNodes: ICollapsibleTabFlatListNodes = {};
const scrollViewNodes: ICollapsibleTabScrollViewNodes = {};
const scrollPositions: ICollapsibleTabScrollPositions = {};

const DEFAULT_LAYOUT: ICollapsibleTabLayout = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
};

const DEFAULT_CONTENT_OFFSET: NativeScrollPoint = {
  x: 0,
  y: 0,
};

const DEFAULT_LAYOUTS: CollapsibleTabLayoutsType = {
  container: DEFAULT_LAYOUT,
  header: DEFAULT_LAYOUT,
  tabBar: DEFAULT_LAYOUT,
};

interface ICollapsibleTabProviderProps {
  children: ReactNode;
}

export function CollapsibleTabProvider({
  children,
}: ICollapsibleTabProviderProps) {
  const containerLayout = useSharedValue<ICollapsibleTabLayout>({
    ...DEFAULT_LAYOUT,
  });
  const headerLayout = useSharedValue<ICollapsibleTabLayout>({
    ...DEFAULT_LAYOUT,
  });
  const tabBarLayout = useSharedValue<ICollapsibleTabLayout>({
    ...DEFAULT_LAYOUT,
  });
  const contentOffset = useSharedValue<NativeScrollPoint>({
    ...DEFAULT_CONTENT_OFFSET,
  });

  const [layouts, setLayouts] = useState<CollapsibleTabLayoutsType>({
    ...DEFAULT_LAYOUTS,
  });

  const stateScrollPositions = (id: number, offset: NativeScrollPoint) => {
    scrollPositions[id] = offset;
  };

  const stateLayout = (
    name: CollapsibleTabLayoutsNameType,
    value: LayoutRectangle
  ) => {
    setLayouts((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onLayoutHeader = async (event: LayoutChangeEvent) => {
    const layout = event.nativeEvent.layout;

    headerLayout.value = layout;

    stateLayout('header', layout);
  };

  const onLayoutTabBar = async (event: LayoutChangeEvent) => {
    const layout = event.nativeEvent.layout;

    tabBarLayout.value = layout;

    stateLayout('tabBar', layout);
  };

  const onLayoutContainer = async (event: LayoutChangeEvent) => {
    const layout = event.nativeEvent.layout;

    containerLayout.value = layout;

    stateLayout('container', layout);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fixScrolls = (withOutId?: any) => {
    const getOffset = (ownPosition: number): number => {
      const offset =
        contentOffset.value.y >= headerLayout.value.height
          ? Math.max(ownPosition, headerLayout.value.height)
          : contentOffset.value.y;

      return offset;
    };

    Object.keys(flatListNodes)
      .filter((id) => id !== withOutId)
      .forEach((id) => {
        const node = flatListNodes[Number(id)];

        const ownPosition = scrollPositions[Number(id)]?.y ?? 0;

        const offset = getOffset(ownPosition) + 0.001;

        node?.scrollToOffset({ offset: offset, animated: false });
      });

    Object.keys(scrollViewNodes)
      .filter((id) => id !== withOutId)
      .forEach((id) => {
        const node = scrollViewNodes[Number(id)];

        const ownPosition = scrollPositions[Number(id)]?.y ?? 0;

        const offset = getOffset(ownPosition) + 0.001;

        node?.scrollTo({ y: offset, animated: false });
      });
  };

  const lockScrolls = () => {
    Object.values({ ...flatListNodes, ...scrollViewNodes }).forEach((node) => {
      node?.setNativeProps({ scrollEnabled: false });
    });
  };

  const enableScrolls = () => {
    Object.values({ ...flatListNodes, ...scrollViewNodes }).forEach((node) => {
      node?.setNativeProps({ scrollEnabled: true });
    });
  };

  const enableScroll = (id: number) => {
    const node = flatListNodes[id] || scrollViewNodes[id];

    node?.setNativeProps({ scrollEnabled: true });
  };

  const scrollHandler = (id: number) =>
    useAnimatedScrollHandler({
      onScroll: (event) => {
        contentOffset.value = event.contentOffset;

        runOnJS(stateScrollPositions)(id, event.contentOffset);
      },
      onEndDrag: () => runOnJS(fixScrolls)(id),
      onMomentumEnd: () => runOnJS(fixScrolls)(id),
    });

  const rContainerStyle = useAnimatedStyle(() => ({
    opacity: headerLayout.value.height
      ? withDelay(100, withTiming(1, { duration: 0 }))
      : 0,
  }));

  const rHeaderStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: -Math.min(headerLayout.value.height, contentOffset.value.y),
      },
    ],
  }));

  const rTabBarStyle = useAnimatedStyle(() => ({
    top: headerLayout.value?.height,
    transform: [
      {
        translateY: -Math.min(headerLayout.value.height, contentOffset.value.y),
      },
    ],
  }));

  return (
    <CollapsibleTabContext.Provider
      value={{
        rContainerStyle,
        rHeaderStyle,
        rTabBarStyle,
        layouts,
        flatListNodes,
        scrollViewNodes,
        contentOffset,
        containerLayout,
        headerLayout,
        tabBarLayout,
        onLayoutContainer,
        onLayoutHeader,
        onLayoutTabBar,
        fixScrolls,
        lockScrolls,
        enableScrolls,
        enableScroll,
        scrollHandler,
      }}
    >
      {children}
    </CollapsibleTabContext.Provider>
  );
}
