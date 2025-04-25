import * as wuxing from './wuxing.js';
export enum Elements {
    Undefined = "",
    Jia = "甲",
    Yi = "乙",
    Bing = "丙",
    Ding = "丁",
    Wu = "戊",
    Ji = "己",
    Geng = "庚",
    Xin = "辛",
    Ren = "壬",
    Gui = "癸",
}

export class TianGan {
    Name: Elements;
    Rank: number;
    Wuxing: wuxing.Elements;

    constructor(name: Elements, rank: number, wuxing: wuxing.Elements) {
        this.Name = name;
        this.Rank = rank;
        this.Wuxing = wuxing;
    }
}

const data: TianGan[] = [
    new TianGan(Elements.Undefined, 0, wuxing.Elements.Undefined),
    new TianGan(Elements.Jia, 1, wuxing.Elements.Mu),
    new TianGan(Elements.Yi, 2, wuxing.Elements.Mu),
    new TianGan(Elements.Bing, 3, wuxing.Elements.Huo),
    new TianGan(Elements.Ding, 4, wuxing.Elements.Huo),
    new TianGan(Elements.Wu, 5, wuxing.Elements.Tu),
    new TianGan(Elements.Ji, 6, wuxing.Elements.Tu),
    new TianGan(Elements.Geng, 7, wuxing.Elements.Jin),
    new TianGan(Elements.Xin, 8, wuxing.Elements.Jin),
    new TianGan(Elements.Ren, 9, wuxing.Elements.Shui),
    new TianGan(Elements.Gui, 10, wuxing.Elements.Shui),
];

export function getTianGanByName(gan: Elements): TianGan {
    for (const v of data) {
        if (v.Name === gan) {
            return v;
        }
    }
    return data[0];
}

export function getTianGanByRank(rank: number): TianGan {
    if (rank < 1 || rank > 10) {
        return data[0];
    }
    return data[rank];
}