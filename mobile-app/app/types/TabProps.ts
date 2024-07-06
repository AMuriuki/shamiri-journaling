import { ImageSourcePropType } from "react-native";

export interface TabIconProps {
    icon: ImageSourcePropType;
    color: string;
    name: string;
    focused: boolean;
}