import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useState } from "react";
function Post(props) {
  const { post } = props;
  const [like, setLike] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [comment, setComment] = useState(0);
  const [share, setShare] = useState(0);

  const handleLike = () => {
    if (isLiked === true) setLike(like - 1);
    else setLike(like + 1);
    setIsLiked(!isLiked);
  };
  const handleComment = () => {
    setComment(comment + 1);
  };
  const handleShare = () => {
    setShare(share + 1);
  };
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image source={{ uri: post.avatar }} style={styles.avatar} />
        <Text style={styles.username}>{post.username}</Text>
      </View>
      <Text style={styles.content}>{post.content}</Text>
      <Image source={{ uri: post.image }} style={styles.image} />
      <View style={styles.reactionCount}>
        <Text style={styles.reactionCountText}>
          {like === 1 || like === 0 ? like + " Like" : like + " Likes"}
        </Text>
        <Text style={styles.reactionCountText}>
          {comment === 1 || comment === 0
            ? comment + " Comment"
            : comment + " Comments"}
        </Text>
        <Text style={styles.reactionCountText}>
          {share === 1 || share === 0 ? share + " Share" : share + " Shares"}
        </Text>
      </View>
      <View style={styles.reaction}>
        <TouchableOpacity
          underlayColor="#ccc"
          style={styles.reactionButton}
          onPress={handleLike}
        >
          <View style={styles.reactionButtonContainer}>
            <Icon
              style={styles.reactionIcon}
              name="thumbs-up"
              size={20}
              color={isLiked ? "red" : "black"}
            />
            <Text style={styles.reactionText}>Likes</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          underlayColor="#ccc"
          style={styles.reactionButton}
          onPress={handleComment}
        >
          <View style={styles.reactionButtonContainer}>
            <Icon style={styles.reactionIcon} name="comment" size={20} />
            <Text style={styles.reactionText}>Comments</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          underlayColor="#ccc"
          style={styles.reactionButton}
          onPress={handleShare}
        >
          <View style={styles.reactionButtonContainer}>
            <Icon style={styles.reactionIcon} name="share" size={20} />
            <Text style={styles.reactionText}> Shares</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Post;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "white",
    marginBottom: 10,
    borderRadius: 8,
  },
  userInfo: {
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
  },
  username: {
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 8,
  },
  content: {
    marginVertical: 10,
    fontSize: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 8,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 4,
  },
  reactionCount: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 12,
  },
  reactionCountText: {
    color: "#c2c2c2",
  },
  reaction: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopColor: "#c2c2c2",
    borderTopWidth: 1,
    paddingTop: 24,
    paddingBottom: 14,
  },
  reactionButton: {},
  reactionButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  reactionIcon: {
    marginRight: 4,
  },
  reactionText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
