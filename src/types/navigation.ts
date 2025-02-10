import type {
  BottomTabBarButtonProps,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import type {
  NavigatorScreenParams,
  CompositeScreenProps,
} from '@react-navigation/native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  HomeTabs: undefined;
  Task: {
    taskId: string;
  };
};

export type TabParamList = {
  Home: NavigatorScreenParams<RootStackParamList>;
  AddNew: undefined;
  Calender: undefined;
};

export interface TabButtonProps extends BottomTabBarButtonProps {
  title: string;
  iconName: 'house' | 'calendar-days';
}

export type TabNavigationProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamList>,
  NativeStackScreenProps<RootStackParamList>
>;

export type AddNewScreenProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'AddNew'>,
  NativeStackScreenProps<RootStackParamList>
>;
