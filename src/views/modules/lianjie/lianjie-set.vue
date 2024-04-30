<template>
  <div v-if="this.parent.lianjieSetFlag">
    <el-form class="dy-add-set-detail-el-form" ref="ruleForm" :model="ruleForm" :rules="rules" label-width="110px">
      <template>
        <el-form-item class="dy-add-set-detail-el-form-item" label="名称" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入名称" clearable
            :readonly="ro.name"></el-input>
        </el-form-item>
        <el-form-item class="dy-add-set-detail-el-form-item" label="链接地址" prop="url">
          <el-input v-model="ruleForm.url" placeholder="请输入链接地址" clearable
            :readonly="ro.url"></el-input>
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
        name: false,
        url: false,

      },
      ruleForm: {
        users: { loginname: ''},
        name: '',
        url: '',

      },
      rules: {
        name: [{ required: true, message: '名称不能为空', trigger: 'blur' },],
        url: [{ required: true, message: '链接地址不能为空', trigger: 'blur' },],

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
        this.parent.lianjieSetFlag = false;
        this.parent.lianjieDetailFlag = false;
      } else {
        this.$router.replace('/lianjiemana')
      }
    },

    // 获取database.tableMap.table.idColunmRemarksName详情数据
    info(id) {
      this.$http({
        url: `lianjie/info/${id}`,
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
            url: `lianjie/update`,
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
                    this.parent.lianjieSetFlag = false;
                    this.parent.lianjieDetailFlag = false;
                    this.parent.search();
                  } else if(this.$storage.get('type') && this.$storage.get('type') == '0') {
                    this.$router.replace('/lianjiemana')
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
