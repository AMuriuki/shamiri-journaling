import { Text, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import { CategoryCardProps } from '@/types/Entry';



const CategoryCard: React.FC<CategoryCardProps> = ({ categories, onSelectCategory, selectedCategory }) => {
    return (
        <FlatList
            data={categories}
            horizontal
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <TouchableOpacity
                    className={`bg-gray-800 rounded-lg p-4 mr-4 ${selectedCategory === item.title ? 'bg-secondary' : 'bg-gray-800'}`}
                    onPress={() => onSelectCategory(item.title)}
                >
                    <Text className="text-white font-semibold">{item.title}</Text>
                </TouchableOpacity>
            )}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
        />
    );
}

export default CategoryCard;
