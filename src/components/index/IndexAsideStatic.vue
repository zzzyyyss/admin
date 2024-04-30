<template>
	<div>
		<!-- 左侧竖向菜单栏 -->
		<el-scrollbar wrap-class="scrollbar-wrapper">
			<el-menu :default-openeds="[]" :unique-opened="true" class="dy-index-aside-el-menu"
				:default-active="activeIndex">
				<el-submenu index="0" @click.native="menuHandler('')" id="index">
					<template slot="title">
						<i v-if='true' class="dy-index-el-submenu-item-i el-icon-s-home" />
						<span class="dy-index-el-submenu-item-span">系统首页</span>
					</template>
				</el-submenu>


				<el-submenu v-for=" (menu, index) in menuList.backMenu" :key="menu.menu" :index="index + 1 + ''">
					<template slot="title">
						<i v-if='true' class="dy-index-el-submenu-item-i el-icon-menu" :class="menu.iconClass" />
						<span class="dy-index-el-submenu-item-span">{{ menu.menu }}</span>
					</template>
					<el-menu-item v-for=" (child, sort) in menu.child" :key="sort" :index="(index + 1) + '-' + sort"
						@click="menuHandler(child.routerName)">
						<i v-if='true' class="dy-index-el-submenu-item-i el-icon-menu" :class="child.iconClass" />
						<span class="dy-index-el-submenu-item-span">{{ child.menu }}</span>
					</el-menu-item>
				</el-submenu>
			</el-menu>
		</el-scrollbar>

	</div>
</template>

<script>
import menu from '@/utils/menu'
export default {
	data() {
		return {
			menuList: [],
			typename: '',
			type: "",
			activeIndex: '/index',
		}
	},
	mounted() {
		const menus = menu.list()
		this.menuList = menus
		this.typename = this.$storage.get('typename')
		this.type = this.$storage.get('type')
		for (let i = 0; i < this.menuList.length; i++) {
			if (this.menuList[i].type == this.type) {
				this.menuList = this.menuList[i];
				break;
			}
		}
		this.activeIndex = this.$route.path;
	},
	created() {

	},
	methods: {
		menuHandler(name) {
			let router = this.$router
			name = '/' + name
			router.push(name)
		},
	}
}
</script>
<style lang="scss" scoped>
/deep/ #index .el-submenu__title .el-submenu__icon-arrow {
	display: none;
}
</style>
