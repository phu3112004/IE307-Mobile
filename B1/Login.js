import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput, Image, TouchableOpacity, Alert } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = () => {
        if (email === '22521152@gm.uit.edu.vn' && password === 'huynhminhphuoc') {
            setEmail("");
            setPassword("");
            navigation.navigate('Nav');
        } else {
            Alert.alert("Incorrect email or password.");
        }
    };
    
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Image style={styles.img} source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/1/18/React_Native_Logo.png" }} />
                <Text style={styles.welcomeText}>Welcome</Text>
                <View style={styles.inputbox}>
                    <Icon name="envelope" size={25}/>
                    <TextInput
                        style={styles.input}
                        value={email}
                        placeholder="Email"
                        placeholderTextColor={"#ccc"}
                        onChangeText={setEmail}
                    />
                </View>

                <View style={styles.inputbox}>
                    <Icon name="lock" size={25} style={{marginHorizontal:4.6}}/>
                    <TextInput
                        style={styles.input}
                        value={password}
                        placeholder="Password"
                        placeholderTextColor={"#ccc"}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                    />
                </View>
                <TouchableOpacity style={styles.forgot}>
                    <Text style={{color:'magenta'}}>Forgot password?</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
                    <Text style={styles.submitText}>LOG IN</Text>
                </TouchableOpacity>
                <Text style={{fontWeight:'bold', fontSize:18, marginVertical: 10}}>Or login with</Text>
                <View style={styles.iconContainer}>
                    <TouchableOpacity><Image style={styles.Iconimg} source={{uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTixw4oaP7pWzJfvKLlgjoJGl3Tie1ioumtHG3kxlrqfSRutHEz"}}/></TouchableOpacity>
                    <TouchableOpacity><Image style={styles.Iconimg} source={{uri:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png"}}/></TouchableOpacity>
                </View>
                <View style={styles.signup}>
                    <Text>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                        <Text style={styles.signupText}>Sign up here!</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        width: '80%',
        alignItems: 'center',
    },
    img: {
        width: 100,
        height: 100,
        borderRadius:50,
    },
    welcomeText: {
        fontSize: 24,
        marginVertical: 20,
        fontWeight:'bold',
    },
    inputbox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: "#ccc",
        borderWidth: 2,
        width: '100%',
        marginBottom: 15,
        paddingVertical: 5,
        paddingHorizontal:15,
        borderRadius:10,
    },
    input: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginLeft: 5,
        width: '100%',
    },
    forgot:{
        color:'magenta',
        alignSelf:'flex-end',
        top:-10,
    },
    submit:{
        padding:10,
        backgroundColor:'orange',
        width:'100%',
        borderRadius:10,
    },
    submitText:{
        textAlign:'center',
        fontSize:18,
        color:'white',
    },
    iconContainer:{
        display:'flex',
        flexDirection:'row',
    },
    Iconimg:{
        height:50,
        width:50,
        borderRadius:50,
        margin: 10,
    },
    signup:{
        display:'flex',
        flexDirection:'row',
        marginVertical:10,
    },
    signupText: {
        color: 'blue',
        fontWeight: 'bold',
    },
});
