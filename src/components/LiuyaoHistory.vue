<script setup lang="ts">
import { liuyaoStore, LiuyaoHistory } from '../stores/liuyao'
import type { LiuyaoRecord } from '../stores/liuyao'
import { useRouter } from 'vue-router'
import { format } from '../lib/date'
import { ref } from 'vue'
const tableData = ref([] as LiuyaoRecord[])
tableData.value = LiuyaoHistory.list()
const handleDelete = (index: number, row: LiuyaoRecord) => {
	LiuyaoHistory.delete(row.key)
	tableData.value = LiuyaoHistory.list()
}
const router = useRouter()
const useStore = liuyaoStore()
function paipan(r: LiuyaoRecord) {
	useStore.data = {
		time: r.time,
		question: r.question,
		mode: r.mode,
		yaos: new Array<number>(),
		benGuaName: r.benGuaName,
		bianGuaName: r.bianGuaName,
		isHistory: true,
	}
	router.push({ name: 'liuyaopan' })
}
</script>
<template>
	<el-table :data="tableData" row-key="id" :show-header="false">
		<el-table-column>
			<template #default="props">
				<div @click="paipan(props.row)">
					<div>
						{{ props.row.benGuaName }} 之
						{{ props.row.bianGuaName }}
						<el-text
							class="mx-1"
							type="info"
							size="small"
							style="float: right"
							>{{ format(props.row.time) }}</el-text
						>
					</div>
					<el-text
						class="mx-1"
						type="info"
						size="small"
						v-if="props.row.question"
						>占问：{{ props.row.question }}</el-text
					>
				</div>
			</template>
		</el-table-column>
		<el-table-column align="right" width="80">
			<template #default="scope">
				<el-button
					label="操作"
					size="small"
					type="danger"
					@click="handleDelete(scope.$index, scope.row)">
					删除
				</el-button>
			</template>
		</el-table-column>
	</el-table>
</template>
<style scoped>
.table {
	width: 100%;
}
</style>
