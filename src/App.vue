<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'
import { isDate } from 'element-plus/es/utils/types.mjs'
const activeIndex = ref('1')
const media = window.matchMedia('(prefers-color-scheme: dark)')
function changeColorMode(isDark: boolean) {
	const dark = isDark ? 'dark' : ''
	const html = document.getElementsByTagName('html')
	html[0].setAttribute('class', dark)
}
if (media) {
	changeColorMode(media.matches)
	media.addEventListener('change', (event) => {
		changeColorMode(event.matches)
	})
}
</script>

<template>
	<header>
		<el-menu
			:default-active="activeIndex"
			class="menu"
			mode="horizontal"
			router="true"
			:ellipsis="false">
			<el-menu-item index="0" route="/">
				<img
					style="width: 30px"
					src="./assets/logo.png"
					alt="吉庆六爻" />
			</el-menu-item>
			<el-menu-item index="1" route="/">排盘 </el-menu-item>
			<el-menu-item index="2" route="/liuyao/history">记录 </el-menu-item>
		</el-menu>
	</header>
	<main>
		<RouterView />
	</main>
	<footer></footer>
</template>

<style scoped>
.el-menu--horizontal > .el-menu-item:nth-child(1) {
	margin-right: auto;
}
.menu {
	margin-bottom: 24px;
}
</style>
