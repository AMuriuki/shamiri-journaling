import { InfoBoxProps } from "@/types/InfoBox";
import { View, Text } from "react-native";

const InfoBox: React.FC<InfoBoxProps> = ({ title, subtitle, containerStyles, titleStyles }) => {
    return (
        <View className={containerStyles}>
            <Text className={`text-primary text-center font-psemibold ${titleStyles}`}>
                {title}
            </Text>
            <Text className="text-sm text-gray-500 text-center font-pregular">
                {subtitle}
            </Text>
        </View>
    );
};

export default InfoBox;
