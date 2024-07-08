import { View, Text, FlatList, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '@/constants/images';
import EmptyState from '@/components/EmptyState';
import EntryCard from '@/components/EntryCard';
import { EntryType } from '@/types/Entry';


const Home = () => {
  const entries: EntryType[] = [
    {
      id: 1,
      title: "Morning Meditation",
      content: "Started the day with a calming meditation session. Felt more focused and centered afterwards.",
      category: "Wellness",
      date: "2024-07-08",
    },
    {
      id: 2,
      title: "Lunch with Friends",
      content: "Had a delightful lunch with friends at a new restaurant downtown. Enjoyed catching up and laughing together.",
      category: "Social",
      date: "2024-07-07",
    },
    {
      id: 3,
      title: "Coding Breakthrough",
      content: "Finally solved a complex bug that had been elusive for days. Celebrating this victory!",
      category: "Work",
      date: "2024-07-06",
    },
    {
      id: 4,
      title: "Nature Walk",
      content: "Took a peaceful walk in the park surrounded by lush greenery. It was refreshing and rejuvenating.",
      category: "Outdoors",
      date: "2024-07-05",
    },
    {
      id: 5,
      title: "Movie Night",
      content: "Watched a classic movie with family. Enjoyed popcorn and laughter throughout the night.",
      category: "Family",
      date: "2024-07-04",
    },
  ];

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        data={entries}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <EntryCard
            key={item.id}
            title={item.title}
            content={item.content}
            category={item.category}
            date={item.date}
          />
        )}
        ListHeaderComponent={() => (
          <View className='my-6 px-4 space-y-6'>
            <View className='flex justify-between items-start flex-row mb-6'>
              <View>
                <Text className='font-pmedium text-sm text-gray-100'>
                  Welcome Back
                </Text>
                <Text className='text-2xl font-psemibold text-white'>
                  Nderitu Muriuki
                </Text>
              </View>
              <View className='mt-1.5'>
                <Image
                  source={images.logo}
                  className="w-9 h-10"
                  resizeMode='contain'
                />
              </View>
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