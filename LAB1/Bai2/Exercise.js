import {
  View,
  Text,
  ScrollView,
  FlatList,
  SectionList,
  StyleSheet,
  ImageBackground,
} from "react-native";
import Item from "./Item";
import { fruits_vegetables, workouts } from "./data";
import { useState } from "react";
function Exercise() {
  const [exercises, setExercises] = useState([]);
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>FlatList - Workouts</Text>
      <ImageBackground
        source={{
          uri: "https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2021/02/Full-body-workout-training-program.jpg?fit=2208%2C1474&ssl=1",
        }}
        style={styles.background}
      >
        <ScrollView contentContainerStyle={styles.list}>
          <FlatList
            data={workouts}
            renderItem={({ item }) => (
              <Item name={item.type} onSelect={setExercises} />
            )}
            keyExtractor={(item) => item.id}
          />
        </ScrollView>
      </ImageBackground>
      <Text style={styles.title}>SelectionList - Fruits & Vegetables</Text>
      <ImageBackground
        source={{
          uri: "https://www.cleanipedia.com/images/5iwkm8ckyw6v/jQPbszwiYvh52wdGEhRZR/fd8faa032296b89e1c5fe34c69347eab/Y2h1bmctdHJhaS1jYXktbmdheS10ZXQuanBn/1200w/ch%C6%B0ng-tr%C3%A1i-c%C3%A2y-ng%C3%A0y-t%E1%BA%BFt.jpg",
        }}
        style={styles.background}
      >
        <ScrollView contentContainerStyle={styles.list}>
          <SectionList
            sections={fruits_vegetables}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => (
              <Item name={item} onSelect={setExercises} />
            )}
            renderSectionHeader={({ section }) => (
              <Text style={styles.headerTitle}>{section.title}</Text>
            )}
          />
        </ScrollView>
      </ImageBackground>
      <Text style={[styles.title, styles.titleSelected]}>
        Selected Exercises:
      </Text>
      <Text style={styles.exercises}>{exercises.join(", ")}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: "100vh",
  },
  title: {
    textAlign: "center",
    color: "blue",
    fontSize: 20,
    fontWeight: "bold",
  },
  background: {},
  list: {
    height: 300,
    paddingBottom: 16,
  },
  headerTitle: {
    color: "white",
    fontSize: 16,
    margin: 4,
    marginLeft: "20%",
    fontWeight: "bold",
  },
  titleSelected: {
    color: "red",
    textTransform: "uppercase",
  },
  exercises: {
    textAlign: "center",
  },
});
export default Exercise;
