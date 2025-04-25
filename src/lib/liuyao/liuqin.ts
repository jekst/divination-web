import * as wuxing from "../wuxing"
export enum LiuQin {
    Undefined = "",
    FuMu = "父母",
    XiongDi = "兄弟",
    QiCai = "妻财",
    ZiSun = "子孙",
    GuanGui = "官鬼"
}

export function getLiuqin(palaceWuxing: wuxing.Elements, yaoWuxing: wuxing.Elements): LiuQin {
    let r = wuxing.getRelation(palaceWuxing, yaoWuxing)
    switch (r) {
        case wuxing.Relation.ShengWo:
            return LiuQin.FuMu
        case wuxing.Relation.TongWo:
            return LiuQin.XiongDi
        case wuxing.Relation.WoSheng:
            return LiuQin.ZiSun
        case wuxing.Relation.WoKe:
            return LiuQin.QiCai
        case wuxing.Relation.KeWo:
            return LiuQin.GuanGui
        default:
            return LiuQin.Undefined
    }
}