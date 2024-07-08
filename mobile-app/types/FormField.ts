import { TextInputProps } from "react-native";

export interface FormFieldProps extends TextInputProps {
    title: string;
    value: any;
    placeHolder?: string;
    handleTextChange: (value: any) => void;
    otherStyles?: string;
    maxLength?: number;
    fieldType: string;
    options?: any;
}