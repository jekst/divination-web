import { SolarTime } from "tyme4ts";
export enum YinYang {
    Undefined = "",
    Yin = "阴",
    Yang = "阳",
}

export enum WuxingRelation {
    Undefined = 0,
    ShengWo = 1,
    TongWo = 2,
    WoSheng = 3,
    WoKe = 4,
    KeWo = 5,
}

export class Wuxing {
    static readonly Mu = "木"
    static readonly Huo = "火"
    static readonly Tu = "土"
    static readonly Jin = "金"
    static readonly Shui = "水"
    static getRelation(w1: string, w2: string): WuxingRelation {
        if (w1 === w2) {
            return WuxingRelation.TongWo;
        }
        switch (w1) {
            case Wuxing.Mu:
                switch (w2) {
                    case Wuxing.Huo:
                        return WuxingRelation.WoSheng;
                    case Wuxing.Tu:
                        return WuxingRelation.WoKe;
                    case Wuxing.Jin:
                        return WuxingRelation.KeWo;
                    case Wuxing.Shui:
                        return WuxingRelation.ShengWo;
                }
                break;
            case Wuxing.Huo:
                switch (w2) {
                    case Wuxing.Tu:
                        return WuxingRelation.WoSheng;
                    case Wuxing.Jin:
                        return WuxingRelation.WoKe;
                    case Wuxing.Shui:
                        return WuxingRelation.KeWo;
                    case Wuxing.Mu:
                        return WuxingRelation.ShengWo;
                }
                break;
            case Wuxing.Tu:
                switch (w2) {
                    case Wuxing.Jin:
                        return WuxingRelation.WoSheng;
                    case Wuxing.Shui:
                        return WuxingRelation.WoKe;
                    case Wuxing.Mu:
                        return WuxingRelation.KeWo;
                    case Wuxing.Huo:
                        return WuxingRelation.ShengWo;
                }
                break;
            case Wuxing.Jin:
                switch (w2) {
                    case Wuxing.Shui:
                        return WuxingRelation.WoSheng;
                    case Wuxing.Mu:
                        return WuxingRelation.WoKe;
                    case Wuxing.Huo:
                        return WuxingRelation.KeWo;
                    case Wuxing.Tu:
                        return WuxingRelation.ShengWo;
                }
                break;
            case Wuxing.Shui:
                switch (w2) {
                    case Wuxing.Mu:
                        return WuxingRelation.WoSheng;
                    case Wuxing.Huo:
                        return WuxingRelation.WoKe;
                    case Wuxing.Tu:
                        return WuxingRelation.KeWo;
                    case Wuxing.Jin:
                        return WuxingRelation.ShengWo;
                }
                break;

        }
        return WuxingRelation.Undefined;
    }
}
export class TianGan {
    static readonly Jia = "甲"
    static readonly Yi = "乙"
    static readonly Bing = "丙"
    static readonly Ding = "丁"
    static readonly Wu = "戊"
    static readonly Ji = "己"
    static readonly Geng = "庚"
    static readonly Xin = "辛"
    static readonly Ren = "壬"
    static readonly Gui = "癸"
    static readonly tg = ['', TianGan.Jia, TianGan.Yi, TianGan.Bing, TianGan.Ding, TianGan.Wu, TianGan.Ji, TianGan.Geng, TianGan.Xin, TianGan.Ren, TianGan.Gui];
    static getName(index: number): string {
        if (index < 1 || index >= TianGan.tg.length) {
            return '';
        }
        return TianGan.tg[index];
    }
    static getIndex(name: string): number {
        return TianGan.tg.findIndex(n => n === name);
    }

    static getYinYang(indexOrName: number | string): YinYang {
        if (typeof indexOrName === 'string') {
            indexOrName = TianGan.getIndex(indexOrName);
        }
        if (indexOrName < 1 || indexOrName > 10) {
            return YinYang.Undefined;
        }
        return indexOrName % 2 === 0 ? YinYang.Yin : YinYang.Yang;
    }

    static getWuxing(indexOrName: number | string): string {
        if (typeof indexOrName === 'string') {
            indexOrName = TianGan.getIndex(indexOrName);
        }
        switch (indexOrName) {
            case 1:
            case 2:
                return Wuxing.Mu;
            case 3:
            case 4:
                return Wuxing.Huo;
            case 5:
            case 6:
                return Wuxing.Tu;
            case 7:
            case 8:
                return Wuxing.Jin;
            case 9:
            case 10:
                return Wuxing.Shui;
            default:
                return '';
        }
    }
}

export class DiZhi {
    static readonly Zi = "子"
    static readonly Chou = "丑"
    static readonly Yin = "寅"
    static readonly Mao = "卯"
    static readonly Chen = "辰"
    static readonly Si = "巳"
    static readonly Wu = "午"
    static readonly Wei = "未"
    static readonly Shen = "申"
    static readonly You = "酉"
    static readonly Xu = "戌"
    static readonly Hai = "亥"
    static readonly dz = ['', DiZhi.Zi, DiZhi.Chou, DiZhi.Yin, DiZhi.Mao, DiZhi.Chen, DiZhi.Si, DiZhi.Wu, DiZhi.Wei, DiZhi.Shen, DiZhi.You, DiZhi.Xu, DiZhi.Hai];
    static getName(index: number): string {
        if (index < 1 || index >= DiZhi.dz.length) {
            return '';
        }
        return DiZhi.dz[index];
    }
    static getIndex(name: string): number {
        return DiZhi.dz.findIndex(n => n === name);
    }

