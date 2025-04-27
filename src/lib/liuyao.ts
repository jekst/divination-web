import { WuxingRelation, TianGan, DiZhi, GanZhi, Wuxing, GanZhiTime, YinYang } from "./base"
import * as bagua from "./gua"
import * as gua64 from "./gua64";
class LiuQin {
    static readonly FuMu = "父母"
    static readonly XiongDi = "兄弟"
    static readonly QiCai = "妻财"
    static readonly ZiSun = "子孙"
    static readonly GuanGui = "官鬼"
    static get(palaceWuxing: string, yaoWuxing: string): string {
        let r = Wuxing.getRelation(palaceWuxing, yaoWuxing)
        switch (r) {
            case WuxingRelation.ShengWo:
                return LiuQin.FuMu
            case WuxingRelation.TongWo:
                return LiuQin.XiongDi
            case WuxingRelation.WoSheng:
                return LiuQin.ZiSun
            case WuxingRelation.WoKe:
                return LiuQin.QiCai
            case WuxingRelation.KeWo:
                return LiuQin.GuanGui
            default:
                return ''
        }
    }
}

class LiuShen {
    static readonly Qinglong = "青龙"
    static readonly Zhuque = "朱雀"
    static readonly Gouchen = "勾陈"
    static readonly Tengshe = "螣蛇"
    static readonly Baihu = "白虎"
    static readonly Xuanwu = "玄武"
    static liushenList = new Array<string>(
        LiuShen.Qinglong,
        LiuShen.Zhuque,
        LiuShen.Gouchen,
        LiuShen.Tengshe,
        LiuShen.Baihu,
        LiuShen.Xuanwu,
    )
    static get(dayGan: string): LiuShen[] {
        let start = 0
        switch (dayGan) {
            case TianGan.Jia:
            case TianGan.Yi:
                start = 0 // 青龙起始
                break
            case TianGan.Bing:
            case TianGan.Ding:
                start = 1 // 朱雀起始
                break
            case TianGan.Wu:
                start = 2 // 勾陈起始
                break
            case TianGan.Ji:
                start = 3 // 螣蛇起始
                break
            case TianGan.Geng:

            case TianGan.Xin:
                start = 4 // 白虎起始
                break
            case TianGan.Ren:
            case TianGan.Gui:
                start = 5 // 玄武起始
                break
            default:
                start = 0 // 青龙起始
        }
        return [...LiuShen.liushenList.slice(start), ...LiuShen.liushenList.slice(0, start)]
    }
}

interface najiaItem {
    InnerStart: GanZhi
    OuterStart: GanZhi
    Step: number
}
class NaJia {
    static readonly baguaNaJia = NaJia.generateBaGuaNaJia()
    // 乾金甲子外壬午，坎水戊寅外戊申。
    // 艮土丙辰外丙戌，震木庚子外庚午。
    // 巽木辛丑外辛未，离火己卯外己酉。
    // 坤土乙未外癸丑，兑金丁巳外丁亥。
    static generateBaGuaNaJia(): Map<string, Array<GanZhi>> {
        const najia = new Map<string, najiaItem>([
            ["乾", { InnerStart: new GanZhi(TianGan.Jia, DiZhi.Zi), OuterStart: new GanZhi(TianGan.Ren, DiZhi.Wu), Step: 2 }],
            ["坎", { InnerStart: new GanZhi(TianGan.Wu, DiZhi.Yin), OuterStart: new GanZhi(TianGan.Wu, DiZhi.Shen), Step: 2 }],
            ["艮", { InnerStart: new GanZhi(TianGan.Bing, DiZhi.Chen), OuterStart: new GanZhi(TianGan.Bing, DiZhi.Xu), Step: 2 }],
            ["震", { InnerStart: new GanZhi(TianGan.Geng, DiZhi.Zi), OuterStart: new GanZhi(TianGan.Geng, DiZhi.Wu), Step: 2 }],
            ["巽", { InnerStart: new GanZhi(TianGan.Xin, DiZhi.Chou), OuterStart: new GanZhi(TianGan.Xin, DiZhi.Wei), Step: -2 }],
            ["离", { InnerStart: new GanZhi(TianGan.Ji, DiZhi.Mao), OuterStart: new GanZhi(TianGan.Ji, DiZhi.You), Step: -2 }],
            ["坤", { InnerStart: new GanZhi(TianGan.Yi, DiZhi.Wei), OuterStart: new GanZhi(TianGan.Gui, DiZhi.Chou), Step: -2 }],
            ["兑", { InnerStart: new GanZhi(TianGan.Ding, DiZhi.Si), OuterStart: new GanZhi(TianGan.Ding, DiZhi.Hai), Step: -2 }],
        ]);
        let ret = new Map<string, Array<GanZhi>>();
        for (let i = 0; i < bagua.buguaList.length; i++) {
            const g = bagua.buguaList[i];
            const nj = najia.get(g.Name);
            if (!nj) {
                throw new Error(`NaJia not found for ${g.Name}`);
            }
            let inner = nj.InnerStart;
            let gz = new Array<GanZhi>(6);
            for (let j = 0; j < 3; j++) {
                gz[j] = inner
                let zr = inner.getDiZhiIndex() + nj.Step
                if (zr <= 0) {
                    zr += 12
                }
                if (zr > 12) {
                    zr %= 12
                }
                inner = GanZhi.fromIndex(inner.getTianGanIndex(), zr)
            }
            let outer = nj.OuterStart
            for (let k = 3; k < 6; k++) {
                gz[k] = outer
                let zr = outer.getDiZhiIndex() + nj.Step
                if (zr <= 0) {
                    zr += 12
                }
                if (zr > 12) {
                    zr %= 12
                }
                outer = GanZhi.fromIndex(outer.getTianGanIndex(), zr)
            }
            ret.set(g.Name, gz)
        }
        return ret
    }

