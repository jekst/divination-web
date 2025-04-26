<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { liuyaoStore } from '../stores/liuyao';
import { isTemplateExpression } from 'typescript';
const router = useRouter();
const useStore=liuyaoStore()

const formData=ref({
  time: new Date(),
  question: "",
  mode: "manual",
  yaos: new Array<number>(),
  benGuaName: "",
  bianGuaName: "",
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
        [1, "初爻"],
        [2, "二爻"],
        [3, "三爻"],
        [4, "四爻"],
        [5, "五爻"],
        [6, "上爻"]
    ]);
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
      let tmpYaos = []
      for (let i = 0; i <= 5; i++) {
          let element = document.getElementById("yao_" + i);
          let val = element ? (element as HTMLInputElement).value : "";
          console.log(val)
          if (val == "") {
              return
          }
          tmpYaos.push(Number(val))
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
    <form class="form" id="form">
            <div class="flex">
                <label>时间：</label>
                <input v-model="formData.time" type="datetime-local" class="field" />
            </div>
            <div class="flex">
                <label>占问：</label>
                <input v-model="formData.question" type="text" class="field" />
            </div>
            <div class="flex">
                <label for="fangshi">方式：</label>
                <input v-model="formData.mode" @click="clickTab('manual')" :class="{active:selectedTab=='manual'}"  value="manual" id="manual" type="radio" />
                <label for="manual">手动</label>
                <input v-model="formData.mode" @click="clickTab('name')" :class="{active:selectedTab=='name'}" value="name" id="name" type="radio" />
                <label for="name">卦名</label>  
                <input v-model="formData.mode" @click="clickTab('online')"  :class="{active:selectedTab=='online'}" value="online" id="online" type="radio" />
                <label for="online">在线</label>
            </div>
            <div id="online" v-if="selectedTab=='online'" class="tabcontent">
                <div class="flex" style="justify-content: center;" @click="yaoGua()">
                    <div class="tqWrapper" v-for="n in 3">
                        <img class="tongqian" src="@/assets/0.png">
                        <img class="tongqian tongqianZi" src="@/assets/1.png">
                    </div>
                </div>
                <div id="yaoResult"> </div>
                <p style="color:#999;">请集中注意力默想所问之事，点击铜钱开始旋转，再次点击可得一次，反复六次。</p>
            </div>

            <div id="manual" v-if="selectedTab=='manual'" style="width:260px;margin:0 auto;" class="tabcontent">
                <div class="flex" v-for="(yao, index) in ['上爻','五爻','四爻','三爻', '二爻', '初爻']">
                    <label>{{yao}}：</label>
                    <select :id="'yao_'+index" class="field">
                        <option value="">请选择</option>
                        <option value="6">老阴 ▅　▅×</option>
                        <option value="7">少阳 ▅▅▅</option>
                        <option value="8">少阴 ▅　▅</option>
                        <option value="9">老阳 ▅▅▅○</option>
                    </select>
                </div>
         </div>

        <div id="guaming" v-if="selectedTab=='name'" class="tabcontent">
            <div class="flex">
                <label>本卦：</label>
                <input type="text" v-model="formData.benGuaName" name="bengua" list="gualist" class="field" placeholder="原卦名称">
            </div>
            <div class="flex">
                <label>变卦：</label>
                <input type="text"  v-model="formData.bianGuaName" name="biangua" list="gualist" class="field" placeholder="变卦名称">
            </div>
            <datalist id="gualist">
                <option value="乾为天">乾为天</option>
                <option value="坤为地">坤为地</option>
                <option value="水雷屯">水雷屯</option>
                <option value="山水蒙">山水蒙</option>
                <option value="水天需">水天需</option>
                <option value="天水讼">天水讼</option>
                <option value="地水师">地水师</option>
                <option value="水地比">水地比</option>
                <option value="风天小畜">风天小畜</option>
                <option value="天泽履">天泽履</option>
                <option value="地天泰">地天泰</option>
                <option value="天地否">天地否</option>
                <option value="天火同人">天火同人</option>
                <option value="火天大有">火天大有</option>
                <option value="地山谦">地山谦</option>
                <option value="雷地豫">雷地豫</option>
                <option value="泽雷随">泽雷随</option>
                <option value="山风蛊">山风蛊</option>
                <option value="地泽临">地泽临</option>
                <option value="风地观">风地观</option>
                <option value="火雷噬嗑">火雷噬嗑</option>
                <option value="山火贲">山火贲</option>
                <option value="山地剥">山地剥</option>
                <option value="地雷复">地雷复</option>
                <option value="天雷无妄">天雷无妄</option>
                <option value="山天大畜">山天大畜</option>
                <option value="山雷颐">山雷颐</option>
                <option value="泽风大过">泽风大过</option>
                <option value="坎为水">坎为水</option>
                <option value="离为火">离为火</option>
                <option value="泽山咸">泽山咸</option>
                <option value="雷风恒">雷风恒</option>
                <option value="天山遯">天山遯</option>
                <option value="雷天大壮">雷天大壮</option>
                <option value="火地晋">火地晋</option>
                <option value="地火明夷">地火明夷</option>
                <option value="风火家人">风火家人</option>
                <option value="火泽睽">火泽睽</option>
                <option value="水山蹇">水山蹇</option>
                <option value="雷水解">雷水解</option>
                <option value="山泽损">山泽损</option>
                <option value="风雷益">风雷益</option>
                <option value="泽天夬">泽天夬</option>
                <option value="天风姤">天风姤</option>
                <option value="泽地萃">泽地萃</option>
                <option value="地风升">地风升</option>
                <option value="泽水困">泽水困</option>
                <option value="水风井">水风井</option>
                <option value="泽火革">泽火革</option>
                <option value="火风鼎">火风鼎</option>
                <option value="震为雷">震为雷</option>
                <option value="艮为山">艮为山</option>
                <option value="风山渐">风山渐</option>
                <option value="雷泽归妹">雷泽归妹</option>
                <option value="雷火丰">雷火丰</option>
                <option value="火山旅">火山旅</option>
                <option value="巽为风">巽为风</option>
                <option value="兑为泽">兑为泽</option>
                <option value="风水涣">风水涣</option>
                <option value="水泽节">水泽节</option>
                <option value="风泽中孚">风泽中孚</option>
                <option value="雷山小过">雷山小过</option>
                <option value="水火既济">水火既济</option>
                <option value="火水未济">火水未济</option>
            </datalist>
        </div>
        <div class="flex">
            <button class="btn" type="button" @click="check()">排盘</button>
        </div>
    </form>
  </div>
</template>

<style scoped>
.flex {
            display: flex;
            margin: 10px 0;
        }

        .form label {
            line-height: 40px;
        }

        .field {
            flex: auto;
            height: 30px;
            padding: 4px;
            border: 1px solid #ccc;
        }

        .btn {
            width: 90%;
            height: 60px;
            border-radius: 28px;
            line-height: 60px;
            text-align: center;
            font-size: 21px;
            color: #fff;
            margin: 30px auto;
            background: linear-gradient(90deg, #5431EC 0%, #9E46F2 100%);
            border: none;
        }

        .tab {
            overflow: hidden;
            margin: 0;
            padding: 0;
            flex: auto;
        }

        .tab li {
            float: left;
            border: none;
            outline: none;
            cursor: pointer;
            padding: 10px 16px;
            transition: 0.3s;
            list-style: none;
        }

        .tab li.active {
            background-color: #5131ED;
            color: #fff;
            border-radius: 20px;
        }

        .tabcontent {
            margin: 0 20px;
            padding-top: 20px;
        }

        .tqWrapper {
            position: relative;
            width: 110px;
            height: 100px;
        }

        .tongqian {
            position: absolute;
            left: 5px;
            width: 100px;
            height: 100px;
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
