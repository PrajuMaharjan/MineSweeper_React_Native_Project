import {Pressable,Text,StyleSheet,ViewStyle} from "react-native";

type IconButtonProps={
    icon:string;
    onPress:()=>void;
    style?:ViewStyle;
};

export default function IconButton({icon,onPress,style}:IconButtonProps){
    return(
        <Pressable style={({pressed})=>[styles.button,pressed && styles.buttonPressed]} onPress={onPress} hitSlop={10}>
            <Text style={styles.icon}>{icon}</Text>
        </Pressable>
    );
}

const styles=StyleSheet.create({
    button:{
        width:42,
        height:42,
        borderRadius:21,
        backgroundColor:"rgba(20,20,32,0.7)",
        borderWidth:0.5,
        borderColor:"rgba(124,111,255,0.4)",
        alignItems:"center",
        justifyContent:"center",
        zIndex:10,
    },
    buttonPressed:{
        backgroundColor:"rgba(124,111,255,0.25)"
    },
    icon:{
        fontSize:20,
        color:"#a78bfa",
    },
});