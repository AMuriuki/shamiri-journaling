import { TextInputProps } from "react-native";

export interface FormFieldProps extends TextInputProps {
    title: string;
    value: string;
    placeHolder?: string;
    handleTextChange: (text: string) => void;
    otherStyles?: string;
}