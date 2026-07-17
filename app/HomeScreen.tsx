import { useRouter } from "expo-router";
import {ImageBackground,StyleSheet,View,} from "react-native";
import ScreenTitle from "../src/components/ScreenTitle";
import MenuButton from "../src/components/MenuButton";
import IconButton from "../src/components/IconButton";

export default function HomeScreen() {
    const router=useRouter();

    return (
        <ImageBackground source={require("../assets/images/HomeBackgroundImage.png")} style={styles.background} resizeMode="cover">
            <View style={styles.topBar}>

                {/* Two Buttons on top : Settings and Statistics */}
                <IconButton icon="📊" 
                            onPress={()=>router.push("/StatisticsScreen")}
                />
                
                <IconButton icon="⚙️" 
                            onPress={()=>router.push("/SettingsScreen")}
                />
            </View>

            <View style={styles.content}>
                {/* ScreenTitle */}
                <ScreenTitle label="MineSweeper" style={styles.title} />

                {/* Two buttons */}
                <View style={styles.buttonContainer}>
                    <MenuButton label="Play Game" onPress={()=>router.push("/GameScreen")} />
                    <MenuButton label="How To Play" onPress={()=>router.push("/TutorialScreen")} />
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  topBar:{
    position:"absolute",
    top:66,
    left:20,
    right:20,
    flexDirection:"row",
    justifyContent:"space-between",
    zIndex:10,
  },
  content: {
    flex:1,
    alignItems:"center",
    justifyContent:"center",
    gap:20,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    gap:14,
  },
  title:{
    fontSize:34,
    letterSpacing:2,
    marginBottom:12,
  },
});
