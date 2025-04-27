import type { Case } from '../lib/liuyao.ts';
import { defineStore } from 'pinia'

export const liuyaoStore = defineStore('liuyao', {
    state: () => {
        return {
            data: {
                time: new Date(),
                question: "",
                mode: "online",
                yaos: new Array<number>(),
                benGuaName: "",
                bianGuaName: "",
            }
        }
    },
})