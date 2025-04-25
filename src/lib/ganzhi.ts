import { getXunKong } from './xunkong.js';
import { nayin } from './nayin.js'; // Ensure nayin is a Map or object with a 'get' method
import { Elements as ganEle } from './tiangan.js';
import { Elements as zhiEle } from './dizhi.js';

export class GanZhi {
    Gan: ganEle;
    Zhi: zhiEle;
    constructor(gan: ganEle, zhi: zhiEle) {
        this.Gan = gan;
        this.Zhi = zhi;
    }

    toString(): string {
        return this.Gan + this.Zhi;
    }

    nayin() {
        return nayin[this.toString()];
    }

    xunkong() {
        return getXunKong(this.Gan, this.Zhi);
    }
}
export class Time {
    Year: GanZhi;
    Month: GanZhi;
    Day: GanZhi;
    Hour: GanZhi;
    constructor(year: GanZhi, month: GanZhi, day: GanZhi, time: GanZhi) {
        this.Year = year;
        this.Month = month;
        this.Day = day;
        this.Hour = time;
    }
    toString(): string {
        return this.Year.toString() + "年" + this.Month.toString() + "月" + this.Day.toString() + "日" + + this.Hour.toString() + "时";
    }
}

export function createGanZhi(gan: ganEle, zhi: zhiEle): GanZhi {
    return new GanZhi(gan, zhi);
}