    static get(guaID: number): Array<GanZhi> {
        const innerID = guaID & 0b111
        const innerGua = bagua.getGuaByID(innerID)
        const nj = NaJia.baguaNaJia.get(innerGua.Name)
        if (!nj) {
            throw new Error(`NaJia not found for ${innerGua.Name}`);
        }
        let ret = new Array<GanZhi>(6)
        for (let i = 0; i < 3; i++) {
            ret[i] = nj[i];
        }
        const outerID = guaID >> 3
        const outerGua = bagua.getGuaByID(outerID)
        const bnj = NaJia.baguaNaJia.get(outerGua.Name)
        if (!bnj) {
            throw new Error(`NaJia not found for ${outerGua.Name}`);
        }
        for (let i = 3; i < 6; i++) {
            ret[i] = bnj[i]
        }
        return ret
    }
}

class ShenSha {
    static readonly guiren = "贵人"
    static readonly lushen = "禄神"
    static readonly yangren = "羊刃"
    static readonly wenchang = "文昌"
    static readonly yima = "驿马"
    static readonly taohua = "桃花"
    static readonly jiangxing = "将星"
    static readonly jiesha = "劫煞"
    static readonly huagai = "华盖"
    static readonly mouxing = "谋星"
    static readonly tianyi = "天医"
    static readonly tianxi = "天喜"
    static readonly zaisha = "灾煞"

