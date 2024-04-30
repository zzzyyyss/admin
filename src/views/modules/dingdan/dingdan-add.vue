<template>
  <div class="dy-admin-router-view-div">
    <el-form class="dy-add-set-detail-el-form" ref="ruleForm" :model="ruleForm" :rules="rules" label-width="110px">
    <el-form-item class="dy-add-set-detail-el-form-item" label="编号" prop="bianhao">
      <el-input v-model="ruleForm.bianhao" placeholder="请输入编号" clearable
        :readonly="ro.bianhao"></el-input>
    </el-form-item>
    <el-form-item class="dy-add-set-detail-el-form-item" label="订单金额" prop="jine">
      <el-input v-model="ruleForm.jine" placeholder="请输入订单金额" clearable
        :readonly="ro.jine"></el-input>
    </el-form-item>
    <el-form-item class="dy-add-set-detail-el-form-item" label="是否支付" prop="zhifushenhe">
      <el-select v-model="ruleForm.zhifushenhe">
        <el-option v-for="(item, index) in shenheOptions" v-bind:key="index" :label="item" :value="item">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item class="dy-add-set-detail-el-form-item" label="是否发货" prop="fahuoshenhe">
      <el-select v-model="ruleForm.fahuoshenhe">
        <el-option v-for="(item, index) in shenheOptions" v-bind:key="index" :label="item" :value="item">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item class="dy-add-set-detail-el-form-item" label="是否收货" prop="shouhuoshenhe">
      <el-select v-model="ruleForm.shouhuoshenhe">
        <el-option v-for="(item, index) in shenheOptions" v-bind:key="index" :label="item" :value="item">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item class="dy-add-set-detail-el-form-item" label="付款方式" prop="fukuanfangshiid">
      <el-select v-model="ruleForm.fukuanfangshiid" placeholder="请选择付款方式">
        <el-option v-for="(item, index) in fukuanfangshiOptions" v-bind:key="item.id" :label="item.mingcheng"
          :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item class="dy-add-set-detail-el-form-item" label="收货地址" prop="shouhuodizhiid">
      <el-select v-model="ruleForm.shouhuodizhiid" placeholder="请选择收货地址">
        <el-option v-for="(item, index) in shouhuodizhiOptions" v-bind:key="item.id" :label="item.xingming"
          :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item class="dy-add-set-detail-el-form-item" label="商家ID" prop="shangjia">
      <el-input v-model="ruleForm.shangjia" placeholder="请输入商家ID" clearable
        :readonly="ro.shangjia"></el-input>
    </el-form-item>
    <el-form-item class="dy-add-set-detail-el-form-item" label="用户" prop="usersid">
      <el-select v-model="users.loginname" disabled>
      </el-select>
    </el-form-item>
    <el-form-item class="dy-add-set-detail-el-form-item" label="时间" prop="shijian">
      <el-date-picker v-model="ruleForm.shijian" type="datetime" format="yyyy-MM-dd HH:mm:ss"
        value-format="yyyy-MM-dd HH:mm:ss" placeholder="请选择时间" :readonly="ro.shijian">
      </el-date-picker>
    </el-form-item>
    <el-form-item class="dy-add-set-detail-el-form-item" label="备注" prop="beizhu">
      <el-input v-model="ruleForm.beizhu" placeholder="请输入备注" clearable
        :readonly="ro.beizhu"></el-input>
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
        bianhao: false,
        jine: false,
        zhifushenhe: false,
        fahuoshenhe: false,
        shouhuoshenhe: false,
        fukuanfangshiid: false,
        shouhuodizhiid: false,
        shangjia: false,
        usersid: false,
        shijian: false,
        beizhu: false,

      },
      ruleForm: {
        bianhao: '',
        jine: '',
        zhifushenhe: '',
        fahuoshenhe: '',
        shouhuoshenhe: '',
        fukuanfangshiid: '',
        shouhuodizhiid: '',
        shangjia: '',
        usersid: this.$storage.get('usersid'),
        shijian: this.getCurrentTime(1),
        beizhu: '',

      },
      rules: {
        bianhao: [{ required: true, message: '编号不能为空', trigger: 'blur' },],
        jine: [{ required: true, message: '订单金额不能为空', trigger: 'blur' }, { validator: validateIntNumber, trigger: 'blur' },],
        zhifushenhe: [{ required: true, message: '是否支付不能为空', trigger: 'blur' },],
        fahuoshenhe: [{ required: true, message: '是否发货不能为空', trigger: 'blur' },],
        shouhuoshenhe: [{ required: true, message: '是否收货不能为空', trigger: 'blur' },],
        fukuanfangshiid: [{ required: true, message: '付款方式不能为空', trigger: 'blur' }, { validator: validateIntNumber, trigger: 'blur' },],
        shouhuodizhiid: [{ required: true, message: '收货地址不能为空', trigger: 'blur' }, { validator: validateIntNumber, trigger: 'blur' },],
        shangjia: [{ required: true, message: '商家ID不能为空', trigger: 'blur' },],
        usersid: [{ required: true, message: '用户不能为空', trigger: 'blur' }, { validator: validateIntNumber, trigger: 'blur' },],
        shijian: [{ required: true, message: '时间不能为空', trigger: 'blur' },],
        beizhu: [{ required: true, message: '备注不能为空', trigger: 'blur' },],

      },
      xingbieOptions: [],
      typeOptions: [],
      shenheOptions: [],
        fukuanfangshiOptions: [],
        shouhuodizhiOptions: [],
        usersOptions: [],

    };
  },
  props: ["parent"],
  computed: {
  },
  created() {
    this.init();
   this.ruleForm.zhifushenhe = this.shenheOptions[0];
   this.ruleForm.fahuoshenhe = this.shenheOptions[0];
   this.ruleForm.shouhuoshenhe = this.shenheOptions[0];
 
    this.getFukuanfangshiList();
    this.getShouhuodizhiList();
    this.getUsersList();
   
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
        this.parent.dingdanSetFlag = false;
        this.parent.dingdanDetailFlag = false;
      } else {
        this.$router.replace('/dingdanmana')
      }
    },

    // 提交
    onSubmit() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          this.$http({
            url: `dingdan/save`,
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
                    this.parent.dingdanSetFlag = false;
                    this.parent.dingdanDetailFlag = false;
                    this.parent.search();
                  } else if(this.$storage.get('type') && this.$storage.get('type') == '0') {
                    this.$router.replace('/dingdanmana')
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

 
    //获取所有付款方式
    getFukuanfangshiList() {
      this.$http({
        url: "fukuanfangshi/all",
        method: "get",
        params: null
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.fukuanfangshiOptions = data.data;
        }
      });
    },
    //获取所有收货地址
    getShouhuodizhiList() {
      this.$http({
        url: "shouhuodizhi/all",
        method: "get",
        params: null
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.shouhuodizhiOptions = data.data;
        }
      });
    },
    //获取所有用户
    getUsersList() {
      this.$http({
        url: "users/all",
        method: "get",
        params: null
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.usersOptions = data.data;
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
