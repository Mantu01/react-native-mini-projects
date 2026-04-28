import { ImageBackground, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Index() {
  return (
    <ImageBackground
      source={{uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9O-M3JIR3wVyuzN9TIK9uthyLUMR7YZ4DRdBykWqwHg&s"}}
      resizeMode="cover"
      className="flex-1"
    >
      <StatusBar barStyle="light-content" />
      <View className="flex-1 bg-black/60 justify-center px-6">
        <View className="bg-white/10 border border-orange-400/30 rounded-3xl p-6 backdrop-blur-3xl">
          <Text className="text-white text-4xl font-bold mb-2">Welcom Back</Text>
          <Text className="text-gray-300 mb-6">Login To continue</Text>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#ccc"
            className="bg-white/10 text-white px-4 py-3 rounded-xl mb-4 border border-white/10"
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#ccc"
            secureTextEntry
            className="bg-white/10 text-white px-4 py-3 rounded-xl mb-4 border border-white/10"
          />
          <TouchableOpacity className="bg-green-500 py-3 rounded-xl">
            <Text className="text-white text-center text-lg font-semibold">Login</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text className="text-gray-400 text-center mt-5">Forgot Password</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}
