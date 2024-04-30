<template>
	<div>
		<div>
			<!--头部 系统logo-->
			<img v-if="true" class="dy-index-header-logo"  src="~@/assets/img/logo.png" fit="cover" />
			<!--头部 项目名称-->
			<span class="dy-index-header-title-span">{{this.$project.projectName}}</span>
		</div>
		<div class="dy-index-header-right-div">
			<!--头部 登陆用户信息-->
			<!-- <el-button v-show="this.$storage.get('type') == '0'" type="primary" icon="el-icon-copy-document" size="mini"
				@click="onBackupDataBase">数据备份</el-button> -->
			<div class="dy-index-header-right-usersinfo-div">{{this.$storage.get('typename')}} {{this.$storage.get('adminName')}}</div>
			<div v-if="users.money" class="dy-index-header-right-usersmoney-div">帐号余额：￥{{users.money}}</div>
			<div class="dy-index-header-right-logout-div" @click="onIndexTap">返回前台</div>
			<div class="dy-index-header-right-logout-div" @click="onLogout">退出登录</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				users: {},
			};
		},
		created() {
			
		},
		mounted() {
			this.$http({
				url: 'users/session',
				method: "get"
			}).then(({
				data
			}) => {
				if (data && data.code === 0) {
					this.users = data.data;
					// this.users.money=800;
					this.$storage.set("users", data.data);
					this.$storage.set("usersid", data.data.id);
				} else {
					let message = this.$message
					message.error(data.message);
				}
			});
		},
		methods: {
			onLogout() {
				let storage = this.$storage
				let router = this.$router
				storage.clear()
				router.replace({
					name: "login"
				});
			},
			onIndexTap(){
				window.location.href = `${this.$base.indexUrl}`
			},
			onBackupDataBase() {
			let url = `${this.$base.url}` + "common/backup";
			window.location.href = url;
			setTimeout(() => {
				this.$message.success("备份完成。请到浏览器下载列表里查看！");
			}, 3000);
		},
		}
	};
</script>


<style lang="scss" scoped>

</style>
