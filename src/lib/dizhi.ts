import * as wuxing from './wuxing.js';
export enum Elements {
    Undefined = "",
    Zi = "子",
    Chou = "丑",
    Yin = "寅",
    Mao = "卯",
    Chen = "辰",
    Si = "巳",
    Wu = "午",
    Wei = "未",
    Shen = "申",
    You = "酉",
    Xu = "戌",
    Hai = "亥",
}
export class DiZhi {
    Name: Elements;
    Rank: number;
    Wuxing: wuxing.Elements;

    constructor(name: Elements, rank: number, wuxing: wuxing.Elements) {
        this.Name = name;
        this.Rank = rank;
        this.Wuxing = wuxing;
    }
}
const data: DiZhi[] = [
    new DiZhi(Elements.Undefined, 0, wuxing.Elements.Undefined),
    new DiZhi(Elements.Zi, 1, wuxing.Elements.Shui),
    new DiZhi(Elements.Chou, 2, wuxing.Elements.Tu),
    new DiZhi(Elements.Yin, 3, wuxing.Elements.Mu),
    new DiZhi(Elements.Mao, 4, wuxing.Elements.Mu),
    new DiZhi(Elements.Chen, 5, wuxing.Elements.Tu),
    new DiZhi(Elements.Si, 6, wuxing.Elements.Huo),
    new DiZhi(Elements.Wu, 7, wuxing.Elements.Huo),
    new DiZhi(Elements.Wei, 8, wuxing.Elements.Tu),
    new DiZhi(Elements.Shen, 9, wuxing.Elements.Jin),
    new DiZhi(Elements.You, 10, wuxing.Elements.Jin),
    new DiZhi(Elements.Xu, 11, wuxing.Elements.Tu),
    new DiZhi(Elements.Hai, 12, wuxing.Elements.Shui),
];

export function getDiZhiByName(zhi: Elements): DiZhi {
    for (const v of data) {
        if (v.Name === zhi) {
            return v;
        }
    }
    return data[0];
}

export function getDiZhiByRank(rank: number): DiZhi {
    if (rank < 1 || rank > 12) {
        return data[0];
    }
    return data[rank];
}