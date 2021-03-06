import * as React from "react";
import { Text, Image, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import RNBounceable from "@freakycoder/react-native-bounceable";
/**
 * ? Local Imports
 */
import styles, {
  _storyRing,
  _profileImageStyle,
  _notificationContainer,
} from "./IGStoryCircle.style";

type IProps = {
  size?: number;
  source: any;
  hasStory?: boolean;
  insertStoryTop?: number;
  innerCircleSize?: number;
  insertStoryStart?: number;
  notificationCount?: number;
  profileImageBorderSize?: number;
  notificationSize?: number;
  notificationPositionTop?: number;
  notificationPositionLeft?: number;
  storyRingColor?: [string, string];
  defaultRingColor?: [string, string];
  notificationBubbleBackgroundColor?: string;
  innerBorderColor: string;
  onPress: () => void;
} & typeof defaultProps 

const defaultProps = {
  notificationSize: 18,
  innerBorderColor: "#000",
  defaultRingColor: ["#000", "#000"],
  storyRingColor: ["#feda75", "#d62976"],
  notificationBubbleBackgroundColor: "#eb3434",
};


const IGStoryCircle = (props: IProps) => {
  const {
    size = 64,
    source,
    onPress,
    hasStory,
    innerCircleSize,
    notificationSize,
    defaultRingColor,
    innerBorderColor,
    notificationCount,
    storyRingColor,
    profileImageBorderSize,
    notificationPositionTop,
    notificationPositionLeft,
    notificationBubbleBackgroundColor,
  } = props;

  const borderSize = (size * 6) / 100;
  const innerBorderSize = (size * 3) / 100;
  const defaultNotificationPositionTop = size / 12;
  const defaultNotificationPositionLeft = (size * 9) / 12;

  const generateRingColor = (): [string, string] => {
    if (hasStory) return storyRingColor;
    else return defaultRingColor;
  };

  const renderNotificationCount = () =>
    notificationCount && (
      <View
        style={_notificationContainer(
          notificationSize,
          notificationBubbleBackgroundColor,
          notificationPositionTop || defaultNotificationPositionTop,
          notificationPositionLeft || defaultNotificationPositionLeft,
        )}
      >
        <Text style={styles.notificationText}>{notificationCount}</Text>
      </View>
    );

  const renderIGCircle = () => (
    <LinearGradient
      style={_storyRing(size)}
      colors={generateRingColor()}
      start={{ x: 0.0, y: 1.0 }}
      end={{ x: 1.0, y: 1.0 }}
    >
      <Image
        source={source}
        style={_profileImageStyle(
          innerCircleSize || size - borderSize,
          profileImageBorderSize || hasStory ? innerBorderSize : 0,
          innerBorderColor,
        )}
      />
    </LinearGradient>
  );

  return (
    <RNBounceable onPress={onPress}>
      <View style={styles.container}>
        {renderIGCircle()}
        {renderNotificationCount()}
      </View>
    </RNBounceable>
  );
};

IGStoryCircle.defaultProps = defaultProps

export default IGStoryCircle;
