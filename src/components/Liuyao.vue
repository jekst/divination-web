<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { liuyaoStore } from '../stores/liuyao'
import { gua64List } from '../lib/gua64'
import { YaoTypeToFullSymbol, YaoType, Mode, ModeList } from '../lib/liuyao'
const router = useRouter()
const useStore = liuyaoStore()

const formData = ref<{
	time: Date
	question: string
	mode: string
	yaos: number[]
	benGuaName: string
	bianGuaName: string
	isHistory: boolean
	[key: `yao${number}`]: number | string
}>({
	time: new Date(),
	question: '',
	mode: Mode.GuaName,
	yaos: new Array<number>(),
	benGuaName: '',
	bianGuaName: '',
	yao1: '',
	yao2: '',
	yao3: '',
	yao4: '',
	yao5: '',
	yao6: '',
	isHistory: false,
})

const selectedTab = ref('name')
watch(selectedTab, (newVal) => {
	formData.value.yaos = []
})
const initCoins = [1, 2, 3].map((item) => {
	return random(1, 10) % 2 == 0 ? 'block' : 'none'
})
//翻转铜钱
function changeCoinSide(obj: HTMLElement) {
	if (obj.style.display === 'none') {
		obj.style.display = 'block'
	} else {
		obj.style.display = 'none'
	}
}

const timesToName: Map<number, string> = new Map<number, string>([
	[6, '上爻'],
	[5, '五爻'],
	[4, '四爻'],
	[3, '三爻'],
	[2, '二爻'],
	[1, '初爻'],
])

const guaNames = gua64List.map((item) => {
	return { value: item.Name, label: item.Name }
})

function random(min: number, max: number): number {
	const floatRandom = Math.random()
	const difference = max - min
	// 介于 0 和差值之间的随机数
	const random = Math.round(difference * floatRandom)
	const randomWithinRange = random + min
	return randomWithinRange
}
// 摇卦
let interval = Array<ReturnType<typeof setInterval>>()
function yaoGua() {
	let objYaoResult: HTMLElement | null = document.getElementById('yaoResult')
	if (formData.value.yaos.length >= 6) {
		submit()
		return
	}
	let coins = document.getElementsByClassName('coin_char')
	// 停止摇卦
	if (interval.length > 0) {
		for (let i = 0; i < interval.length; i++) {
			clearInterval(interval[i])
		}
		interval = []
	} else if (formData.value.yaos.length < 6) {
		//开始摇卦
		for (let i = 0; i < coins.length; i++) {
			const cur = coins[i]
			changeCoinSide(cur as HTMLElement)
			const t = random(90, 110)
			let it = setInterval(
				function (obj: HTMLElement) {
					changeCoinSide(obj)
				},
				t,
				cur
			)
			interval.push(it)
		}
		return
	}
	let num = 0
	for (let i = 0; i < coins.length; i++) {
		if ((coins[i] as HTMLElement).style.display == 'block') {
			num += 2
		} else {
			num += 3
		}
	}
	let name = timesToName.get(formData.value.yaos.length + 1)
	const yinyang = YaoTypeToFullSymbol[num as YaoType]
	if (objYaoResult) {
		const newEle = `<div class="flex" style="margin:5px 4px;"><span>${name}</span><span style="margin:0 6px; vertical-align: top;">${yinyang}</span></div>`
		objYaoResult.innerHTML = newEle + objYaoResult.innerHTML
	}
	if (formData.value.yaos.length < 6) {
		formData.value.yaos.push(num)
	}
}
//检查是否填写完整
function submit() {
	if (formData.value.mode == Mode.Online) {
		if (formData.value.yaos.length < 6) {
			return
		}
	} else if (formData.value.mode == Mode.YaoName) {
		let tmpYaos: number[] = []
		for (let i = 1; i <= 6; i++) {
			const yaoValue = Number(formData.value[`yao${i}`])
			if (yaoValue === 0) {
				return
			}
			tmpYaos.push(yaoValue)
		}
		formData.value.yaos = tmpYaos
	} else if (formData.value.mode == Mode.GuaName) {
		if (formData.value.benGuaName == '') {
			return
		}
		if (formData.value.bianGuaName == '') {
			formData.value.bianGuaName = formData.value.benGuaName
		}
	}
	useStore.data = { ...formData.value }
	router.push({ name: 'liuyaopan' })
}
</script>

<template>
	<div style="padding: 0 15px">
		<el-form :model="formData">
			<el-form-item label="时间：">
				<el-date-picker
					size="large"
					style="width: 100%"
					v-model="formData.time"
					:editable="false"
					type="datetime"
					placeholder="请选择日期时间" />
			</el-form-item>
			<el-form-item label="占问：">
				<el-input size="large" v-model="formData.question" />
			</el-form-item>
			<el-form-item label="方式：">
				<el-select size="large" v-model="formData.mode">
					<el-option
						v-for="(label, value) in ModeList"
						:key="value"
						:label="label"
						:value="value" />
				</el-select>
			</el-form-item>
			<div v-if="formData.mode == Mode.Online">
				<div
					@click="yaoGua()"
					style="
						height: 100px;
						margin-bottom: 20px;
						display: flex;
						flex-direction: row;
						justify-content: center;
					">
					<div
						v-for="val in initCoins"
						style="position: relative; width: 100px; height: 100%">
						<img class="coin" src="@/assets/coin0.png" />
						<img
							class="coin coin_char"
							:style="{ display: val }"
							src="@/assets/coin1.png" />
					</div>
				</div>
				<div id="yaoResult"></div>
				<div>
					<el-text type="info"
						>请集中注意力默想所问之事，点击铜钱开始旋转，再次点击可得一次，反复六次。</el-text
					>
				</div>
			</div>

			<div v-if="formData.mode == Mode.YaoName">
				<el-col :span="14" :offset="5">
					<el-form-item
						:label="val"
						v-for="[key, val] in timesToName">
						<el-select v-model="formData[`yao${key}`]">
							<el-option
								v-for="(label, value) in YaoTypeToFullSymbol"
								:key="value"
								:label="label"
								:value="value" />
						</el-select>
					</el-form-item>
				</el-col>
			</div>

			<div v-if="formData.mode == Mode.GuaName">
				<el-col :span="14" :offset="5">
					<el-form-item label="本卦">
						<el-select v-model="formData.benGuaName" filterable>
							<el-option
								v-for="item in guaNames"
								:label="item.label"
								:value="item.value" />
						</el-select>
					</el-form-item>
					<el-form-item label="变卦">
						<el-select v-model="formData.bianGuaName" filterable>
							<el-option
								v-for="item in guaNames"
								:label="item.label"
								:value="item.value" />
						</el-select>
					</el-form-item>
				</el-col>
			</div>
			<el-form-item>
				<el-button
					round
					type="primary"
					size="large"
					style="width: 100%; margin: 30px auto"
					@click="submit()"
					>开始排盘</el-button
				>
			</el-form-item>
		</el-form>
	</div>
</template>
<style scoped>
.coin_char {
	position: absolute;
	left: 5px;
	width: 90px;
	height: 90px;
}

.coin {
	position: absolute;
	left: 5px;
	width: 90px;
	height: 90px;
}

.coin_char {
	display: block;
}

#yaoResult {
	justify-self: center;
}
</style>
