<template>
	<div>
		<div class="dy-register-container-div">
			<el-form ref="ruleForm" class="dy-register-el-form" :model="ruleForm" :rules="rules" label-width="100px">
				<div v-if="true" class="dy-register-title-container-div">新用户注册</div>
				<el-form-item label="用户名称" class="dy-register-el-form-item" prop="loginname">
					<el-input autocomplete="off" style="width: 90%;" v-model="ruleForm.loginname" placeholder="请输入用户名称" clearable
              :readonly="ro.loginname"></el-input>
				</el-form-item>
				<el-form-item label="密码" class="dy-register-el-form-item" prop="loginpw">
					<el-input autocomplete="off" style="width: 90%;" v-model="ruleForm.loginpw" placeholder="请输入密码" clearable
              :readonly="ro.loginpw"></el-input>
				</el-form-item>
				<el-form-item label="类型" class="dy-register-el-form-item" prop="type">
					<el-select v-model="ruleForm.type" placeholder="请选择类型" @change="typeChange($event)" disabled>
						<el-option v-for="(item, index) in typeOptions" v-bind:key="item.value" :label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="类型名称" class="dy-register-el-form-item" prop="typename">
					<el-input autocomplete="off" style="width: 90%" v-model="ruleForm.typename" placeholder="类型名称" clearable :readonly="true" disabled></el-input>
				</el-form-item>
				<el-form-item label="姓名" class="dy-register-el-form-item" prop="xingming">
					<el-input autocomplete="off" style="width: 90%;" v-model="ruleForm.xingming" placeholder="请输入姓名" clearable
              :readonly="ro.xingming"></el-input>
				</el-form-item>
				<el-form-item label="性别" class="dy-register-el-form-item" prop="xingbie">
					<el-select v-model="ruleForm.xingbie" placeholder="请选择性别" clearable>
						<el-option v-for="(item, index) in xingbieOptions" v-bind:key="index" :label="item" :value="item">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="年龄" class="dy-register-el-form-item" prop="nianling">
					<el-input autocomplete="off" style="width: 90%;" v-model="ruleForm.nianling" placeholder="请输入年龄" clearable
              :readonly="ro.nianling"></el-input>
				</el-form-item>
				<el-form-item label="地址" class="dy-register-el-form-item" prop="address">
					<el-input autocomplete="off" style="width: 90%;" v-model="ruleForm.address" placeholder="请输入地址" clearable
              :readonly="ro.address"></el-input>
				</el-form-item>
				<el-form-item label="电话" class="dy-register-el-form-item" prop="dianhua">
					<el-input autocomplete="off" style="width: 90%;" v-model="ruleForm.dianhua" placeholder="请输入电话" clearable
              :readonly="ro.dianhua"></el-input>
				</el-form-item>
				<el-form-item label="审核" class="dy-register-el-form-item" prop="shenhe" v-show="false">
					<el-select v-model="ruleForm.shenhe" clearable>
						<el-option v-for="(item, index) in shenheOptions" v-bind:key="index" :label="item" :value="item">
						</el-option>
					</el-select>
				</el-form-item>

				<el-button class="dy-registe-register-button" @click="onSubmit">注册</el-button>
				<div class="dy-registe-login-div" @click="toLogin">已有账号，直接登录</div>
			</el-form>

		</div>
	</div>
</template>

