import { View, Text, Image, StyleSheet } from "react-native";
import { useState } from "react";
import Count from "./Count";
import Reaction from "./Reaction";
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
        <Count count={like} type={"Like"} />
        <Count count={comment} type={"Comment"} />
        <Count count={share} type={"Share"} />
      </View>
      <View style={styles.divide} />
      <View style={styles.reaction}>
        <Reaction
          onClick={handleLike}
          isClicked={isLiked}
          type="Like"
          icon="thumbs-up"
        />
        <Reaction onClick={handleComment} type="Comment" icon="comment" />
        <Reaction onClick={handleShare} type="Share" icon="share" />
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

  divide: {
    height: 1,
    width: "100%",
    backgroundColor: "#c2c2c2",
  },
  reaction: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 24,
    paddingBottom: 14,
  },
});
