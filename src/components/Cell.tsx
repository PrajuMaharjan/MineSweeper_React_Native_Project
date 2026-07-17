import React,{useCallback} from "react";
import {Pressable,Text,View,StyleSheet} from "react-native";

export type CellData={
    row:number;
    col:number;
    bomb:boolean;
    revealed:boolean;
    flagged:boolean;
    adjBombs:number;
};

type CellProps={
    cell:CellData;
    onReveal:(row:number,col:number)=>void;
    onFlag:(row:number,col:number)=>void;
    gameOver:boolean;
    explodedCell?:{row:number;col:number} | null;
};

const CELL_SIZE=32;

// Colors representing the number of adjacent bombs
const NUMBER_COLORS:Record<number,string>={
    1:"#2ecc71",
    2:"#00a86B",
    3:"#F1C40F",
    4:"#E67E22",
    5:"#E74C3C",
    6:"#C0392B",
    7:"#8E44AD",
    8:"#1B1B1B",
};

const Cell=React.memo(function Cell({cell,onReveal,onFlag,gameOver,explodedCell}:CellProps){
    
    const {row,col,bomb,revealed,flagged,adjBombs}=cell;

    const isExploded=explodedCell?.row===row && explodedCell?.col===col;

    const handlePress=useCallback(()=>{
        if(gameOver || revealed || flagged) return;
        onReveal(row,col);
    },[gameOver,revealed,row,col,onFlag]);

    const handleLongPress=useCallback(()=>{
        if(gameOver || revealed) return;
        onFlag(row,col);
    },[gameOver,revealed,row,col,onFlag]);

    const renderContent=()=>{
        if(flagged && !revealed){
            return <Text style={styles.emoji}>🚩</Text>
        }

        if(!revealed) return null;

        if(bomb){
            return(
                <Text style={[styles.emoji,isExploded && styles.explodedEmoji]}>
                    💣
                </Text>
            );
        }

        if(adjBombs>0){
            return(
                <Text style={[styles.numberText,{color:NUMBER_COLORS[adjBombs]}]}>
                    {adjBombs}
                </Text>
            );
        }
        return null;
    };

    const cellStyle=[styles.cell,
                     revealed ? styles.cellRevealed : styles.cellUnrevealed,
                     isExploded && styles.cellExploded,
                    ];
    
    return(
        <Pressable onPress={handlePress}
                   onLongPress={handleLongPress}
                   delayLongPress={300}
                   android_ripple={null}
                   style={({pressed})=>[
                    ...cellStyle,
                    pressed && !revealed && styles.cellPressed,
                   ]}
                   accessibilityLabel={
                    flagged ? `Flagged cell row ${row+1} column ${col+1}` : 
                              revealed ? 
                              bomb ? 
                              `Mine at row ${row+1} column ${col+1}` :
                              `Cell row ${row+1} column ${col+1} ${adjBombs ? `,${adjBombs} adjacent mines` : `,empty`}` : 
                              `Hidden cell row ${row+1} column ${col+1}`
                   }
                   accessibilityRole="button"
        >
            <View style={styles.innerContent}>{renderContent()}</View>
        </Pressable>
    );
});

export default Cell;

const styles=StyleSheet.create({
    cell:{
        width:CELL_SIZE,
        height:CELL_SIZE,
        alignItems:"center",
        justifyContent:'center',
        borderWidth:2,
    },
    cellUnrevealed:{
        backgroundColor:'#C0C0C0',
        borderTopColor:'#FFFFFF',
        borderLeftColor:'#FFFFFF',
        borderBottomColor:'#7B7B7B',
        borderRightColor:'#7B7B7B',
    },
    cellPressed:{
        borderTopColor: '#7B7B7B',
        borderLeftColor: '#7B7B7B',
        borderBottomColor: '#FFFFFF',
        borderRightColor: '#FFFFFF',
        backgroundColor: '#B0B0B0',
    },
    cellRevealed: {
        backgroundColor: '#C0C0C0',
        borderTopColor: '#7B7B7B',
        borderLeftColor: '#7B7B7B',
        borderBottomColor: '#FFFFFF',
        borderRightColor: '#FFFFFF',
    },
    cellExploded: {
        backgroundColor: '#FF0000',
    },
    innerContent:{
        alignItems:'center',
        justifyContent:'center',
        width:'100%',
        height:'100%',
    },
    numberText:{
        fontSize:14,
        fontWeight:'700',
        lineHeight:16,
        includeFontPadding:false, 
        textAlignVertical:'center',
    },
    emoji:{
        fontSize:14,
        lineHeight:18,
        includeFontPadding:false,
    },
    explodedEmoji:{
        fontSize:16,
    },
});

export {CELL_SIZE};