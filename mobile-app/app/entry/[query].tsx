import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApi } from '@/contexts/ApiProvider';
import { EntryType } from '@/types/Entry';

const Entry = () => {
  const { query } = useLocalSearchParams();
  const api = useApi();

  const [entry, setEntry] = useState<EntryType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const response = await api.get(`/entry/${query}`);

        if (response.ok) {
          setEntry(response.body);
        } else {
          setEntry(null);
        }
      } catch (error) {
        console.error('Error fetching entry:', error);
        setEntry(null);
      } finally {
        setLoading(false);
      }
    };

    fetchEntry();
  }, [api, query]);

  return (
    <SafeAreaView className='bg-primary h-full flex-1 px-16 pt-16'>
      {loading ? (
        <View className='flex-1 justify-center items-center'>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      ) : entry && entry !== undefined ? (
        <View className='flex-1 justify-center flex-start'>
          <Text className='font-pbold mb-8 text-white text-3xl'>
            {entry.title}
          </Text>
        </View>
      ) : (
        <View className='flex-1 justify-center items-center'>
          <Text className='text-red'>Failed to load entry</Text>
        </View>
      )}
    </SafeAreaView>
  )
}

export default Entry