    static getYinYang(indexOrName: number | string): YinYang {
        if (typeof indexOrName === 'string') {
            indexOrName = DiZhi.getIndex(indexOrName);
        }
        if (indexOrName < 1 || indexOrName > 12) {
            return YinYang.Undefined;
        }
        return indexOrName % 2 === 0 ? YinYang.Yin : YinYang.Yang;
    }

    static getWuxing(indexOrName: number | string): string {
        if (typeof indexOrName === 'string') {
            indexOrName = DiZhi.getIndex(indexOrName);
        }
        switch (indexOrName) {
            case 1:
            case 12:
                return '水';

            case 2:
            case 5:
            case 8:
            case 11:
                return '土';
            case 3:
            case 4:
                return '木';
                return '土';
            case 6:
            case 7:
                return '火';
            case 9:
            case 10:
                return '金';
            default:
                return '';
        }
    }
}
export class Nayin {
    static readonly ny: Record<string, string> = {
        "甲子": "海中金", "乙丑": "海中金", "丙寅": "炉中火", "丁卯": "炉中火", "戊辰": "大林木", "己巳": "大林木", "庚午": "路旁土", "辛未": "路旁土", "壬申": "剑锋金", "癸酉": "剑锋金",
        "甲戌": "山头火", "乙亥": "山头火", "丙子": "涧下水", "丁丑": "涧下水", "戊寅": "城头土", "己卯": "城头土", "庚辰": "白蜡金", "辛巳": "白蜡金", "壬午": "杨柳木", "癸未": "杨柳木",
        "甲申": "泉中水", "乙酉": "泉中水", "丙戌": "屋上土", "丁亥": "屋上土", "戊子": "霹雳火", "己丑": "霹雳火", "庚寅": "松柏木", "辛卯": "松柏木", "壬辰": "长流水", "癸巳": "长流水",
        "甲午": "砂中金", "乙未": "砂中金", "丙申": "山下火", "丁酉": "山下火", "戊戌": "平地木", "己亥": "平地木", "庚子": "壁上土", "辛丑": "壁上土", "壬寅": "金箔金", "癸卯": "金箔金",
        "甲辰": "覆灯火", "乙巳": "覆灯火", "丙午": "天河水", "丁未": "天河水", "戊申": "大驿土", "己酉": "大驿土", "庚戌": "钗钏金", "辛亥": "钗钏金", "壬子": "桑柘木", "癸丑": "桑柘木",
        "甲寅": "大溪水", "乙卯": "大溪水", "丙辰": "沙中土", "丁巳": "沙中土", "戊午": "天上火", "己未": "天上火", "庚申": "石榴木", "辛酉": "石榴木", "壬戌": "大海水", "癸亥": "大海水",
    }
    static getNayin(gz: string): string {
        return Nayin.ny[gz]
    }
}

export class GanZhi {
    tianGan: string;
    diZhi: string;
    nayin: string;
    xunkong: string;
    constructor(tianGan: string, diZhi: string) {
        this.tianGan = tianGan;
        this.diZhi = diZhi;
        this.nayin = this.getNayin();
        this.xunkong = this.getXunkong();
    }

    static fromString(gz: string): GanZhi {
        if (gz.length !== 2) {
            return new GanZhi("", "");
        }
        return new GanZhi(gz[0], gz[1]);
    }
    static fromIndex(tianGanIndex: number, diZhiIndex: number): GanZhi {
        if (tianGanIndex < 1 || tianGanIndex > 10 || diZhiIndex < 1 || diZhiIndex > 12) {
            return new GanZhi("", "");
        }
        const tianGan = TianGan.getName(tianGanIndex);
        const diZhi = DiZhi.getName(diZhiIndex);
        return new GanZhi(tianGan, diZhi);
    }
    getTianGanIndex(): number {
        return TianGan.getIndex(this.tianGan);
    }
    getDiZhiIndex(): number {
        return DiZhi.getIndex(this.diZhi);
    }

    toString(): string {
        return this.tianGan.toString() + this.diZhi.toString();
    }

    getNayin(): string {
        return Nayin.getNayin(this.toString());
    }

    getXunkong(): string {
        const ganIndex = TianGan.getIndex(this.tianGan);
        const zhiIndex = DiZhi.getIndex(this.diZhi);
        let diff = zhiIndex - ganIndex;
        if (diff < 0) {
            diff += 12;
        }
        switch (diff) {
            case 0:
                return "戌亥";
            case 2:
                return "子丑";
            case 4:
                return "寅卯";
            case 6:
                return "辰巳";
            case 8:
                return "午未";
            case 10:
                return "申酉";
            default:
                return "";
        }
    }
}

export class GanZhiTime {
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
    static fromDate(date: Date | string | undefined): GanZhiTime {
        if (date === undefined) {
            date = new Date();
        } else if (typeof date === 'string') {
            date = new Date(date)
        }
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hour = date.getHours();
        const minute = date.getMinutes();
        const solar = SolarTime.fromYmdHms(year, month, day, hour, minute, 0)
        const sixtyCycle = solar.getSixtyCycleHour()
        return new GanZhiTime(
            GanZhi.fromString(sixtyCycle.getYear().getName()),
            GanZhi.fromString(sixtyCycle.getMonth().getName()),
            GanZhi.fromString(sixtyCycle.getDay().getName()),
            GanZhi.fromString(sixtyCycle.getSixtyCycle().getName())
        );
    }
    toString(): string {
        return this.Year.toString() + "年" + this.Month.toString() + "月" + this.Day.toString() + "日" + + this.Hour.toString() + "时";
    }
}