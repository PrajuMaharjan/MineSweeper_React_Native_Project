import {useMemo} from "react";
import { View, StyleSheet } from "react-native";
import Board from "../src/components/Board";
import {CellData} from "../src/components/Cell";

const BOARD_SIZE=9; //Constant for now -- Will be changed according to difficulty in the future

// Build the voard
function buildCoveredBoard(size:number):CellData[][]{
  return Array.from({length:size},(_,row)=>
    Array.from({length:size},(_,col)=>({
      row,
      col,
      bomb:false,
      revealed:false,
      flagged:false,
      adjBombs:0,
    }))
  )
}

export default function GameScreen() {
  
  // UseMemo since we are only building the board once per game
  const board=useMemo(()=>buildCoveredBoard(BOARD_SIZE),[]);

  // Placeholders for now - Game logic will be wired up later
  const handleReveal=(row:number,col:number)=>{
    console.log(`Cell pressed - row: ${row+1}, col: ${col+1}`);
  };

  const handleFlag=(row:number,col:number)=>{};

  return (
    <View style={styles.root}>
      <Board  board={board}
              onReveal={handleReveal}
              onFlag={handleFlag}
              gameOver={false}
              explodedCell={null}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#0D8584",
    alignItems: "center",
    justifyContent: "center",
  },
});