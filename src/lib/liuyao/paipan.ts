import { Elements as zhiEle, getDiZhiByName } from "../dizhi";
import { Elements as ganEle } from "../tiangan";
import * as ganzhi from "../ganzhi";
import { YinYang } from '../wuxing';
import * as gua64 from "../gua64";
import { LiuShen, getLiuShenList } from './liushen';
import { LiuQin, getLiuqin } from './liuqin';
import { getNaJia } from "./najia";
import { NewLineKind } from "typescript";
import { getShensha } from "./shensha";
import { SolarTime } from "tyme4ts";
export const enum GuaType {
    Undefined = "",
    LiuheGua = "六合",
    LiuchongGua = "六冲",
    YouhunGua = "游魂",
    GuihunGua = "归魂",
}

export const enum YaoType {
    Undefined = 0,
    LaoYin = 6,
    ShaoYang = 7,
    ShaoYin = 8,
    LaoYang = 9,
}
export const PaiPanMode: Map<string, string> = new Map([
    ["online", "在线摇卦"],
    ["manual", "手动指定"],
    ["name", "卦名起卦"],
]);
export const enum YaoSymbol {
    Undefined = "",
    SymbolDan = "′",// 少阳
    SymbolChai = "″", // 少阴
    SymbolZhong = "○", // 老阳
    SymbolJiao = "×", // 老阴
}
const guaCategory: Map<string, GuaType> = new Map([
    ["地天泰", GuaType.LiuheGua],
    ["天地否", GuaType.LiuheGua],
    ["水泽节", GuaType.LiuheGua],
    ["泽水困", GuaType.LiuheGua],
    ["山火贲", GuaType.LiuheGua],
    ["火山旅", GuaType.LiuheGua],
    ["地雷复", GuaType.LiuheGua],
    ["雷地豫", GuaType.LiuheGua],
    ["水山蹇", GuaType.LiuheGua],
    ["天火同人", GuaType.LiuheGua],

    ["乾为天", GuaType.LiuchongGua],
    ["坤为地", GuaType.LiuchongGua],
    ["坎为水", GuaType.LiuchongGua],
    ["离为火", GuaType.LiuchongGua],
    ["震为雷", GuaType.LiuchongGua],
    ["艮为山", GuaType.LiuchongGua],
    ["巽为风", GuaType.LiuchongGua],
    ["兑为泽", GuaType.LiuchongGua],
    ["天雷无妄", GuaType.LiuchongGua],
    ["雷天大壮", GuaType.LiuchongGua],
]);
// 卦身
const guaShen: Map<YinYang, zhiEle[]> = new Map([
    [YinYang.Yang, [zhiEle.Zi, zhiEle.Chou, zhiEle.Yin, zhiEle.Mao, zhiEle.Chen, zhiEle.Si]],
    [YinYang.Yin, [zhiEle.Wu, zhiEle.Wei, zhiEle.Shen, zhiEle.You, zhiEle.Xu, zhiEle.Hai]],
]);

export interface Yao {
    YinYang: YinYang // 阴阳
    Symbol: YaoSymbol     // 符号
    ShiYing: string
    LiuShen: LiuShen
    LiuQin: LiuQin
    NaYin: string
    XingXiu: string
    GanZhi: ganzhi.GanZhi
    FuShenLiuQin: LiuQin
    FuShenNaYin: string
    FuShenGanZhi: ganzhi.GanZhi
    WangXiang: string// 旺相休囚
    ZhangSheng: string// 十二长生
}
function newYao(): Yao {
    return {
        YinYang: YinYang.Undefined,
        Symbol: YaoSymbol.Undefined,
        ShiYing: "",
        LiuShen: LiuShen.Undefined,
        LiuQin: LiuQin.Undefined,
        NaYin: "",
        XingXiu: "",
        GanZhi: new ganzhi.GanZhi(ganEle.Undefined, zhiEle.Undefined),
        FuShenLiuQin: LiuQin.Undefined,
        FuShenNaYin: "",
        FuShenGanZhi: new ganzhi.GanZhi(ganEle.Undefined, zhiEle.Undefined),
        WangXiang: "",
        ZhangSheng: "",
    }
}
export interface Case {
    Question: string             // 问念
    Category: string             // 类别
    Mode: string             // 起卦方式
    Datetime: string          // 起卦时间
    GanZhiTime: ganzhi.Time | undefined       // 干支时间
    BenGua: Gua                // 本卦
    BianGua: Gua                // 变卦
    Shensha: Map<string, string>  //神煞
}
export function newCase(): Case {
    return {
        Question: "",
        Category: "",
        Mode: "",
        Datetime: "",
        GanZhiTime: undefined,
        BenGua: newGua(),
        BianGua: newGua(),
        Shensha: new Map<string, string>(),
    }
}
export interface Gua {
    Name: string
    Palace: gua64.Palace
    Shen: zhiEle
    HeChong: GuaType
    YouGui: GuaType
    Yaos: Yao[]
}

