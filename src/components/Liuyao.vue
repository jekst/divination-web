<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { liuyaoStore } from '../stores/liuyao';
import { gua64List }    from  '../lib/gua64';
const router = useRouter();
const useStore=liuyaoStore()

const formData=ref<{
    time: Date;
    question: string;
    mode: string;
    yaos: number[];
    benGuaName: string;
    bianGuaName: string;
    [key: `yao${number}`]: number|string;
}>({
    time: new Date(),
    question: "",
    mode: "manual",
    yaos: new Array<number>(),
    benGuaName: "",
    bianGuaName: "",
    yao1: "",
    yao2: "",  
    yao3: "",
    yao4: "",
    yao5: "",
    yao6: "",
})

const selectedTab = ref('manual');
function clickTab(tab: string) {
  selectedTab.value = tab;
}

//翻转铜钱
function changeCoinSide(obj : HTMLElement) {
  if (obj.style.display === "none") {
      obj.style.display = "block"
  } else {
      obj.style.display = "none"
  }
}

const timesToName:Map<number,string> = new Map<number,string>([
    [6, "上爻"],
    [5, "五爻"],
    [4, "四爻"],
    [3, "三爻"],
    [2, "二爻"],
    [1, "初爻"],
]);
const yaoOptions = [
    { value: 6, label: "老阴 ▅　▅ ×" },
    { value: 7, label: "少阳 ▅▅▅" },
    { value: 8, label: "少阴 ▅　▅" },
    { value: 9, label: "老阳 ▅▅▅ ○" }
]   
const guaNames =gua64List.map((item) => {
    return { value: item.Name, label: item.Name }
})     

const randomElement = (array: number[]): number => array[Math.floor(Math.random() * array.length)];
const milisecond = [90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110];
 // 摇卦
 let interval=Array<ReturnType<typeof setInterval>>();
 function yaoGua() {
    let objYaoResult: HTMLElement | null = document.getElementById("yaoResult");
    if (formData.value.yaos.length >= 6) {
        check()
        return
    }
    let coins = document.getElementsByClassName("tongqianZi");
    // 停止摇卦
    if (interval.length > 0) {
        for (let i = 0; i < interval.length; i++) {
            clearInterval(interval[i]);
        }
        interval = []
    } else if (formData.value.yaos.length < 6) {//开始摇卦
        for (let i = 0; i < coins.length; i++) {
            const cur = coins[i]
            changeCoinSide(cur as HTMLElement)
            const t = randomElement(milisecond)
            let it = setInterval(function (obj:HTMLElement) {
                changeCoinSide(obj)
            }, t, cur);
            interval.push(it)
        }
        return
    }
    let num = 0;
    for (let i = 0; i < coins.length; i++) {
        if ((coins[i] as HTMLElement).style.display == "block") {
            num += 2
        } else {
            num += 3
        }
    }
    const name = timesToName.get(formData.value.yaos.length+1)
    let newEle;
    switch (num) {
        case 6:
            newEle = "<div class=\"flex\"><span>" + name + " 老阴</span><span>▅　▅</span><span>×</span></div>";
            break;
        case 7:
            newEle = "<div class=\"flex\"><span>" + name + " 少阳</span><span>▅▅▅</span></div>";
            break;
        case 8:
            newEle = "<div class=\"flex\"><span>" + name + " 少阴</span><span>▅　▅</span></div>";
            break;
        case 9:
            newEle = "<div class=\"flex\"><span>" + name + " 老阳</span><span>▅▅▅</span><span>○<span></div>";
            break;
    }
    if (objYaoResult) {
        objYaoResult.innerHTML = newEle + objYaoResult.innerHTML;
    }
    if (formData.value.yaos.length < 6) {
      formData.value.yaos.push(num)
    }
}       
//检查是否填写完整
function check() {
  if (formData.value.mode == "online") {
      if (formData.value.yaos.length < 6) {
          return
      }
      const yaoResultElement = document.getElementById("yaoResult");
      if (yaoResultElement) {
          yaoResultElement.innerHTML = "";
      }
  }
  else if (formData.value.mode == "manual") {
      let tmpYaos :number[] = []
      for (let i = 1; i <= 6; i++) {
            const yaoValue = formData.value[`yao${i}`]; 
            if (yaoValue === undefined||yaoValue === 0) {
                return
            }
            tmpYaos.push(Number(yaoValue))
      }
      formData.value.yaos =tmpYaos
  }
  else if (formData.value.mode == "name") {
      if (formData.value.benGuaName == "" || formData.value.benGuaName == "") {
          return
      }
  }
  useStore.data = { ...formData.value }
  router.push({ name: 'pan'})
}


</script>

<template>
  <div>
    <el-form :model="formData" label-width="auto">
        <el-form-item label="时间">
            <el-date-picker style="width: 100%;" v-model="formData.time" type="datetime" placeholder="请选择日期时间" />
        </el-form-item>
        <el-form-item label="占问">
            <el-input v-model="formData.question"/>
        </el-form-item> 
        <el-form-item label="方式">
            <el-radio-group v-model="formData.mode">
                <el-radio @click="clickTab('manual')"  value="manual">手动</el-radio>
                <el-radio @click="clickTab('name')" value="name">卦名</el-radio>
                <el-radio @click="clickTab('online')" value="online">在线</el-radio>
            </el-radio-group>
        </el-form-item>
        <div v-if="selectedTab=='online'">
            <div @click="yaoGua()" style="height: 100px;margin-bottom: 20px;display:flex;flex-direction:row;justify-content: center;">
                <div  v-for="n in 3" style="position: relative;width: 100px;height: 100%;">
                    <img class="tongqian" src="@/assets/0.png">
                    <img class="tongqian tongqianZi" src="@/assets/1.png">
                </div>
            </div>
            <div id="yaoResult"> </div>
            <div>
                <el-text type="info">请集中注意力默想所问之事，点击铜钱开始旋转，再次点击可得一次，反复六次。</el-text>
            </div>
        </div>

        <div v-if="selectedTab=='manual'">
            <el-col :span="14" :offset="5"  >
                <el-form-item :label="val" v-for="([key,val]) in timesToName">
                    <el-select v-model="formData[`yao${key}`]" filterable >
                        <el-option
                        v-for="item in yaoOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        />
                    </el-select>
                </el-form-item>
            </el-col>
        </div>

        <div v-if="selectedTab=='name'">
            <el-col :span="14" :offset="5">
                <el-form-item label="本卦">
                    <el-select
                        v-model="formData.benGuaName" filterable >
                        <el-option
                        v-for="item in guaNames"
                        :label="item.label"
                        :value="item.value"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="变卦">
                    <el-select
                        v-model="formData.bianGuaName" filterable >
                        <el-option
                        v-for="item in guaNames"
                        :label="item.label"
                        :value="item.value"
                        />
                    </el-select>
                </el-form-item>
            </el-col>
        </div>
        <el-form-item>
            <el-button round type="primary" size="large" style="width: 90%;margin:30px auto;" @click="check()">排盘</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
   .tongqian {
        position: absolute;
        left: 5px;
        width: 90px;
        height: 90px;
    }

    .tongqianZi {
        display: block;
    }

    #yaoResult {
        justify-self: center;
    }

    #yaoResult span {
        padding: 0 4px;
    }
</style>
