import { View, Text, FlatList, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '@/constants/images';
import EmptyState from '@/components/EmptyState';
import EntryCard from '@/components/EntryCard';
import { CategoryType, EntryType } from '@/types/Entry';
import CategoryCard from '@/components/CategoryCard';
import { useUser } from '@/contexts/UserProvider';
import { useApi } from '@/contexts/ApiProvider';


const Home = () => {
  const { user } = useUser();
  const api = useApi();

  const [entries, setEntries] = useState<EntryType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const entriesResponse = await api.get(`/user/${user?.id}/entries`);
      if (entriesResponse.ok) {
        setEntries(entriesResponse.body.data);
      } else {
        setEntries([]);
      }

      const categoriesResponse = await api.get('/categories');
      if (categoriesResponse.ok) {
        setCategories(categoriesResponse.body.data);
      } else {
        setCategories([]);
      }
    })();
  }, [api, user]);

  const filteredEntries = selectedCategory ? entries.filter(entry => entry.category.title === selectedCategory) : entries;

  const handleSelectCategory = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category)
    }
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        data={filteredEntries}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <EntryCard
            key={item.id}
            title={item.title}
            content={item.content}
            category={item.category.title}
            date={item.date}
          />
        )}
        ListHeaderComponent={() => (
          <View className='flex my-6 px-4 space-y-6'>
            <View className='flex justify-between items-start flex-row mb-6'>
              <View>
                <Text className='font-pmedium text-sm text-gray-100'>
                  Welcome Back
                </Text>
                <Text className='text-2xl font-psemibold text-white'>
                  {user ? user.username : ""}
                </Text>
              </View>
              <View>
                <Image
                  source={images.logo}
                  className="w-9 h-10"
                  resizeMode='contain'
                />
              </View>
            </View>
            <View className="w-full flex-1">
              <Text className="text-lg font-pregular text-gray-100 mb-3">
                Categories
              </Text>
              <CategoryCard
                categories={categories}
                onSelectCategory={handleSelectCategory}
                selectedCategory={selectedCategory}
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title='No entries found'
            subtitle='Start your journaling journey'
          />
        )}
      />
    </SafeAreaView>
  )
}

export default Home