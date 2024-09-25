//React Native FlatList
//https://aboutreact.com/react-native-flatlist/

//import React in our code
import React, { useState } from "react";

//import all the components we are going to use
import {
  FlatList,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Modal,
  Image,
  Button,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

const dummyArray = [
  {
    mahoa: 1,
    tenloai: "Hoa Quà tặng",
    tenhoa: "Đón xuân",
    dongia: 15000,
    hinh: require("./assets/images/cuc_9.jpg"),
    mota: "Hoa hồng màu hồng đậm, hoa hồng xanh, các loại lá măng",
  },
  {
    mahoa: 2,
    tenloai: "Hoa Quà tặng",
    tenhoa: "Hồn nhiên",
    dongia: 60000,
    hinh: require("./assets/images/cuc_2.jpg"),
    mota: "Hoa hồng đỏ, lá kim thuỷ tùng",
  },
  {
    mahoa: 3,
    tenloai: "Hoa Quà tặng",
    tenhoa: "Tím thuỷ chung",
    dongia: 45000,
    hinh: require("./assets/images/cuc_3.jpg"),
    mota: "Hoa cúc tím",
  },
  {
    mahoa: 4,
    tenloai: "Hoa Quà tặng",
    tenhoa: "Nét duyên tím hoa cà",
    dongia: 40000,
    hinh: require("./assets/images/cuc_4.jpg"),
    mota: "Hoa cúc màu tím nhạt",
  },
  {
    mahoa: 5,
    tenloai: "Hoa Quà tặng",
    tenhoa: "Cùng khoe sắc",
    dongia: 70000,
    hinh: require("./assets/images/cuc_5.jpg"),
    mota: "Hoa cúc các màu: trắng, vàng, cam",
  },
  {
    mahoa: 6,
    tenloai: "Hoa Quà tặng",
    tenhoa: "Trắng thơ ngây",
    dongia: 65000,
    hinh: require("./assets/images/cuc_6.jpg"),
    mota: "Hoa cúc trắng",
  },
  {
    mahoa: 7,
    tenloai: "Hoa Hồng",
    tenhoa: "Dây tơ hồng",
    dongia: 250000,
    hinh: require("./assets/images/cuoi_1.jpg"),
    mota: "Hoa hồng màu hồng đậm, hoa hồng xanh, các loại lá măng",
  },
  {
    mahoa: 8,
    tenloai: "Hoa Hồng",
    tenhoa: "Cầu thuỷ tinh",
    dongia: 220000,
    hinh: require("./assets/images/cuoi_2.jpg"),
    mota: "Hoa hồng và hoa thuỷ tiên trắng",
  },
  {
    mahoa: 9,
    tenloai: "Hoa Hồng",
    tenhoa: "Duyên thầm",
    dongia: 260000,
    hinh: require("./assets/images/cuoi_3.jpg"),
    mota: "Hoa cúc trắng, baby, lá măng",
  },
  {
    mahoa: 10,
    tenloai: "Hoa Hồng",
    tenhoa: "Ðâm chồi nảy lộc",
    dongia: 180000,
    hinh: require("./assets/images/cuoi_4.jpg"),
    mota: "Hoa hồng trắng và các loại lá măng",
  },
  {
    mahoa: 11,
    tenloai: "Hoa Hồng",
    tenhoa: "Hoà quyện",
    dongia: 270000,
    hinh: require("./assets/images/cuoi_5.jpg"),
    mota: "Hoa hồng trắng, lá thuỷ tùng",
  },
  {
    mahoa: 12,
    tenloai: "Hoa Hồng",
    tenhoa: "Nồng nàn",
    dongia: 210000,
    hinh: require("./assets/images/cuoi_6.jpg"),
    mota: "Hoa hồng đỏ, lá thuỷ tùng, lá măng",
  },
  {
    mahoa: 13,
    tenloai: "Hoa Tình Yêu",
    tenhoa: "Together",
    dongia: 120000,
    hinh: require("./assets/images/hong_1.jpg"),
    mota: "Hồng xác pháo, cúc tím",
  },
  {
    mahoa: 14,
    tenloai: "Hoa Tình Yêu",
    tenhoa: "Long trip",
    dongia: 85000,
    hinh: require("./assets/images/hong_2.jpg"),
    mota: "Hoa hồng đỏ, lá kim thuỷ tùng",
  },
  {
    mahoa: 15,
    tenloai: "Hoa Tình Yêu",
    tenhoa: "Beautiful life",
    dongia: 100000,
    hinh: require("./assets/images/hong_3.jpg"),
    mota: "Hoa hồng đỏ, lá măng, lá đệm",
  },
  {
    mahoa: 16,
    tenloai: "Hoa Tình Yêu",
    tenhoa: "Morning Sun",
    dongia: 75000,
    hinh: require("./assets/images/hong_4.jpg"),
    mota: "Hoa hồng vàng",
  },
  {
    mahoa: 17,
    tenloai: "Hoa Tình Yêu",
    tenhoa: "Pretty Bloom",
    dongia: 65000,
    hinh: require("./assets/images/hong_5.jpg"),
    mota: "Hoa hồng trắng và lá thông",
  },
  {
    mahoa: 18,
    tenloai: "Hoa Tình Yêu",
    tenhoa: "Red Rose",
    dongia: 45000,
    hinh: require("./assets/images/hong_7.jpg"),
    mota: "Hoa hồng đỏ và lá măng",
  },
  {
    mahoa: 19,
    tenloai: "Hoa Cưới",
    tenhoa: "Vấn vuơng",
    dongia: 150000,
    hinh: require("./assets/images/xuan_1.jpg"),
    mota: "Hoa hồng đỏ, hồng đậm, cúc đỏ, các loại lá",
  },
  {
    mahoa: 20,
    tenloai: "Hoa Cưới",
    tenhoa: "Nắng nhẹ nhàng",
    dongia: 50000,
    hinh: require("./assets/images/xuan_2.jpg"),
    mota: "Hoa cúc xanh, hoa lys vàng, lá đệm",
  },
  {
    mahoa: 21,
    tenloai: "Hoa Cưới",
    tenhoa: "Thanh tao",
    dongia: 120000,
    hinh: require("./assets/images/xuan_3.jpg"),
    mota: "Hoa thủy tiên, cúa trắng, cúc dại tím, các loại lá đệm",
  },
  {
    mahoa: 22,
    tenloai: "Hoa Cưới",
    tenhoa: "Tinh khiết",
    dongia: 110000,
    hinh: require("./assets/images/xuan_4.jpg"),
    mota: "Hồng trắng và salem",
  },
  {
    mahoa: 23,
    tenloai: "Hoa Cưới",
    tenhoa: "Mùa xuân chín",
    dongia: 150000,
    hinh: require("./assets/images/xuan_5.jpg"),
    mota: "Hồmg cam, cúc xanh, thuỷ tiên và các loại lá",
  },
  {
    mahoa: 24,
    tenloai: "Hoa Cưới",
    tenhoa: "Rực rở nắng vàng",
    dongia: 75000,
    hinh: require("./assets/images/xuan_6.jpg"),
    mota: "Hồng vàng và cúc vàng",
  },
  {
    mahoa: 25,
    tenloai: "Hoa Tình Yêu",
    tenhoa: "Love Candy",
    dongia: 95000,
    hinh: require("./assets/images/hong_13.jpg"),
    mota: "Hoa hồng trắng tinh khôi xen với hoa hồng màu hồng nhạt, điểm thêm baby trắng và lá măng",
  },
  {
    mahoa: 26,
    tenloai: "Hoa Hồng",
    tenhoa: "HHoay Wedding",
    dongia: 210000,
    hinh: require("./assets/images/cuoi_9.jpg"),
    mota: "Hoa hồng môn và các loại lá",
  },
  {
    mahoa: 27,
    tenloai: "Hoa Quà tặng",
    tenhoa: "Cúc nhiệt đới",
    dongia: 150000,
    hinh: require("./assets/images/cuc_15.jpg"),
    mota: "Cúc vàng - h?ng cam - lá mang",
  },
];
const ListLoaiHoa = [
  {
    maloai: "1",
    tenloai: "Hoa Quà tặng",
    hinh: require("./assets/images/cuc_1.jpg"),
  },
  {
    maloai: "2",
    tenloai: "Hoa Cưới",
    hinh: require("./assets/images/cuoi_1.jpg"),
  },
  {
    maloai: "3",
    tenloai: "Hoa Hồng",
    hinh: require("./assets/images/hong_1.jpg"),
  },
  {
    maloai: "4",
    tenloai: "Hoa Xuân",
    hinh: require("./assets/images/xuan_1.jpg"),
  },
  ,
  {
    maloai: "5",
    tenloai: "Hoa Chúc Mừng",
    hinh: require("./assets/images/xuan_1.jpg"),
  },
];

const Hoa = () => {
  const [listItems, setListItems] = useState(dummyArray);
  const [hoachon, chonhoa] = useState({
    mahoa: 1,
    tenloai: "Hoa Quà tặng",
    tenhoa: "Đón xuân",
    dongia: 15000,
    hinh: require("./assets/images/cuc_9.jpg"),
    mota: "Hoa hồng màu hồng đậm, hoa hồng xanh, các loại lá măng",
  });
  const [showModal, setShowModal] = useState(false);
  const [loaihoa, chonloaihoa] = useState("Hoa Quà tặng");
  const Dshoachon = dummyArray.filter(layhoatheoloai);

  function layhoatheoloai(hoa) {
    return hoa.tenloai == loaihoa;
  }

  const ItemView = ({ item }) => {
    return (
      // FlatList Item
      <View>
        <Text style={styles.item} onPress={() => getItem(item)}>
          {item.tenhoa}
        </Text>
      </View>
    );
  };
  const ItemSeparatorView = () => {
    return (
      // FlatList Item Separator
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "red",
        }}
      />
    );
  };

  const getItem = (item) => {
    //Function for click on an item
    chonhoa(item);
    setShowModal(!showModal);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Picker
          selectedValue={loaihoa}
          onValueChange={(itemValue, itemIndex) => {
            chonloaihoa(itemValue);
          }}
        >
          {ListLoaiHoa.map((item) => {
            return <Picker.Item value={item.tenloai} label={item.tenloai} />;
          })}
        </Picker>
        <Text>Loai Hoa :{loaihoa}</Text>
        <Modal animationType={"slide"} transparent={false} visible={showModal}>
          <View style={styles.modal}>
            <Text style={styles.text}> Tên Hoa {hoachon.tenhoa}</Text>
            <Text style={styles.text}> Đơn giá: {hoachon.dongia}</Text>
            <Image source={hoachon.hinh} />
            <Text>Mô Tả {hoachon.mota}</Text>
            <Button
              title="Close"
              onPress={() => {
                setShowModal(!showModal);
              }}
            />
          </View>
        </Modal>

        <FlatList
          data={Dshoachon}
          //data defined in constructor
          ItemSeparatorComponent={ItemSeparatorView}
          //Item Separator View
          renderItem={ItemView}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 30,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  modal: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#00ff00",
    padding: 100,
  },
  text: {
    color: "#3f2949",
    marginTop: 10,
  },
});

export default Hoa;