function newGua(): Gua {
    return {
        Name: "",
        Palace: gua64.Palace.Undefined,
        Shen: zhiEle.Undefined,
        HeChong: GuaType.Undefined,
        YouGui: GuaType.Undefined,
        Yaos: new Array<Yao>(6),
    }
}

interface ShiYingYouGui {
    Shi: number
    Ying: number
    YouGui: GuaType
}
//return 世爻位置，应爻位置，游魂或归魂卦
export function getShiYing(position: number): ShiYingYouGui {
    switch (position) {
        case 0:
            return { Shi: 5, Ying: 2, YouGui: GuaType.Undefined }
        case 1:
            return { Shi: 0, Ying: 3, YouGui: GuaType.Undefined }
        case 2:
            return { Shi: 1, Ying: 4, YouGui: GuaType.Undefined }
        case 3:
            return { Shi: 2, Ying: 5, YouGui: GuaType.Undefined }
        case 4:
            return { Shi: 3, Ying: 0, YouGui: GuaType.Undefined }
        case 5:
            return { Shi: 4, Ying: 1, YouGui: GuaType.Undefined }
        case 6:
            return { Shi: 3, Ying: 0, YouGui: GuaType.YouhunGua }
        case 7:
            return { Shi: 2, Ying: 5, YouGui: GuaType.GuihunGua }
    }
    return { Shi: 0, Ying: 0, YouGui: GuaType.Undefined }
}

export function Paipan(date: Date, question: string, mode: string, yaoList: number[], benguaName: string = "", bianguaName: string = ""): Case | undefined {
    if (mode === "name") {
        const bengua = gua64.getGuaByName(benguaName)
        const biangua = gua64.getGuaByName(bianguaName)
        let benID = bengua.ID
        let bianID = biangua.ID
        const yao = new Array<number>(6)
        for (let i = 0; i < 6; i++) {
            let a = benID & 1
            let b = bianID & 1
            let y = YaoType.Undefined
            if (a == 0 && b == 0) {
                y = YaoType.ShaoYin
            } else if (a == 1 && b == 1) {
                y = YaoType.ShaoYang
            } else if (a == 0 && b == 1) {
                y = YaoType.LaoYin
            } else if (a == 1 && b == 0) {
                y = YaoType.LaoYang
            }
            benID = benID >> 1
            bianID = bianID >> 1
            yao[i] = y
        }
        yaoList = yao
    }
    if (yaoList.length != 6) {
        return undefined
    }
    if (date instanceof Date === false) {
        date = new Date(date)
    }
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const solar = SolarTime.fromYmdHms(year, month, day, hour, minute, 0)
    const sixtyCycle = solar.getSixtyCycleHour()
    const gzTime = new ganzhi.Time(
        ganzhi.newGanZhiFromString(sixtyCycle.getYear().getName()),
        ganzhi.newGanZhiFromString(sixtyCycle.getMonth().getName()),
        ganzhi.newGanZhiFromString(sixtyCycle.getDay().getName()),
        ganzhi.newGanZhiFromString(sixtyCycle.getSixtyCycle().getName()),
    )

    const [ben, bian]: [Gua, Gua] = YaoToGua(gzTime, yaoList)
    return {
        Question: question,
        Category: "",
        Mode: PaiPanMode.get(mode) || "",
        Datetime: year + "-" + month + "-" + day + " " + hour + ":" + minute,
        GanZhiTime: gzTime,
        BenGua: ben,
        BianGua: bian,
        Shensha: getShensha(gzTime),
    }
}

