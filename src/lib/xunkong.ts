import * as tiangan from "./tiangan";
import * as dizhi from "./dizhi";
const xunkong: Map<number, string> = new Map<number, string>([
    [0, "戌亥"],
    [2, "子丑"],
    [4, "寅卯"],
    [6, "辰巳"],
    [8, "午未"],
    [10, "申酉"],
]);

export function getXunKong(g: tiangan.Elements, z: dizhi.Elements): string {
    let gan = tiangan.getTianGanByName(g);
    let zhi = dizhi.getDiZhiByName(z);
    if (gan.Rank < 1 || gan.Rank > 10) {
        return "";
    }
    if (zhi.Rank < 1 || zhi.Rank > 12) {
        return "";
    }
    let diff = zhi.Rank - gan.Rank;
    if (diff < 0) {
        diff += 12;
    }
    return xunkong.get(diff) ?? "";
}