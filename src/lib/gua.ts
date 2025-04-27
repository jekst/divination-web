import { Wuxing as wuxing } from "./base";
export enum Gua {
    Qian = "乾",
    Dui = "兑",
    Li = "离",
    Zhen = "震",
    Xun = "巽",
    Kan = "坎",
    Gen = "艮",
    Kun = "坤"
};
export class BaGua {
    ID: number;
    Rank: number;
    Name: Gua;
    Symbol: string;
    Wuxing: wuxing;

    constructor(id: number, rank: number, name: Gua, symbol: string, wuxing: wuxing) {
        this.ID = id;
        this.Rank = rank;
        this.Name = name;
        this.Symbol = symbol;
        this.Wuxing = wuxing;
    }
}
export const buguaList: BaGua[] = [
    new BaGua(0b111, 1, Gua.Qian, "☰", wuxing.Jin),
    new BaGua(0b011, 2, Gua.Dui, "☱", wuxing.Jin),
    new BaGua(0b001, 3, Gua.Zhen, "☳", wuxing.Mu),
    new BaGua(0b101, 4, Gua.Li, "☲", wuxing.Huo),
    new BaGua(0b110, 5, Gua.Xun, "☴", wuxing.Mu),
    new BaGua(0b010, 6, Gua.Kan, "☵", wuxing.Shui),
    new BaGua(0b100, 7, Gua.Gen, "☶", wuxing.Tu),
    new BaGua(0b000, 8, Gua.Kun, "☷", wuxing.Tu),
];


export function getGuaByID(id: number): BaGua {
    for (let g of buguaList) {
        if (g.ID == id) {
            return g;
        }
    }
    return buguaList[id];
}

export function getGuaByName(name: Gua): BaGua {
    for (let i = 0; i < buguaList.length; i++) {
        if (buguaList[i].Name === name) {
            return buguaList[i];
        }
    }
    return buguaList[0];
}
