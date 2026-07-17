import React,{useCallback,useMemo} from "react";
import {View,ScrollView,Dimensions,StyleSheet} from "react-native";
import Cell,{CellData,CELL_SIZE} from './Cell';

type BoardProps={
    board:CellData[][];
    onReveal:(row:number,col:number)=>void;
    onFlag:(row:number,col:number)=>void;
    gameOver:boolean;
    explodedCell?:{row:number;col:number} | null;
};

export default function Board({board,onReveal,onFlag,gameOver,explodedCell}:BoardProps){
    const size=board.length;

    const boardPixelWidth=size*CELL_SIZE+size*BORDER_WIDTH;
    const screenWidth=Dimensions.get("window").width;
    const needsHorizontalScroll=boardPixelWidth>screenWidth-BOARD_PADDING*2;

    const handleReveal=useCallback((row:number,col:number)=>onReveal(row,col),[onReveal]);

    const handleFlag=useCallback((row:number,col:number)=>onFlag(row,col),[onFlag]);

    const rows=useMemo(()=>board.map((rowArr,rowIdx)=>(

        <BoardRow key={rowIdx}
                  rowArr={rowArr}
                  onReveal={handleReveal}
                  onFlag={handleFlag}
                  gameOver={gameOver}
                  explodedCell={explodedCell}
        />
    )),
    [board,handleReveal,handleFlag,gameOver,explodedCell]);

    return(
        <View style={styles.outerBorder}>
            <ScrollView horizontal={needsHorizontalScroll}
                        scrollEnabled={needsHorizontalScroll}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContent}
            >
                <ScrollView scrollEnabled={true}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={styles.scrollContent}
                >
                    <View style={styles.grid}>{rows}</View>
                </ScrollView>
            </ScrollView>
        </View>
    );
}

type BoardRowProps={
    rowArr:CellData[];
    onReveal:(row:number,col:number)=>void;
    onFlag:(row:number,col:number)=>void;
    gameOver:boolean;
    explodedCell?:{row:number;col:number} | null;
};

const BoardRow=React.memo(function BoardRow({rowArr,onReveal,onFlag,gameOver,explodedCell}:BoardRowProps){
    return(
        <View style={styles.row}>
            {rowArr.map((cell)=>(
                <Cell key={`${cell.row}-${cell.col}`}
                      cell={cell}
                      onReveal={onReveal}
                      onFlag={onFlag}
                      gameOver={gameOver}
                      explodedCell={explodedCell}
                />
            ))}
        </View>
    );
});

const BORDER_WIDTH=0;
const BOARD_PADDING=16;

const styles=StyleSheet.create({
    outerBorder:{
        borderWidth:3,
        backgroundColor:'#C0C0C0',
        borderTopColor:'#7B7B7B',
        borderLeftColor:'#7B7B7B',
        borderBottomColor:'#FFFFFF',
        borderRightColor:'#FFFFFF',
        alignSelf:'center',
    },
    scrollContent:{
        flexGrow:0,
    },
    grid:{
        flexDirection:'column',
    },
    row:{
        flexDirection:'row',
    },
});