<script>
// 数字，邮件，手机，url，身份证校验
import { isNumber, isIntNumer, isEmail, isPhone, isMobile, isURL, checkIdCard } from "@/utils/validate";
export default {
	data() {
		let self = this
		var validateIdCard = (rule, value, callback) => {
			if (!value) {
				callback();
			} else if (!checkIdCard(value)) {
				callback(new Error("请输入正确的身份证号码"));
			} else {
				callback();
			}
		};
		var validateUrl = (rule, value, callback) => {
			if (!value) {
				callback();
			} else if (!isURL(value)) {
				callback(new Error("请输入正确的URL地址"));
			} else {
				callback();
			}
		};
		var validateMobile = (rule, value, callback) => {
			if (!value) {
				callback();
			} else if (!isMobile(value)) {
				callback(new Error("请输入正确的手机号码"));
			} else {
				callback();
			}
		};
		var validatePhone = (rule, value, callback) => {
			if (!value) {
				callback();
			} else if (!isPhone(value)) {
				callback(new Error("请输入正确的电话号码"));
			} else {
				callback();
			}
		};
		var validateEmail = (rule, value, callback) => {
			if (!value) {
				callback();
			} else if (!isEmail(value)) {
				callback(new Error("请输入正确的邮箱地址"));
			} else {
				callback();
			}
		};
		var validateNumber = (rule, value, callback) => {
			if (!value) {
				callback();
			} else if (!isNumber(value)) {
				callback(new Error("请输入数字"));
			} else {
				callback();
			}
		};
		var validateIntNumber = (rule, value, callback) => {
			if (!value) {
				callback();
			} else if (!isIntNumer(value)) {
				callback(new Error("请输入整数"));
			} else {
				callback();
			}
		};
		return {
			ro: {
        loginname: false,
        loginpw: false,
        type: false,
        typename: false,
        xingming: false,
        xingbie: false,
        nianling: false,
        address: false,
        dianhua: false,
        shenhe: false,

			},
			ruleForm: {
        loginname: '',
        loginpw: '',
        type: '2',
        typename: '用户',
        xingming: '',
        xingbie: '',
        nianling: '',
        address: '',
        dianhua: '',
        shenhe: '',

			},
			rules: {
        loginname: [{ required: true, message: '用户名称不能为空', trigger: 'blur' },],
        loginpw: [{ required: true, message: '密码不能为空', trigger: 'blur' },],
        type: [{ required: true, message: '类型不能为空', trigger: 'blur' },],
        typename: [{ required: true, message: '类型名称不能为空', trigger: 'blur' },],
        xingming: [{ required: true, message: '姓名不能为空', trigger: 'blur' },],
        xingbie: [{ required: true, message: '性别不能为空', trigger: 'blur' },],
        nianling: [{ required: true, message: '年龄不能为空', trigger: 'blur' },],
        address: [{ required: true, message: '地址不能为空', trigger: 'blur' },],
        dianhua: [{ required: true, message: '电话不能为空', trigger: 'blur' }, { validator: validateMobile, trigger: 'blur' },],
        shenhe: [{ required: true, message: '审核不能为空', trigger: 'blur' },],

			},
			xingbieOptions: [],
			typeOptions: [],
			shenheOptions: [],

		};
	},
	computed: {
	},
	created() {
		this.init();
   this.ruleForm.shenhe = this.shenheOptions[1];
 
 
	},
	methods: {
		//获取当前日期或时间（yyyy-MM-dd 或 yyyy-MM-dd hh:mm:ss）
		getCurrentTime(type) {
			var date = new Date();
			var year = date.getFullYear();
			/* 在日期格式中，月份是从0开始的，因此要加0
			 * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
			 * */
			var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
			var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
			var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
			var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
			var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
			if (type && type == 1) {
				// 拼接
				return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
			} else {
				return year + "-" + month + "-" + day
			}
		},


		typeChange(value) {
			// console.log(value);
			let obj = {};
			obj = this.typeOptions.find((item) => { // 遍历typeOptions
				return item.value === value; // 筛选出匹配数据据
			});
			// console.log(obj.label);
			this.ruleForm.typename = obj.label;
		},
		// 初始化
		init() {
			this.shenheOptions = "no,yes".split(',')
			this.xingbieOptions = "男,女".split(',')
			this.typeOptions = this.$userstypes
		},

		// 提交
		onSubmit() {
			this.$refs["ruleForm"].validate(valid => {
				if (valid) {
					this.$http({
						url: `users/save`,
						method: "post",
						data: this.ruleForm
					}).then(({ data }) => {
						if (data && data.code === 0) {
							this.$message({
								message: "注册成功,现在可以去登陆了！",
								type: "success",
								duration: 1500,
								onClose: () => {
									this.$router.replace('/login')
								}
							});
						} else {
							this.$message.error(data.message);
						}
					});
				}
			});
		},

		toLogin() {
			this.$router.push({ path: '/login' });
		},
 

	}
};
</script>

<style lang="scss" scoped></style>