    static readonly data: Record<string, Record<string, string>> = {
        [ShenSha.guiren]: {
            "甲": "丑未",
            "戊": "丑未",
            "庚": "丑未",
            "乙": "子申",
            "己": "子申",
            "丙": "亥酉",
            "丁": "亥酉",
            "壬": "巳卯",
            "癸": "巳卯",
            "辛": "寅午",
        },
        [ShenSha.lushen]: {
            "甲": "寅",
            "乙": "卯",
            "丙": "巳",
            "丁": "午",
            "戊": "巳",
            "己": "午",
            "庚": "申",
            "辛": "酉",
            "壬": "亥",
            "癸": "子",
        },
        [ShenSha.yangren]: {
            "甲": "卯",
            "乙": "寅",
            "丙": "午",
            "丁": "巳",
            "戊": "午",
            "己": "巳",
            "庚": "酉",
            "辛": "申",
            "壬": "子",
            "癸": "亥",
        },
        [ShenSha.wenchang]: {
            "甲": "巳",
            "乙": "午",
            "丙": "申",
            "丁": "酉",
            "戊": "申",
            "己": "酉",
            "庚": "亥",
            "辛": "子",
            "壬": "寅",
            "癸": "卯",
        },
        [ShenSha.yima]: {
            "申": "寅",
            "子": "寅",
            "辰": "寅",
            "巳": "亥",
            "酉": "亥",
            "丑": "亥",
            "寅": "申",
            "午": "申",
            "戌": "申",
            "亥": "巳",
            "卯": "巳",
            "未": "巳",
        },
        [ShenSha.taohua]: {
            "申": "酉",
            "子": "酉",
            "辰": "酉",
            "巳": "午",
            "酉": "午",
            "丑": "午",
            "寅": "卯",
            "午": "卯",
            "戌": "卯",
            "亥": "子",
            "卯": "子",
            "未": "子",
        },
        [ShenSha.jiangxing]: {
            "申": "子",
            "子": "子",
            "辰": "子",
            "巳": "酉",
            "酉": "酉",
            "丑": "酉",
            "寅": "午",
            "午": "午",
            "戌": "午",
            "亥": "卯",
            "卯": "卯",
            "未": "卯",
        },
        [ShenSha.jiesha]: {
            "申": "巳",
            "子": "巳",
            "辰": "巳",
            "巳": "寅",
            "酉": "寅",
            "丑": "寅",
            "寅": "亥",
            "午": "亥",
            "戌": "亥",
            "亥": "申",
            "卯": "申",
            "未": "申",
        },
        [ShenSha.huagai]: {
            "申": "辰",
            "子": "辰",
            "辰": "辰",
            "巳": "丑",
            "酉": "丑",
            "丑": "丑",
            "寅": "戌",
            "午": "戌",
            "戌": "戌",
            "亥": "未",
            "卯": "未",
            "未": "未"
        },
        [ShenSha.mouxing]: {
            "申": "戌",
            "子": "戌",
            "辰": "戌",
            "巳": "未",
            "酉": "未",
            "丑": "未",
            "寅": "辰",
            "午": "辰",
            "戌": "辰",
            "亥": "丑",
            "卯": "丑",
            "未": "丑"
        },
        [ShenSha.zaisha]: {
            "申": "午",
            "子": "午",
            "辰": "午",
            "巳": "卯",
            "酉": "卯",
            "丑": "卯",
            "寅": "子",
            "午": "子",
            "戌": "子",
            "亥": "酉",
            "卯": "酉",
            "未": "酉"
        },
        [ShenSha.tianyi]: {
            "子": "亥",
            "丑": "子",
            "寅": "丑",
            "卯": "寅",
            "辰": "卯",
            "巳": "辰",
            "午": "巳",
            "未": "午",
            "申": "未",
            "酉": "申",
            "戌": "酉",
            "亥": "戌"
        },
        [ShenSha.tianxi]: {
            "亥": "未",
            "子": "未",
            "丑": "未",
            "寅": "戌",
            "卯": "戌",
            "辰": "戌",
            "巳": "丑",
            "午": "丑",
            "未": "丑",
            "申": "辰",
            "酉": "辰",
            "戌": "辰"
        }
    };
    static get(t: GanZhiTime): Map<string, string> {
        let ret = new Map<string, string>();
        ret.set(ShenSha.guiren, ShenSha.data[ShenSha.guiren]?.[t.Day.tianGan] ?? "");
        ret.set(ShenSha.lushen, ShenSha.data[ShenSha.lushen]?.[t.Day.tianGan] ?? "");
        ret.set(ShenSha.yangren, ShenSha.data[ShenSha.yangren]?.[t.Day.tianGan] ?? "");
        ret.set(ShenSha.wenchang, ShenSha.data[ShenSha.wenchang]?.[t.Day.tianGan] ?? "");
        ret.set(ShenSha.yima, ShenSha.data[ShenSha.yima]?.[t.Day.diZhi] ?? "");
        ret.set(ShenSha.taohua, ShenSha.data[ShenSha.taohua]?.[t.Day.diZhi] ?? "");
        ret.set(ShenSha.jiangxing, ShenSha.data[ShenSha.jiangxing]?.[t.Day.diZhi] ?? "");
        ret.set(ShenSha.jiesha, ShenSha.data[ShenSha.jiesha]?.[t.Day.diZhi] ?? "");
        ret.set(ShenSha.huagai, ShenSha.data[ShenSha.huagai]?.[t.Day.diZhi] ?? "");
        ret.set(ShenSha.mouxing, ShenSha.data[ShenSha.mouxing]?.[t.Day.diZhi] ?? "");
        ret.set(ShenSha.tianyi, ShenSha.data[ShenSha.tianyi]?.[t.Month.diZhi] ?? "");
        ret.set(ShenSha.tianxi, ShenSha.data[ShenSha.tianxi]?.[t.Month.diZhi] ?? "");
        ret.set(ShenSha.zaisha, ShenSha.data[ShenSha.zaisha]?.[t.Day.diZhi] ?? "");
        return ret
    }
}

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
export const Mode: Record<string, string> = {
    "online": "在线起卦",
    "manual": "手动指定",
    "name": "卦名起卦",
}
export const enum YaoSymbol {
    Undefined = "",
    SymbolDan = "′",// 少阳
    SymbolChai = "″", // 少阴
    SymbolZhong = "○", // 老阳
    SymbolJiao = "×", // 老阴
}
export type Yao = {
    YinYang: YinYang // 阴阳
    Symbol: YaoSymbol     // 符号
    ShiYing: string
    LiuShen: LiuShen
    LiuQin: LiuQin
    NaYin: string
    XingXiu: string
    GanZhi: GanZhi
    FuShenLiuQin: LiuQin
    FuShenNaYin: string
    FuShenGanZhi: GanZhi
    WangXiang: string// 旺相休囚
    ZhangSheng: string// 十二长生
}
export type Gua = {
    Name: string
    Palace: gua64.Palace
    Shen: string
    HeChong: GuaType
    YouGui: GuaType
    Yaos: Yao[]
}
export type Case = {
    Question: string             // 问念
    Category: string             // 类别
    Mode: string             // 起卦方式
    Datetime: string          // 起卦时间
    GanZhiTime: GanZhiTime | undefined       // 干支时间
    BenGua: Gua              // 本卦
    BianGua: Gua                // 变卦
    Shensha: Map<string, string>  //神煞
}
type GuaProperty = {
    Shi: number
    Ying: number
    YouGui: GuaType
}
export class LiuYao {
    yaos: Yao[] = new Array<Yao>(6)
    constructor() {
    }
    static readonly guaCategory: Record<string, GuaType> = {
        "地天泰": GuaType.LiuheGua,
        "天地否": GuaType.LiuheGua,
        "水泽节": GuaType.LiuheGua,
        "泽水困": GuaType.LiuheGua,
        "山火贲": GuaType.LiuheGua,
        "火山旅": GuaType.LiuheGua,
        "地雷复": GuaType.LiuheGua,
        "雷地豫": GuaType.LiuheGua,
        "水山蹇": GuaType.LiuheGua,
        "天火同人": GuaType.LiuheGua,

        "乾为天": GuaType.LiuchongGua,
        "坤为地": GuaType.LiuchongGua,
        "坎为水": GuaType.LiuchongGua,
        "离为火": GuaType.LiuchongGua,
        "震为雷": GuaType.LiuchongGua,
        "艮为山": GuaType.LiuchongGua,
        "巽为风": GuaType.LiuchongGua,
        "兑为泽": GuaType.LiuchongGua,
        "天雷无妄": GuaType.LiuchongGua,
        "雷天大壮": GuaType.LiuchongGua,
    }
    // 卦身
    static readonly guaShen: Record<YinYang, string[]> = {
        [YinYang.Yang]: [DiZhi.Zi, DiZhi.Chou, DiZhi.Yin, DiZhi.Mao, DiZhi.Chen, DiZhi.Si],
        [YinYang.Yin]: [DiZhi.Wu, DiZhi.Wei, DiZhi.Shen, DiZhi.You, DiZhi.Xu, DiZhi.Hai],
        [YinYang.Undefined]: [],
    }
    //return 世爻位置，应爻位置，游魂或归魂卦
    static getGuaProperty(position: number): GuaProperty {
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
    static Paipan(date: Date, question: string, mode: string, yaoList: number[], benguaName: string = "", bianguaName: string = ""): Case | undefined {
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
        const gzTime = GanZhiTime.fromDate(date)

        const [ben, bian]: [Gua, Gua] = LiuYao.YaoToGua(gzTime, yaoList)
        return {
            Question: question,
            Category: "",
            Mode: Mode[mode] ?? "",
            Datetime: year + "-" + month + "-" + day + " " + hour + ":" + minute,
            GanZhiTime: gzTime,
            BenGua: ben,
            BianGua: bian,
            Shensha: ShenSha.get(gzTime),
        }
    }

    static YaoToGua(time: GanZhiTime, yao: number[]): [Gua, Gua] {
        let benguaID = 0
        let bianguaID = 0
        let hasBian = false
        const liushen = LiuShen.get(time.Day.tianGan)
        let benguaYao = new Array<Yao>(6)
        let bianguaYao = new Array<Yao>(6)
        for (let i = 0; i < yao.length; i++) {
            let t: Yao = {
                LiuShen: liushen[i]
            } as Yao;
            let t2: Yao = {
                LiuShen: liushen[i]
            } as Yao;
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
        const pro = LiuYao.getGuaProperty(bengua.PalacePosition)
        benguaYao[pro.Shi].ShiYing = "世"
        benguaYao[pro.Ying].ShiYing = "应"
        const benguaNajia = NaJia.get(bengua.ID)
        // 六亲，浑天甲子
        const liuqinMap = new Map<LiuQin, number>()
        for (let i = 0; i < benguaYao.length; i++) {
            let zhiWuxing = DiZhi.getWuxing(benguaNajia[i].diZhi)
            benguaYao[i].GanZhi = benguaNajia[i]
            benguaYao[i].NaYin = benguaNajia[i].getNayin()
            benguaYao[i].LiuQin = LiuQin.get(bengua.Wuxing, zhiWuxing)
            liuqinMap.set(benguaYao[i].LiuQin, 1)
        }
        // 伏神
        if (bengua.ID != bengua.PalaceID) {
            const palaceGua = gua64.getGuaByID(bengua.PalaceID)
            const palaceNajia = NaJia.get(palaceGua.ID)
            for (let i = 0; i < palaceNajia.length; i++) {
                const zhiWuxing = DiZhi.getWuxing(palaceNajia[i].diZhi)
                const lq = LiuQin.get(palaceGua.Wuxing, zhiWuxing)
                if (!liuqinMap.has(lq)) {
                    benguaYao[i].FuShenLiuQin = lq
                    benguaYao[i].FuShenGanZhi = palaceNajia[i]
                    benguaYao[i].FuShenNaYin = palaceNajia[i].getNayin()
                }
            }
        }
        let benGua: Gua = {} as Gua
        let bianGua: Gua = {} as Gua
        benGua.Name = bengua.Name
        benGua.Palace = bengua.Palace
        const guaShenList = LiuYao.guaShen[benguaYao[pro.Shi].YinYang];
        if (guaShenList) {
            benGua.Shen = guaShenList[pro.Shi];
        }
        benGua.YouGui = pro.YouGui
        benGua.Yaos = benguaYao
        if (hasBian) {
            let cg = gua64.getGuaByID(bianguaID)
            let bianguaNajia = NaJia.get(cg.ID)
            for (let i = 0; i < bianguaYao.length; i++) {
                const zhiWuxing = DiZhi.getWuxing(bianguaNajia[i].diZhi)
                bianguaYao[i].GanZhi = bianguaNajia[i]
                bianguaYao[i].NaYin = bianguaNajia[i].getNayin()
                bianguaYao[i].LiuQin = LiuQin.get(bengua.Wuxing, zhiWuxing)
            }
            const pro = LiuYao.getGuaProperty(cg.PalacePosition)
            bianguaYao[pro.Shi].ShiYing = "世"
            bianguaYao[pro.Ying].ShiYing = "应"
            bianGua.Name = cg.Name
            bianGua.Palace = cg.Palace
            const guaShenList = LiuYao.guaShen[bianguaYao[pro.Shi].YinYang];
            if (guaShenList) {
                bianGua.Shen = guaShenList[pro.Shi];
            }
            bianGua.YouGui = pro.YouGui
            bianGua.Yaos = bianguaYao
        } else {
            bianGua = benGua
        }
        return [benGua, bianGua]
    }
}