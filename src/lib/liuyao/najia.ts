import { GanZhi } from "../ganzhi";
import * as bagua from "../gua";
import { Elements as ganEle } from "../tiangan";
import { Elements as zhiEle, getDiZhiByName, getDiZhiByRank } from "../dizhi";

interface NaJia {
    InnerStart: GanZhi
    OuterStart: GanZhi
    Step: number
}
// 乾金甲子外壬午，坎水戊寅外戊申。
// 艮土丙辰外丙戌，震木庚子外庚午。
// 巽木辛丑外辛未，离火己卯外己酉。
// 坤土乙未外癸丑，兑金丁巳外丁亥。
function generateBaGuaNaJia(): Map<string, Array<GanZhi>> {
    const najia = new Map<string, NaJia>([
        ["乾", { InnerStart: new GanZhi(ganEle.Jia, zhiEle.Zi), OuterStart: new GanZhi(ganEle.Ren, zhiEle.Wu), Step: 2 }],
        ["坎", { InnerStart: new GanZhi(ganEle.Wu, zhiEle.Yin), OuterStart: new GanZhi(ganEle.Wu, zhiEle.Shen), Step: 2 }],
        ["艮", { InnerStart: new GanZhi(ganEle.Bing, zhiEle.Chen), OuterStart: new GanZhi(ganEle.Bing, zhiEle.Xu), Step: 2 }],
        ["震", { InnerStart: new GanZhi(ganEle.Geng, zhiEle.Zi), OuterStart: new GanZhi(ganEle.Geng, zhiEle.Wu), Step: 2 }],
        ["巽", { InnerStart: new GanZhi(ganEle.Xin, zhiEle.Chou), OuterStart: new GanZhi(ganEle.Xin, zhiEle.Wei), Step: -2 }],
        ["离", { InnerStart: new GanZhi(ganEle.Ji, zhiEle.Mao), OuterStart: new GanZhi(ganEle.Ji, zhiEle.You), Step: -2 }],
        ["坤", { InnerStart: new GanZhi(ganEle.Yi, zhiEle.Wei), OuterStart: new GanZhi(ganEle.Gui, zhiEle.Chou), Step: -2 }],
        ["兑", { InnerStart: new GanZhi(ganEle.Ding, zhiEle.Si), OuterStart: new GanZhi(ganEle.Ding, zhiEle.Hai), Step: -2 }],
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
            let zr = getDiZhiByName(inner.Zhi).Rank + nj.Step
            if (zr <= 0) {
                zr += 12
            }
            if (zr > 12) {
                zr %= 12
            }
            inner = new GanZhi(inner.Gan, getDiZhiByRank(zr).Name)
        }
        let outer = nj.OuterStart
        for (let k = 3; k < 6; k++) {
            gz[k] = outer
            let zr = getDiZhiByName(outer.Zhi).Rank + nj.Step
            if (zr <= 0) {
                zr += 12
            }
            if (zr > 12) {
                zr %= 12
            }
            outer = new GanZhi(outer.Gan, getDiZhiByRank(zr).Name)
        }
        ret.set(g.Name, gz)
    }
    return ret
}

export const baguaNaJia = generateBaGuaNaJia()

export function getNaJia(guaID: number): Array<GanZhi> {
    let innerID = guaID & 0b111
    let innerGua = bagua.getGuaByID(innerID)
    let nj = baguaNaJia.get(innerGua.Name)
    if (!nj) {
        throw new Error(`NaJia not found for ${innerGua.Name}`);
    }
    let ret = new Array<GanZhi>(6)
    for (let i = 0; i < 3; i++) {
        ret[i] = nj[i];
    }
    let outerID = guaID >> 3
    let outerGua = bagua.getGuaByID(outerID)
    nj = baguaNaJia.get(outerGua.Name)
    if (!nj) {
        throw new Error(`NaJia not found for ${outerGua.Name}`);
    }
    for (let i = 3; i < 6; i++) {
        ret[i] = nj[i]
    }
    return ret
}