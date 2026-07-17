import {Text,StyleSheet,TextStyle} from "react-native";

type ScreenTitleProps={
    label:string;
    style:TextStyle;
};

export default function ScreenTitle({label,style}:ScreenTitleProps){
    return(
        <Text style={[styles.title,style]}>{label}</Text>
    );
}

const styles=StyleSheet.create({
    title:{
        fontWeight:'bold',
        color:'white',
        textAlign:'center',
    }
});