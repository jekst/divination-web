import type { Time as GanzhiTime } from "../ganzhi";
const enum shensha {
    guiren = "贵人",
    lushen = "禄神",
    yangren = "羊刃",
    wenchang = "文昌",
    yima = "驿马",
    taohua = "桃花",
    jiangxing = "将星",
    jiesha = "劫煞",
    huagai = "华盖",
    mouxing = "谋星",
    tianyi = "天医",
    tianxi = "天喜",
    zaisha = "灾煞"
}
const shenshaList: Map<shensha, Map<string, string>> = new Map([
    [shensha.guiren, new Map<string, string>([
        ["甲", "丑未"],
        ["戊", "丑未"],
        ["庚", "丑未"],
        ["乙", "子申"],
        ["己", "子申"],
        ["丙", "亥酉"],
        ["丁", "亥酉"],
        ["壬", "巳卯"],
        ["癸", "巳卯"],
        ["辛", "寅午"]
    ])],
    [shensha.lushen, new Map<string, string>([
        ["甲", "寅"],
        ["乙", "卯"],
        ["丙", "巳"],
        ["丁", "午"],
        ["戊", "巳"],
        ["己", "午"],
        ["庚", "申"],
        ["辛", "酉"],
        ["壬", "亥"],
        ["癸", "子"]
    ])],
    [shensha.yangren, new Map<string, string>([
        ["甲", "卯"],
        ["乙", "寅"],
        ["丙", "午"],
        ["丁", "巳"],
        ["戊", "午"],
        ["己", "巳"],
        ["庚", "酉"],
        ["辛", "申"],
        ["壬", "子"],
        ["癸", "亥"]
    ])],
    [shensha.wenchang, new Map<string, string>([
        ["甲", "巳"],
        ["乙", "午"],
        ["丙", "申"],
        ["丁", "酉"],
        ["戊", "申"],
        ["己", "酉"],
        ["庚", "亥"],
        ["辛", "子"],
        ["壬", "寅"],
        ["癸", "卯"]
    ])],
    [shensha.yima, new Map<string, string>([
        ["申", "寅"],
        ["子", "寅"],
        ["辰", "寅"],
        ["巳", "亥"],
        ["酉", "亥"],
        ["丑", "亥"],
        ["寅", "申"],
        ["午", "申"],
        ["戌", "申"],
        ["亥", "巳"],
        ["卯", "巳"],
        ["未", "巳"]
    ])],
    [shensha.taohua, new Map<string, string>([
        ["申", "酉"],
        ["子", "酉"],
        ["辰", "酉"],
        ["巳", "午"],
        ["酉", "午"],
        ["丑", "午"],
        ["寅", "卯"],
        ["午", "卯"],
        ["戌", "卯"],
        ["亥", "子"],
        ["卯", "子"],
        ["未", "子"]
    ])],
    [shensha.jiangxing, new Map<string, string>([
        ["申", "子"],
        ["子", "子"],
        ["辰", "子"],
        ["巳", "酉"],
        ["酉", "酉"],
        ["丑", "酉"],
        ["寅", "午"],
        ["午", "午"],
        ["戌", "午"],
        ["亥", "卯"],
        ["卯", "卯"],
        ["未", "卯"]
    ])],
    [shensha.jiesha, new Map<string, string>([
        ["申", "巳"],
        ["子", "巳"],
        ["辰", "巳"],
        ["巳", "寅"],
        ["酉", "寅"],
        ["丑", "寅"],
        ["寅", "亥"],
        ["午", "亥"],
        ["戌", "亥"],
        ["亥", "申"],
        ["卯", "申"],
        ["未", "申"]
    ])],
    [shensha.huagai, new Map<string, string>([
        ["申", "辰"],
        ["子", "辰"],
        ["辰", "辰"],
        ["巳", "丑"],
        ["酉", "丑"],
        ["丑", "丑"],
        ["寅", "戌"],
        ["午", "戌"],
        ["戌", "戌"],
        ["亥", "未"],
        ["卯", "未"],
        ["未", "未"]
    ])],
    [shensha.mouxing, new Map<string, string>([
        ["申", "戌"],
        ["子", "戌"],
        ["辰", "戌"],
        ["巳", "未"],
        ["酉", "未"],
        ["丑", "未"],
        ["寅", "辰"],
        ["午", "辰"],
        ["戌", "辰"],
        ["亥", "丑"],
        ["卯", "丑"],
        ["未", "丑"]
    ])],
    [shensha.zaisha, new Map<string, string>([
        ["申", "午"],
        ["子", "午"],
        ["辰", "午"],
        ["巳", "卯"],
        ["酉", "卯"],
        ["丑", "卯"],
        ["寅", "子"],
        ["午", "子"],
        ["戌", "子"],
        ["亥", "酉"],
        ["卯", "酉"],
        ["未", "酉"]
    ])],
    [shensha.tianyi, new Map<string, string>([
        ["子", "亥"],
        ["丑", "子"],
        ["寅", "丑"],
        ["卯", "寅"],
        ["辰", "卯"],
        ["巳", "辰"],
        ["午", "巳"],
        ["未", "午"],
        ["申", "未"],
        ["酉", "申"],
        ["戌", "酉"],
        ["亥", "戌"]
    ])],
    [shensha.tianxi, new Map<string, string>([
        ["亥", "未"],
        ["子", "未"],
        ["丑", "未"],
        ["寅", "戌"],
        ["卯", "戌"],
        ["辰", "戌"],
        ["巳", "丑"],
        ["午", "丑"],
        ["未", "丑"],
        ["申", "辰"],
        ["酉", "辰"],
        ["戌", "辰"]
    ])]
])


export function getShensha(t: GanzhiTime): Map<string, string> {
    let ret = new Map<string, string>();
    ret.set(shensha.guiren, shenshaList.get(shensha.guiren)?.get(t.Day.Gan) ?? "");
    ret.set(shensha.lushen, shenshaList.get(shensha.lushen)?.get(t.Day.Gan) ?? "");
    ret.set(shensha.yangren, shenshaList.get(shensha.yangren)?.get(t.Day.Gan) ?? "");
    ret.set(shensha.wenchang, shenshaList.get(shensha.wenchang)?.get(t.Day.Gan) ?? "");
    ret.set(shensha.yima, shenshaList.get(shensha.yima)?.get(t.Day.Zhi) ?? "");
    ret.set(shensha.taohua, shenshaList.get(shensha.taohua)?.get(t.Day.Zhi) ?? "");
    ret.set(shensha.jiangxing, shenshaList.get(shensha.jiangxing)?.get(t.Day.Zhi) ?? "");
    ret.set(shensha.jiesha, shenshaList.get(shensha.jiesha)?.get(t.Day.Zhi) ?? "");
    ret.set(shensha.huagai, shenshaList.get(shensha.huagai)?.get(t.Day.Zhi) ?? "");
    ret.set(shensha.mouxing, shenshaList.get(shensha.mouxing)?.get(t.Day.Zhi) ?? "");
    ret.set(shensha.tianyi, shenshaList.get(shensha.tianyi)?.get(t.Month.Zhi) ?? "");
    ret.set(shensha.tianxi, shenshaList.get(shensha.tianxi)?.get(t.Month.Zhi) ?? "");
    ret.set(shensha.zaisha, shenshaList.get(shensha.zaisha)?.get(t.Day.Zhi) ?? "");
    return ret
}
