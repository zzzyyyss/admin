<template>
  <div class="dy-admin-router-view-div">
    <el-form class="dy-add-set-detail-el-form" ref="ruleForm" :model="ruleForm" :rules="rules" label-width="110px">
    <el-form-item class="dy-add-set-detail-el-form-item" label="类别" prop="leibie">
      <el-input v-model="ruleForm.leibie" placeholder="请输入类别" clearable
        :readonly="ro.leibie"></el-input>
    </el-form-item>
    <el-form-item class="dy-add-set-detail-el-form-item" label="内容" prop="content">
      <el-input style="min-width: 200px; max-width: 600px;" type="textarea" :rows="8" placeholder="请输入内容"
        v-model="ruleForm.content" :readonly="ro.content">
      </el-input>
    </el-form-item>
    <el-form-item class="dy-add-set-detail-el-form-item" label="时间" prop="addtime">
      <el-date-picker v-model="ruleForm.addtime" type="datetime" format="yyyy-MM-dd HH:mm:ss"
        value-format="yyyy-MM-dd HH:mm:ss" placeholder="请选择时间" :readonly="ro.addtime">
      </el-date-picker>
    </el-form-item>

      <el-form-item class="dy-add-set-detail-el-form-item-2">
        <el-button class="dy-add-button" @click="onSubmit">提交</el-button>
        <el-button v-show="this.$storage.get('type') && this.$storage.get('type') == '0'" class="dy-back-button" @click="back">取消</el-button>
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
      users: { loginname: this.$storage.get('adminName') },
      ro: {
        leibie: false,
        content: false,
        addtime: false,

      },
      ruleForm: {
        leibie: '',
        content: '',
        addtime: this.getCurrentTime(1),

      },
      rules: {
        leibie: [{ required: true, message: '类别不能为空', trigger: 'blur' },],
        content: [],
        addtime: [{ required: true, message: '时间不能为空', trigger: 'blur' },],

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
    this.init();
 
   
  },
  methods: {
    // 下载
    download(fileUrl) {
      let url = this.$base.url + "/common/download?filename=" + fileUrl;
      url = encodeURI(url);
      window.open(url);
      // window.open(this.$base.url + fileUrl);
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
      obj = this.typeOptions.find((item) => { // 遍历typeOptions
        return item.value === value; // 筛选出匹配数据
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

    // 返回
    back() {
      if (this.parent) {
        this.parent.showFlag = true;
        this.parent.dxSetFlag = false;
        this.parent.dxDetailFlag = false;
      } else {
        this.$router.replace('/dxmana')
      }
    },

    // 提交
    onSubmit() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          this.$http({
            url: `dx/save`,
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
                    this.parent.dxSetFlag = false;
                    this.parent.dxDetailFlag = false;
                    this.parent.search();
                  } else if(this.$storage.get('type') && this.$storage.get('type') == '0') {
                    this.$router.replace('/dxmana')
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
<style lang="scss" scoped>
.search-box {
  position: absolute;
}
.el-date-editor.el-input {
  width: auto;
}
</style>
