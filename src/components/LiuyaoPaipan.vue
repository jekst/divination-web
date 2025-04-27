<script setup lang="ts">
import { onMounted, onUnmounted ,ref} from 'vue';
import { YaoSymbol,LiuYao } from '../lib/liuyao.ts';
import type { Case } from '../lib/liuyao.ts';
import { YinYang } from '../lib/base.ts';
import { liuyaoStore } from '../stores/liuyao';
import { useRouter } from 'vue-router';
const router = useRouter();
const liuyao=liuyaoStore()
const data = ref<Case>();
onMounted(function () {
   const ret= LiuYao.Paipan(liuyao.data.time,liuyao.data.question,liuyao.data.mode,liuyao.data.yaos,liuyao.data?.benGuaName,liuyao.data?.bianGuaName)
   if(ret){
        data.value=ret
    }else{
        router.push('/')
    }
});
onUnmounted(function(){
    liuyao.$reset()
})
</script>

<template>
  <div style="padding: 10px 0;">
    <div style="margin:0 15px">
      <div>
          <span>时间：{{ data?.Datetime }}</span>
      </div>
      <div v-if="data?.Category">
          占类：<span>{{ data.Category }}</span>
      </div>
      <div v-if="data?.Mode">
          方式：<span>{{ data.Mode }}</span>
      </div>
      <div>
          占问：<span>{{ data?.Question }}</span>
      </div>
    </div>
    <hr />
    <div style="display:flex;flex-wrap: wrap;margin:0 15px;">
        <span class="shensha" v-for="[key,value] in data?.Shensha">{{ key }}：{{ value }}</span>
    </div>
    <hr />
    <div style="text-align: center;margin: 8px 0;font-size: 16px;">
        <span class="timeHighlight"> {{ data?.GanZhiTime?.Month }}</span>月
        <span class="timeHighlight"> {{ data?.GanZhiTime?.Day }}</span>日
        <span>（旬空：<span class="timeHighlight">{{ data?.GanZhiTime?.Day.getXunkong() }}</span>）</span>
    </div>
    <table class="gua">
        <thead>
            <tr style="font-weight:bold">
                <th></th>
                <th>伏藏</th>
                <th colspan="2">
                    {{ data?.BenGua.Palace}}：{{ data?.BenGua.Name }}
                </th>
                <th style="text-align:center">
                    {{ data?.BianGua.Palace}}：{{ data?.BianGua.Name }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="index in [5,4,3,2,1,0]" :key="index">
                <td>{{ data?.BenGua.Yaos[index]?.LiuShen }} </td>
                <td style="text-align: center;">{{ data?.BenGua.Yaos[index]?.FuShenLiuQin }}{{ data?.BenGua.Yaos[index]?.FuShenGanZhi}}
                    <div class="nayin">{{ data?.BenGua.Yaos[index]?.FuShenNaYin }}</div>
                </td>
                <td style="text-align:right">
                    <span>{{ data?.BenGua.Yaos[index]?.LiuQin }}{{ data?.BenGua.Yaos[index]?.GanZhi }}</span>
                    <div class="nayin">{{ data?.BenGua.Yaos[index]?.NaYin }}</div>
                </td>
                <td>
                    <span class="yao" v-if="data?.BenGua.Yaos[index]?.YinYang===YinYang.Yin">▅　▅</span>
                    <span class="yao" v-else>▅▅▅</span>
                    <span>{{data?.BenGua.Yaos[index]?.ShiYing}}</span>
                    <span v-if="data?.BenGua.Yaos[index]?.Symbol===YaoSymbol.SymbolJiao || data?.BenGua.Yaos[index]?.Symbol===YaoSymbol.SymbolZhong">{{ data?.BenGua.Yaos[index]?.Symbol }}</span>
                </td>
                <td style="text-align:right">
                  <span class="yao" v-if="data?.BianGua.Yaos[index]?.YinYang===YinYang.Yin">▅　▅</span>
                  <span class="yao" v-else>▅▅▅</span>
                    <span>{{ data?.BianGua.Yaos[index]?.LiuQin }}{{ data?.BianGua.Yaos[index]?.GanZhi }}</span>
                    <div class="nayin">{{ data?.BianGua.Yaos[index]?.NaYin }}</div>
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td></td>
                <td></td>
                <td colspan="2" style="text-align: center;">
                    <span class="shen">身:{{ data?.BenGua.Shen}}</span>
                    <span class="hechong" v-if="data?.BenGua.HeChong">{{data?.BenGua.HeChong}}</span>
                    <span class="yougui" v-if="data?.BenGua.YouGui">{{data?.BenGua.YouGui}}</span>
                </td>
                <td style="text-align:center">
                    <span class="shen">身:{{ data?.BianGua.Shen}}</span>
                    <span class="hechong" v-if="data?.BianGua.HeChong">{{data?.BianGua.HeChong}}</span>
                    <span class="yougui" v-if="data?.BianGua.YouGui">{{data?.BianGua.YouGui}}</span>
                </td>
            </tr>
        </tfoot>
    </table>
  </div>
</template>

<style>

.timeHighlight {
    color: brown;
    font-weight: bold;
}

.gua {
    width: 100%;
    margin: 0 auto;
    font-size: 16px;
    font-weight: 400;
}

.gua tr,
.gua td {
    border: 0 none;
}
.gua th{
    padding-bottom: 10px;
}

.gua td {
    padding: 0 0px;
    height: 40px;
    vertical-align: top;
    position: relative;
}

.yao {
    font-size: 13px;
    vertical-align: top;
    margin-right: 4px;
}

.nayin {
    position: absolute;
    bottom: 0;
    right: 0;
    font-size: 12px;
    color: firebrick;
    display: none;
}

.shen {
    color: red;
    font-size: 14px;
    display: none;
}

.hechong {
    color: blue;
    font-size: 14px;
    margin:0 6px;
}

.yougui {
    color: green;
    font-size: 14px;
}

.shensha {
    width: 78px;
}
</style>