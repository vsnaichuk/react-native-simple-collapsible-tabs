/* eslint-disable @typescript-eslint/no-empty-interface */
import type {
  FlatList,
  ScrollView,
  NativeScrollEvent,
  NativeScrollPoint,
  NativeSyntheticEvent,
  StyleProp,
  ViewStyle,
  LayoutRectangle,
  LayoutChangeEvent,
} from 'react-native';
import type { SharedValue } from 'react-native-reanimated';

export interface ICollapsibleTabLayout extends LayoutRectangle {}

export type CollapsibleTabLayoutsNameType = 'container' | 'header' | 'tabBar';

export type CollapsibleTabLayoutsType = {
  [key in CollapsibleTabLayoutsNameType]: ICollapsibleTabLayout;
};

export interface ICollapsibleTabContext {
  rContainerStyle: StyleProp<ViewStyle>;
  rHeaderStyle: StyleProp<ViewStyle>;
  rTabBarStyle: StyleProp<ViewStyle>;
  layouts: CollapsibleTabLayoutsType;
  flatListNodes: ICollapsibleTabFlatListNodes;
  scrollViewNodes: ICollapsibleTabScrollViewNodes;
  contentOffset: SharedValue<NativeScrollPoint>;
  containerLayout: SharedValue<ICollapsibleTabLayout>;
  headerLayout: SharedValue<ICollapsibleTabLayout>;
  tabBarLayout: SharedValue<ICollapsibleTabLayout>;
  onLayoutContainer: (event: LayoutChangeEvent) => void;
  onLayoutHeader: (event: LayoutChangeEvent) => void;
  onLayoutTabBar: (event: LayoutChangeEvent) => void;
  fixScrolls: () => void;
  lockScrolls: () => void;
  enableScrolls: () => void;
  enableScroll: (id: number) => void;
  scrollHandler: (
    id: number
  ) => (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

export interface ICollapsibleTabFlatListNodes {
  // TODO: Fix type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [name: number]: FlatList<any> | null;
}

export interface ICollapsibleTabScrollViewNodes {
  [name: number]: ScrollView | null;
}

export interface ICollapsibleTabScrollPositions {
  [name: number]: NativeScrollPoint;
}
