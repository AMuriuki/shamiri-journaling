import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Image, FlatList, TouchableOpacity } from "react-native";

import icons from "@/constants/icons";
import InfoBox from "@/components/InfoBox"
import EmptyState from "@/components/EmptyState";
import { useUser } from "@/contexts/UserProvider";
import { EntryType } from "@/types/Entry";

const Profile = () => {
  const { user, setUser, setIsLogged, logout } = useUser();

  const hanleLogout = async () => {
    setIsLogged(false);
    logout();
    router.replace("/signIn");
  };

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
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={entries}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <>
          </>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No entries Found"
            subtitle="You don't have any journal entries yet"
          />
        )}
        ListHeaderComponent={() => (
          <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              onPress={hanleLogout}
              className="flex w-full items-end mb-10"
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>

            <InfoBox
              title={user?.username}
              containerStyles="mt-5"
              titleStyles="text-lg"
            />

            <View className="mt-5 flex flex-row">
              <InfoBox
                title={entries.length.toString() || "0"}
                subtitle="Entries"
                titleStyles="text-xl"
              />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
