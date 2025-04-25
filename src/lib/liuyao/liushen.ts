import { Elements as ganEle } from "../tiangan"
export enum LiuShen {
    Undefined = "",
    Qinglong = "青龙",
    Zhuque = "朱雀",
    Gouchen = "勾陈",
    Tengshe = "螣蛇",
    Baihu = "白虎",
    Xuanwu = "玄武",
}

const liushenList = new Array<LiuShen>(
    LiuShen.Qinglong,
    LiuShen.Zhuque,
    LiuShen.Gouchen,
    LiuShen.Tengshe,
    LiuShen.Baihu,
    LiuShen.Xuanwu,
)

export function getLiuShenList(dayGan: ganEle): LiuShen[] {
    let start = 0
    switch (dayGan) {
        case ganEle.Jia:
        case ganEle.Yi:
            start = 0 // 青龙起始
            break
        case ganEle.Bing:
        case ganEle.Ding:
            start = 1 // 朱雀起始
            break
        case ganEle.Wu:
            start = 2 // 勾陈起始
            break
        case ganEle.Ji:
            start = 3 // 螣蛇起始
            break
        case ganEle.Geng:

        case ganEle.Xin:
            start = 4 // 白虎起始
            break
        case ganEle.Ren:
        case ganEle.Gui:
            start = 5 // 玄武起始
            break
        default:
            start = 0 // 青龙起始
    }
    return [...liushenList.slice(start), ...liushenList.slice(0, start)]
}
