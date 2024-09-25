import { ScrollView, Text, StyleSheet, View } from "react-native";
import Post from "./Post";

const posts = [
  {
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnubN9KhFSVdQl0XPTWD9yvlRViCZNoZqD1w&s",
    username: "Traveler",
    content: "Exploring ancient ruins in a distant land.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStQMytDId620LJq_k_GuoeMGX-3uOuZY321w&s",
  },
  {
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnubN9KhFSVdQl0XPTWD9yvlRViCZNoZqD1w&s",
    username: "Traveler",
    content: "Hiking up the beautiful mountains of the Himalayas!",
    image:
      "https://media.istockphoto.com/id/1371289822/sv/foto/himalayan-village-town-of-kalpa-with-kailash-mountain-snow-peaks-at-himachal-pradesh-india.jpg?s=612x612&w=0&k=20&c=hGLjVXGLMC8TLOYazMrYBxbYsaXBXaQ5l_W2o21Cmig=",
  },
  {
    avatar:
      "https://i.pinimg.com/236x/cd/cb/0c/cdcb0cb30bc700c53f12eff840156b29.jpg",
    username: "FoodieGal",
    content: "Just tried the most amazing sushi in Tokyo!",
    image:
      "https://novaworld.info/wp-content/uploads/2023/09/sg012_1376_26.jpg",
  },
  {
    avatar:
      "https://i.pinimg.com/236x/05/9a/6f/059a6f3e7a59ba3d2370a9a39b961982.jpg",
    username: "SkyWatcher",
    content:
      "Caught a glimpse of the northern lights last night. Breathtaking!",
    image:
      "https://vcdn1-dulich.vnecdn.net/2019/10/15/cuc-quang-vnexpress-6.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=o8_3ylzLA5yo9OS2SImNzA",
  },
  {
    avatar:
      "https://m.media-amazon.com/images/M/MV5BYWI3ODE3OTYtMWMzMS00OWY0LThkYWYtYTdjMmY0YjFlODAzXkEyXkFqcGc@._V1_QL75_UY281_CR31,0,500,281_.jpg",
    username: "TechGeek",
    content: "Excited about the new AI advancements at the tech conference.",
    image:
      "https://cafefcdn.com/203337114487263232/2023/12/19/ai-technology-cpu-central-processor-unit-chipset-big-data-machine-learning-cyber-mind-domination-generative-ai-scaled-1-1500x1000-1702977700134-1702977700212539167120.jpg",
  },
  {
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnubN9KhFSVdQl0XPTWD9yvlRViCZNoZqD1w&s",
    username: "Traveler",
    content: "Relaxing on the shores of Bali. The sunsets here are unreal.",
    image:
      "https://vcdn1-dulich.vnecdn.net/2019/08/27/KelingKing-Beach-Nusa-Penida-Bali-Indonesia-1566892638.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=Z-A_aMIqoXaDWb0KF0KLBg",
  },
];

function Media() {
  return (
    <ScrollView>
      <Text style={styles.title}>Social Media Feed</Text>
      <View style={styles.container}>
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </View>
    </ScrollView>
  );
}

export default Media;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f6f7f7",
    padding: 8,
  },
  title: {
    paddingVertical: 18,
    textAlign: "center",
    backgroundColor: "#3598db",
    color: "white",
    fontSize: 30,
    fontWeight: "600",
  },
});
