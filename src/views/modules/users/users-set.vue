<template>
  <div v-if="this.parent.usersSetFlag">
    <el-form class="dy-add-set-detail-el-form" ref="ruleForm" :model="ruleForm" :rules="rules" label-width="110px">
      <template>
        <el-form-item class="dy-add-set-detail-el-form-item" label="用户名称" prop="loginname">
          <el-input v-model="ruleForm.loginname" placeholder="请输入用户名称" clearable
            :readonly="ro.loginname"></el-input>
        </el-form-item>
        <el-form-item class="dy-add-set-detail-el-form-item" label="密码" prop="loginpw">
          <el-input v-model="ruleForm.loginpw" placeholder="请输入密码" clearable
            :readonly="ro.loginpw"></el-input><i style="color: red;">(请输入新密码,不输入则原密码不变!)</i>
        </el-form-item>
        <el-form-item class="dy-add-set-detail-el-form-item" label="类型" prop="type">
          <el-select v-model="ruleForm.type" placeholder="请选择类型" @change="typeChange($event)">
            <el-option v-for="(item, index) in typeOptions" v-bind:key="item.value" :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="dy-add-set-detail-el-form-item" label="类型名称" prop="typename">
          <el-input v-model="ruleForm.typename" placeholder="类型名称" clearable :readonly="true"></el-input>
        </el-form-item>
        <el-form-item class="dy-add-set-detail-el-form-item" label="姓名" prop="xingming">
          <el-input v-model="ruleForm.xingming" placeholder="请输入姓名" clearable
            :readonly="ro.xingming"></el-input>
        </el-form-item>
        <el-form-item class="dy-add-set-detail-el-form-item" label="性别" prop="xingbie">
          <el-select v-model="ruleForm.xingbie" placeholder="请选择性别" :readonly="ro.xingbie" clearable>
            <el-option v-for="(item, index) in xingbieOptions" v-bind:key="index" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="dy-add-set-detail-el-form-item" label="年龄" prop="nianling">
          <el-input v-model="ruleForm.nianling" placeholder="请输入年龄" clearable
            :readonly="ro.nianling"></el-input>
        </el-form-item>
        <el-form-item class="dy-add-set-detail-el-form-item" label="地址" prop="address">
          <el-input v-model="ruleForm.address" placeholder="请输入地址" clearable
            :readonly="ro.address"></el-input>
        </el-form-item>
        <el-form-item class="dy-add-set-detail-el-form-item" label="电话" prop="dianhua">
          <el-input v-model="ruleForm.dianhua" placeholder="请输入电话" clearable
            :readonly="ro.dianhua"></el-input>
        </el-form-item>
        <el-form-item class="dy-add-set-detail-el-form-item" label="审核" prop="shenhe">
          <el-select v-model="ruleForm.shenhe" :readonly="ro.shenhe">
            <el-option v-for="(item, index) in shenheOptions" v-bind:key="index" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>

      </template>
      <el-form-item class="dy-add-set-detail-el-form-item-2">
        <el-button class="dy-add-button" @click="onSubmit">提交</el-button>
        <el-button class="dy-back-button" @click="back">取消</el-button>
      </el-form-item>
    </el-form>
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
    var validateRate = (rule, value, callback) => {
      if (value == 0) {
        callback(new Error("分数选择范围为1-5"));
      } else {
        callback();
      }
    };
    return {
      id: 0,
      users: { loginname: this.$storage.get('adminName') },
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
        users: { loginname: ''},
        loginname: '',
        loginpw: '',
        type: '',
        typename: '',
        xingming: '',
        xingbie: '',
        nianling: '',
        address: '',
        dianhua: '',
        shenhe: '',

      },
      rules: {
        loginname: [{ required: true, message: '用户名称不能为空', trigger: 'blur' },],
        loginpw: [],
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
  props: ["parent"],
  computed: {
  },
  created() {
   this.ruleForm.shenhe = this.shenheOptions[0];
 
   
  },
  methods: {
    // 下载
    download(fileUrl) {
      let url = this.$base.url + "/common/download?filename=" + fileUrl;
      url = encodeURI(url);
      window.open(url);
      // window.open(this.$base.url + fileUrl);
    },
    getFileSrc(fileUrl) {
      return this.$base.url + fileUrl;
    },
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
      obj = this.typeOptions.find((item) => { //遍历typeOptions
        return item.value === value; // 筛选出匹配数据
      });
      // console.log(obj.label);
      this.ruleForm.typename = obj.label;
    },
    // 初始化
    init(id) {
      this.shenheOptions = "no,yes".split(',')
      this.xingbieOptions = "男,女".split(',')
      this.typeOptions = this.$userstypes
      if(id){
        this.id=id;
        this.info(id);
      }
    },

    // 返回
    back() {
      if (this.parent) {
        this.parent.showFlag = true;
        this.parent.usersSetFlag = false;
        this.parent.usersDetailFlag = false;
      } else {
        this.$router.replace('/usersmana')
      }
    },

    // 获取database.tableMap.table.idColunmRemarksName详情数据
    info(id) {
      this.$http({
        url: `users/info/${id}`,
        method: "get"
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.ruleForm = data.data;
          if (this.ruleForm.fenshu) {
            this.ruleForm.fenshu = Number(this.ruleForm.fenshu);
          }
          if (this.ruleForm.loginpw) {
            this.ruleForm.loginpw = "";
          }
        } else {
          this.$message.error(data.message);
        }
      });
    },

    // 提交
    onSubmit() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          this.$http({
            url: `users/update`,
            method: "post",
            data: this.ruleForm
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.$message({
                message: "操作成功",
                type: "success",
                duration: 1500,
                onClose: () => {
                  if (this.parent) {
                    this.parent.showFlag = true;
                    this.parent.usersSetFlag = false;
                    this.parent.usersDetailFlag = false;
                    this.parent.search();
                  } else if(this.$storage.get('type') && this.$storage.get('type') == '0') {
                    this.$router.replace('/usersmana')
                  }
                }
              });
            } else {
              this.$message.error(data.message);
            }
          });
        }
      });
    },

 
 
  }
};
</script>
<style lang="scss">
.search-box {
  position: absolute;
}

.el-date-editor.el-input {
  width: auto;
}
</style>
