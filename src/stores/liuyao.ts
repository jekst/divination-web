import type { Case } from '../lib/liuyao.ts';
import { defineStore } from 'pinia'

export const liuyaoStore = defineStore('liuyao', {
    state: () => {
        return {
            data: {
                time: new Date(),
                question: "",
                mode: "",
                yaos: new Array<number>(),
                benGuaName: "",
                bianGuaName: "",
                isHistory: false
            }
        }
    },
})
export type LiuyaoRecord = {
    key: number
    time: Date,
    question: string,
    mode: string,
    benGuaName: string,
    bianGuaName: string,
}
export class LiuyaoHistory {
    static readonly key = "lyphistory"
    static list(): LiuyaoRecord[] {
        const cache = localStorage.getItem(LiuyaoHistory.key)
        const list = JSON.parse(cache ?? "[]")
        if (!Array.isArray(list)) {
            return new Array<LiuyaoRecord>()
        }
        return list as LiuyaoRecord[]
    }

    static add(record: LiuyaoRecord) {
        const list = LiuyaoHistory.list()
        record.key = new Date().getTime()
        list.unshift(record)
        LiuyaoHistory.save(list)
    }

    static delete(id: number) {
        let list = LiuyaoHistory.list()
        list = list.filter((item: LiuyaoRecord) => item.key != id)
        LiuyaoHistory.save(list)
    }

    static save(records: LiuyaoRecord[]) {
        const str = JSON.stringify(records)
        localStorage.setItem(LiuyaoHistory.key, str)
    }

    static clear() {
        localStorage.removeItem(LiuyaoHistory.key)
    }
}