export function YaoToGua(time: ganzhi.Time, yao: number[]): [Gua, Gua] {
    let benguaID = 0
    let bianguaID = 0
    let hasBian = false
    const liushen = getLiuShenList(time.Day.Gan)
    let benguaYao = new Array<Yao>(6)
    let bianguaYao = new Array<Yao>(6)
    for (let i = 0; i < yao.length; i++) {
        let t = newYao()
        let t2 = newYao()
        t.LiuShen = liushen[i]
        t2.LiuShen = liushen[i]
        let y = yao[i]
        switch (y) {
            case YaoType.LaoYin:
                bianguaID += 1 << i
                hasBian = true
                t.YinYang = YinYang.Yin
                t2.YinYang = YinYang.Yang
                t.Symbol = YaoSymbol.SymbolJiao
                break
            case YaoType.ShaoYang:
                benguaID += 1 << i
                bianguaID += 1 << i
                t.Symbol = YaoSymbol.SymbolDan
                t.YinYang = YinYang.Yang
                t2.YinYang = YinYang.Yang
                break
            case YaoType.ShaoYin:
                t.Symbol = YaoSymbol.SymbolChai
                t.YinYang = YinYang.Yin
                t2.YinYang = YinYang.Yin
                break
            case YaoType.LaoYang:
                benguaID += 1 << i
                hasBian = true
                t.Symbol = YaoSymbol.SymbolZhong
                t.YinYang = YinYang.Yang
                t2.YinYang = YinYang.Yin
                break
        }

        benguaYao[i] = t
        bianguaYao[i] = t2
    }
    let bengua = gua64.getGuaByID(benguaID)
    // 按世应
    const shiying = getShiYing(bengua.PalacePosition)
    benguaYao[shiying.Shi].ShiYing = "世"
    benguaYao[shiying.Ying].ShiYing = "应"
    const benguaNajia = getNaJia(bengua.ID)
    // 六亲，浑天甲子
    const liuqinMap = new Map<LiuQin, number>()
    for (let i = 0; i < benguaYao.length; i++) {
        let zhiWuxing = getDiZhiByName(benguaNajia[i].Zhi).Wuxing
        benguaYao[i].GanZhi = benguaNajia[i]
        benguaYao[i].NaYin = benguaNajia[i].nayin()
        benguaYao[i].LiuQin = getLiuqin(bengua.Wuxing, zhiWuxing)
        liuqinMap.set(benguaYao[i].LiuQin, 1)
    }
    // 伏神
    if (bengua.ID != bengua.PalaceID) {
        const palaceGua = gua64.getGuaByID(bengua.PalaceID)
        const palaceNajia = getNaJia(palaceGua.ID)
        for (let i = 0; i < palaceNajia.length; i++) {
            const zhiWuxing = getDiZhiByName(palaceNajia[i].Zhi).Wuxing
            const lq = getLiuqin(palaceGua.Wuxing, zhiWuxing)
            if (!liuqinMap.has(lq)) {
                benguaYao[i].FuShenLiuQin = lq
                benguaYao[i].FuShenGanZhi = palaceNajia[i]
                benguaYao[i].FuShenNaYin = palaceNajia[i].nayin()
            }
        }
    }
    let benGua = newGua()
    let bianGua = newGua()
    benGua.Name = bengua.Name
    benGua.Palace = bengua.Palace
    const guaShenList = guaShen.get(benguaYao[shiying.Shi].YinYang);
    if (guaShenList) {
        benGua.Shen = guaShenList[shiying.Shi];
    }
    benGua.YouGui = shiying.YouGui
    benGua.Yaos = benguaYao
    if (hasBian) {
        let cg = gua64.getGuaByID(bianguaID)
        let bianguaNajia = getNaJia(cg.ID)
        for (let i = 0; i < bianguaYao.length; i++) {
            const zhiWuxing = getDiZhiByName(bianguaNajia[i].Zhi).Wuxing
            bianguaYao[i].GanZhi = bianguaNajia[i]
            bianguaYao[i].NaYin = bianguaNajia[i].nayin()
            bianguaYao[i].LiuQin = getLiuqin(bengua.Wuxing, zhiWuxing)
        }
        const shiying = getShiYing(cg.PalacePosition)
        bianguaYao[shiying.Shi].ShiYing = "世"
        bianguaYao[shiying.Ying].ShiYing = "应"
        bianGua.Name = cg.Name
        bianGua.Palace = cg.Palace
        const guaShenList = guaShen.get(bianguaYao[shiying.Shi].YinYang);
        if (guaShenList) {
            bianGua.Shen = guaShenList[shiying.Shi];
        }
        bianGua.YouGui = shiying.YouGui
        bianGua.Yaos = bianguaYao
    } else {
        bianGua = benGua
    }
    return [benGua, bianGua]
}
