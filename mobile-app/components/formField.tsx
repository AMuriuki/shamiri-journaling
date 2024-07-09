import { View, Text, TextInput, TouchableOpacity, Image, Button } from 'react-native'
import React, { useState } from 'react'
import { FormFieldProps } from '@/types/FormField'
import icons from '@/constants/icons'
import { Picker } from '@react-native-picker/picker'
import DateTimePicker from '@react-native-community/datetimepicker';

const FormField: React.FC<FormFieldProps> = ({ title, value, placeHolder, handleTextChange, otherStyles, maxLength, fieldType, options, ...props }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [inputValue, setInputValue] = useState(value || "");
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const remainingChars = maxLength ? maxLength - inputValue.length : null;

    const onDateChange = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || new Date();
        setShowDatePicker(false);
        handleTextChange(currentDate)
    }

    const handleInputChange = (text: string) => {
        if (!maxLength || text.length <= maxLength) {
            setInputValue(text);
            handleTextChange(text);
        }
    }

    const handleSelectChange = (value: string) => {
        handleTextChange(value);
        const _selectedCategory = options.find((item: any) => item.id === value);
        setSelectedCategory(_selectedCategory ? _selectedCategory.title : null);
    }

    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <Text className='text-base text-gray-500 font-pmedium'>{title}</Text>

            {fieldType === "select" && (
                <>
                    <View className='w-full h-16 px-4 rounded-2xl border-2 border-gray-100 focus:border-secondary'>
                        <Picker
                            selectedValue={value}
                            onValueChange={handleSelectChange}
                            style={{ color: 'black' }}
                            dropdownIconColor="black"
                        >
                            <Picker.Item label='Select a category' value="" />
                            {options.map((item: any) => (
                                <Picker.Item key={item.id} label={item.title} value={item.id} />
                            ))}
                        </Picker>
                    </View>
                    {selectedCategory && (
                        <Text className='mt-3 text-primary font-sm font-psemibold'>
                            Selected Category: {selectedCategory}
                        </Text>
                    )}
                </>
            )}

            {fieldType === "date" && (
                <>
                    <View className='w-full h-16 px-4 rounded-2xl border-2 border-gray-100 focus:border-secondary flex flex-row items-center'>
                        <Text className='flex-1 text-primary font-psemibold text-base'>
                            {value ? new Date(value).toDateString() : 'Select a date'}
                        </Text>
                        <Button title='Select Date' onPress={() => setShowDatePicker(true)} />
                    </View>
                    {showDatePicker && (
                        <DateTimePicker
                            value={value ? new Date(value) : new Date()}
                            mode='date'
                            display='default'
                            onChange={onDateChange}
                        />
                    )}
                </>
            )}

            {fieldType === "input" && (
                <>
                    <View className='w-full h-16 px-4 rounded-2xl border-2 border-gray-100 focus:border-secondary flex flex-row items-center'>
                        <TextInput
                            className='flex-1 text-primary font-psemibold text-base'
                            value={value}
                            placeholder={placeHolder}
                            placeholderTextColor='#7B7B8B'
                            onChangeText={handleInputChange}
                            secureTextEntry={title === 'Password' && !showPassword}
                            maxLength={maxLength}
                            {...props}
                        />

                        {title === "Password" && (
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                <Image
                                    source={!showPassword ? icons.eye : icons.eyeHide}
                                    className='w-6 h-6'
                                    resizeMode='contain'
                                />
                            </TouchableOpacity>
                        )}
                    </View>
                    {maxLength && inputValue.length > 0 && (
                        <Text className='text-sm text-gray-300 fontpmedium'>
                            {remainingChars} characters remaining
                        </Text>
                    )}
                </>
            )}
        </View>
    );
}

export default FormField