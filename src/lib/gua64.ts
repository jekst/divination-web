import * as bagua from "./gua";
import { Wuxing as wuxing } from "./base";
export enum Palace {
    Undefined = "",
    Qian = "乾",
    Dui = "兑",
    Li = "离",
    Zhen = "震",
    Xun = "巽",
    Kan = "坎",
    Gen = "艮",
    Kun = "坤"
};
export class Gua64 {
    ID: number;
    PalaceID: number;
    Rank: number;
    Name: string;
    ShortName: string;
    Symbol: string;
    Palace: Palace;
    PalacePosition: number;
    Wuxing: string;

    constructor(id: number, palaceID: number, rank: number, name: string, shortName: string, symbol: string, palace: Palace, palacePosition: number, wuxing: string) {
        this.ID = id;
        this.PalaceID = palaceID;
        this.Rank = rank;
        this.Name = name;
        this.ShortName = shortName;
        this.Symbol = symbol;
        this.Palace = palace;
        this.PalacePosition = palacePosition;
        this.Wuxing = wuxing;
    }
}
export const gua64List: Gua64[] = [
    // 乾宫
    { ID: 0b111111, PalaceID: 0b111111, Rank: 1, Name: "乾为天", ShortName: "天", Symbol: "䷀", Palace: Palace.Qian, PalacePosition: 0, Wuxing: wuxing.Jin },
    { ID: 0b111110, PalaceID: 0b111111, Rank: 44, Name: "天风姤", ShortName: "姤", Symbol: "䷫", Palace: Palace.Qian, PalacePosition: 1, Wuxing: wuxing.Jin },
    { ID: 0b111100, PalaceID: 0b111111, Rank: 33, Name: "天山遁", ShortName: "遁", Symbol: "䷠", Palace: Palace.Qian, PalacePosition: 2, Wuxing: wuxing.Jin },
    { ID: 0b111000, PalaceID: 0b111111, Rank: 12, Name: "天地否", ShortName: "否", Symbol: "䷋", Palace: Palace.Qian, PalacePosition: 3, Wuxing: wuxing.Jin },
    { ID: 0b110000, PalaceID: 0b111111, Rank: 20, Name: "风地观", ShortName: "观", Symbol: "䷓", Palace: Palace.Qian, PalacePosition: 4, Wuxing: wuxing.Jin },
    { ID: 0b100000, PalaceID: 0b111111, Rank: 23, Name: "山地剥", ShortName: "剥", Symbol: "䷖", Palace: Palace.Qian, PalacePosition: 5, Wuxing: wuxing.Jin },
    { ID: 0b101000, PalaceID: 0b111111, Rank: 35, Name: "火地晋", ShortName: "晋", Symbol: "䷢", Palace: Palace.Qian, PalacePosition: 6, Wuxing: wuxing.Jin },
    { ID: 0b101111, PalaceID: 0b111111, Rank: 14, Name: "火天大有", ShortName: "大有", Symbol: "䷍", Palace: Palace.Qian, PalacePosition: 7, Wuxing: wuxing.Jin },
    // 兑宫
    { ID: 0b011011, PalaceID: 0b011011, Rank: 58, Name: "兑为泽", ShortName: "泽", Symbol: "䷹", Palace: Palace.Dui, PalacePosition: 0, Wuxing: wuxing.Jin },
    { ID: 0b011010, PalaceID: 0b011011, Rank: 47, Name: "泽水困", ShortName: "困", Symbol: "䷮", Palace: Palace.Dui, PalacePosition: 1, Wuxing: wuxing.Jin },
    { ID: 0b011000, PalaceID: 0b011011, Rank: 45, Name: "泽地萃", ShortName: "萃", Symbol: "䷬", Palace: Palace.Dui, PalacePosition: 2, Wuxing: wuxing.Jin },
    { ID: 0b011100, PalaceID: 0b011011, Rank: 31, Name: "泽山咸", ShortName: "咸", Symbol: "䷞", Palace: Palace.Dui, PalacePosition: 3, Wuxing: wuxing.Jin },
    { ID: 0b010100, PalaceID: 0b011011, Rank: 39, Name: "水山蹇", ShortName: "蹇", Symbol: "䷦", Palace: Palace.Dui, PalacePosition: 4, Wuxing: wuxing.Jin },
    { ID: 0b000100, PalaceID: 0b011011, Rank: 15, Name: "地山谦", ShortName: "谦", Symbol: "䷎", Palace: Palace.Dui, PalacePosition: 5, Wuxing: wuxing.Jin },
    { ID: 0b001100, PalaceID: 0b011011, Rank: 62, Name: "雷山小过", ShortName: "小过", Symbol: "䷽", Palace: Palace.Dui, PalacePosition: 6, Wuxing: wuxing.Jin },
    { ID: 0b001011, PalaceID: 0b011011, Rank: 54, Name: "雷泽归妹", ShortName: "归妹", Symbol: "䷵", Palace: Palace.Dui, PalacePosition: 7, Wuxing: wuxing.Jin },
    // 离宫
    { ID: 0b101101, PalaceID: 0b101101, Rank: 30, Name: "离为火", ShortName: "火", Symbol: "䷝", Palace: Palace.Li, PalacePosition: 0, Wuxing: wuxing.Huo },
    { ID: 0b101100, PalaceID: 0b101101, Rank: 56, Name: "火山旅", ShortName: "旅", Symbol: "䷷", Palace: Palace.Li, PalacePosition: 1, Wuxing: wuxing.Huo },
    { ID: 0b101110, PalaceID: 0b101101, Rank: 50, Name: "火风鼎", ShortName: "鼎", Symbol: "䷱", Palace: Palace.Li, PalacePosition: 2, Wuxing: wuxing.Huo },
    { ID: 0b101010, PalaceID: 0b101101, Rank: 64, Name: "火水未济", ShortName: "未济", Symbol: "䷿", Palace: Palace.Li, PalacePosition: 3, Wuxing: wuxing.Huo },
    { ID: 0b100010, PalaceID: 0b101101, Rank: 4, Name: "山水蒙", ShortName: "蒙", Symbol: "䷃", Palace: Palace.Li, PalacePosition: 4, Wuxing: wuxing.Huo },
    { ID: 0b110010, PalaceID: 0b101101, Rank: 59, Name: "风水涣", ShortName: "涣", Symbol: "䷺", Palace: Palace.Li, PalacePosition: 5, Wuxing: wuxing.Huo },
    { ID: 0b111010, PalaceID: 0b101101, Rank: 6, Name: "天水讼", ShortName: "讼", Symbol: "䷅", Palace: Palace.Li, PalacePosition: 6, Wuxing: wuxing.Huo },
    { ID: 0b111101, PalaceID: 0b101101, Rank: 13, Name: "天火同人", ShortName: "同人", Symbol: "䷌", Palace: Palace.Li, PalacePosition: 7, Wuxing: wuxing.Huo },
    // 震宫
    { ID: 0b001001, PalaceID: 0b001001, Rank: 51, Name: "震为雷", ShortName: "雷", Symbol: "䷲", Palace: Palace.Zhen, PalacePosition: 0, Wuxing: wuxing.Mu },
    { ID: 0b001000, PalaceID: 0b001001, Rank: 16, Name: "雷地豫", ShortName: "豫", Symbol: "䷏", Palace: Palace.Zhen, PalacePosition: 1, Wuxing: wuxing.Mu },
    { ID: 0b001010, PalaceID: 0b001001, Rank: 40, Name: "雷水解", ShortName: "解", Symbol: "䷧", Palace: Palace.Zhen, PalacePosition: 2, Wuxing: wuxing.Mu },
    { ID: 0b001110, PalaceID: 0b001001, Rank: 32, Name: "雷风恒", ShortName: "恒", Symbol: "䷟", Palace: Palace.Zhen, PalacePosition: 3, Wuxing: wuxing.Mu },
    { ID: 0b000110, PalaceID: 0b001001, Rank: 46, Name: "地风升", ShortName: "升", Symbol: "䷭", Palace: Palace.Zhen, PalacePosition: 4, Wuxing: wuxing.Mu },
    { ID: 0b010110, PalaceID: 0b001001, Rank: 48, Name: "水风井", ShortName: "井", Symbol: "䷯", Palace: Palace.Zhen, PalacePosition: 5, Wuxing: wuxing.Mu },
    { ID: 0b011110, PalaceID: 0b001001, Rank: 28, Name: "泽风大过", ShortName: "大过", Symbol: "䷛", Palace: Palace.Zhen, PalacePosition: 6, Wuxing: wuxing.Mu },
    { ID: 0b011001, PalaceID: 0b001001, Rank: 17, Name: "泽雷随", ShortName: "随", Symbol: "䷐", Palace: Palace.Zhen, PalacePosition: 7, Wuxing: wuxing.Mu },
    // 巽宫
    { ID: 0b110110, PalaceID: 0b110110, Rank: 57, Name: "巽为风", ShortName: "风", Symbol: "䷸", Palace: Palace.Xun, PalacePosition: 0, Wuxing: wuxing.Mu },
    { ID: 0b110111, PalaceID: 0b110110, Rank: 9, Name: "风天小畜", ShortName: "小畜", Symbol: "䷈", Palace: Palace.Xun, PalacePosition: 1, Wuxing: wuxing.Mu },
    { ID: 0b110101, PalaceID: 0b110110, Rank: 37, Name: "风火家人", ShortName: "家人", Symbol: "䷤", Palace: Palace.Xun, PalacePosition: 2, Wuxing: wuxing.Mu },
    { ID: 0b110001, PalaceID: 0b110110, Rank: 42, Name: "风雷益", ShortName: "益", Symbol: "䷩", Palace: Palace.Xun, PalacePosition: 3, Wuxing: wuxing.Mu },
    { ID: 0b111001, PalaceID: 0b110110, Rank: 25, Name: "天雷无妄", ShortName: "无妄", Symbol: "䷘", Palace: Palace.Xun, PalacePosition: 4, Wuxing: wuxing.Mu },
    { ID: 0b101001, PalaceID: 0b110110, Rank: 21, Name: "火雷噬嗑", ShortName: "噬嗑", Symbol: "䷔", Palace: Palace.Xun, PalacePosition: 5, Wuxing: wuxing.Mu },
    { ID: 0b100001, PalaceID: 0b110110, Rank: 27, Name: "山雷颐", ShortName: "颐", Symbol: "䷚", Palace: Palace.Xun, PalacePosition: 6, Wuxing: wuxing.Mu },
    { ID: 0b100110, PalaceID: 0b110110, Rank: 18, Name: "山风蛊", ShortName: "蛊", Symbol: "䷑", Palace: Palace.Xun, PalacePosition: 7, Wuxing: wuxing.Mu },
    // 坎宫
    { ID: 0b010010, PalaceID: 0b010010, Rank: 29, Name: "坎为水", ShortName: "水", Symbol: "䷜", Palace: Palace.Kan, PalacePosition: 0, Wuxing: wuxing.Shui },
    { ID: 0b010011, PalaceID: 0b010010, Rank: 60, Name: "水泽节", ShortName: "节", Symbol: "䷻", Palace: Palace.Kan, PalacePosition: 1, Wuxing: wuxing.Shui },
    { ID: 0b010001, PalaceID: 0b010010, Rank: 3, Name: "水雷屯", ShortName: "屯", Symbol: "䷂", Palace: Palace.Kan, PalacePosition: 2, Wuxing: wuxing.Shui },
    { ID: 0b010101, PalaceID: 0b010010, Rank: 63, Name: "水火既济", ShortName: "既济", Symbol: "䷾", Palace: Palace.Kan, PalacePosition: 3, Wuxing: wuxing.Shui },
    { ID: 0b011101, PalaceID: 0b010010, Rank: 49, Name: "泽火革", ShortName: "革", Symbol: "䷰", Palace: Palace.Kan, PalacePosition: 4, Wuxing: wuxing.Shui },
    { ID: 0b001101, PalaceID: 0b010010, Rank: 55, Name: "雷火丰", ShortName: "丰", Symbol: "䷶", Palace: Palace.Kan, PalacePosition: 5, Wuxing: wuxing.Shui },
    { ID: 0b000101, PalaceID: 0b010010, Rank: 36, Name: "地火明夷", ShortName: "明夷", Symbol: "䷣", Palace: Palace.Kan, PalacePosition: 6, Wuxing: wuxing.Shui },
    { ID: 0b000010, PalaceID: 0b010010, Rank: 7, Name: "地水师", ShortName: "师", Symbol: "䷆", Palace: Palace.Kan, PalacePosition: 7, Wuxing: wuxing.Shui },
    // 艮宫
    { ID: 0b100100, PalaceID: 0b100100, Rank: 52, Name: "艮为山", ShortName: "山", Symbol: "䷳", Palace: Palace.Gen, PalacePosition: 0, Wuxing: wuxing.Tu },
    { ID: 0b100101, PalaceID: 0b100100, Rank: 22, Name: "山火贲", ShortName: "贲", Symbol: "䷕", Palace: Palace.Gen, PalacePosition: 1, Wuxing: wuxing.Tu },
    { ID: 0b100111, PalaceID: 0b100100, Rank: 26, Name: "山天大畜", ShortName: "大畜", Symbol: "䷙", Palace: Palace.Gen, PalacePosition: 2, Wuxing: wuxing.Tu },
    { ID: 0b100011, PalaceID: 0b100100, Rank: 41, Name: "山泽损", ShortName: "损", Symbol: "䷨", Palace: Palace.Gen, PalacePosition: 3, Wuxing: wuxing.Tu },
    { ID: 0b101011, PalaceID: 0b100100, Rank: 38, Name: "火泽睽", ShortName: "睽", Symbol: "䷥", Palace: Palace.Gen, PalacePosition: 4, Wuxing: wuxing.Tu },
    { ID: 0b111011, PalaceID: 0b100100, Rank: 10, Name: "天泽履", ShortName: "履", Symbol: "䷉", Palace: Palace.Gen, PalacePosition: 5, Wuxing: wuxing.Tu },
    { ID: 0b110011, PalaceID: 0b100100, Rank: 61, Name: "风泽中孚", ShortName: "中孚", Symbol: "䷼", Palace: Palace.Gen, PalacePosition: 6, Wuxing: wuxing.Tu },
    { ID: 0b110100, PalaceID: 0b100100, Rank: 53, Name: "风山渐", ShortName: "渐", Symbol: "䷴", Palace: Palace.Gen, PalacePosition: 7, Wuxing: wuxing.Tu },
    // 坤宫
    { ID: 0b000000, PalaceID: 0b000000, Rank: 2, Name: "坤为地", ShortName: "地", Symbol: "䷁", Palace: Palace.Kun, PalacePosition: 0, Wuxing: wuxing.Tu },
    { ID: 0b000001, PalaceID: 0b000000, Rank: 24, Name: "地雷复", ShortName: "复", Symbol: "䷗", Palace: Palace.Kun, PalacePosition: 1, Wuxing: wuxing.Tu },
    { ID: 0b000011, PalaceID: 0b000000, Rank: 19, Name: "地泽临", ShortName: "临", Symbol: "䷒", Palace: Palace.Kun, PalacePosition: 2, Wuxing: wuxing.Tu },
    { ID: 0b000111, PalaceID: 0b000000, Rank: 11, Name: "地天泰", ShortName: "泰", Symbol: "䷊", Palace: Palace.Kun, PalacePosition: 3, Wuxing: wuxing.Tu },
    { ID: 0b001111, PalaceID: 0b000000, Rank: 34, Name: "雷天大壮", ShortName: "大壮", Symbol: "䷡", Palace: Palace.Kun, PalacePosition: 4, Wuxing: wuxing.Tu },
    { ID: 0b011111, PalaceID: 0b000000, Rank: 43, Name: "泽天夬", ShortName: "夬", Symbol: "䷪", Palace: Palace.Kun, PalacePosition: 5, Wuxing: wuxing.Tu },
    { ID: 0b010111, PalaceID: 0b000000, Rank: 5, Name: "水天需", ShortName: "需", Symbol: "䷄", Palace: Palace.Kun, PalacePosition: 6, Wuxing: wuxing.Tu },
    { ID: 0b010000, PalaceID: 0b000000, Rank: 8, Name: "水地比", ShortName: "比", Symbol: "䷇", Palace: Palace.Kun, PalacePosition: 7, Wuxing: wuxing.Tu },
];


export function getGuaByName(name: string): Gua64 {
    for (let i = 0; i < gua64List.length; i++) {
        if (gua64List[i].Name === name) {
            return gua64List[i];
        }
    }
    return gua64List[0];
}

export function getGuaByID(id: number): Gua64 {
    for (let g of gua64List) {
        if (g.ID == id) {
            return g;
        }
    }
    return gua64List[id];
}

// GenerateByName 通过八卦名生成64卦
export function generateByName(outer: bagua.Gua, inner: bagua.Gua): Gua64 | undefined {
    let outerGua = bagua.getGuaByName(outer)
    let innerGua = bagua.getGuaByName(inner)
    if (outerGua == undefined || innerGua == undefined) {
        return
    }
    let id = outerGua.ID << 3 ^ innerGua.ID
    return getGuaByID(id)
}
