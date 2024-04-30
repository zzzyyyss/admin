<template>
  <div v-if="this.parent.peisongSetFlag">
    <el-form class="dy-add-set-detail-el-form" ref="ruleForm" :model="ruleForm" :rules="rules" label-width="110px">
      <template>
        <el-form-item class="dy-add-set-detail-el-form-item" label="客户姓名" prop="xingming">
          <el-input v-model="ruleForm.xingming" placeholder="请输入客户姓名" clearable
            :readonly="ro.xingming"></el-input>
        </el-form-item>
        <el-form-item class="dy-add-set-detail-el-form-item" label="订单" prop="dingdanid">
          <el-select v-model="ruleForm.dingdanid" :readonly="ro.dingdanid" placeholder="请选择订单">
            <el-option v-for="(item, index) in dingdanOptions" v-bind:key="item.id" :label="item.bianhao"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="dy-add-set-detail-el-form-item" label="电话" prop="dianhua">
          <el-input v-model="ruleForm.dianhua" placeholder="请输入电话" clearable
            :readonly="ro.dianhua"></el-input>
        </el-form-item>
        <el-form-item class="dy-add-set-detail-el-form-item" label="地址" prop="dizhi">
          <el-input v-model="ruleForm.dizhi" placeholder="请输入地址" clearable
            :readonly="ro.dizhi"></el-input>
        </el-form-item>
        <el-form-item class="dy-add-set-detail-el-form-item" label="时间" prop="shijian">
          <el-date-picker v-model="ruleForm.shijian" type="datetime" format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss" placeholder="请选择时间" :readonly="ro.shijian">
          </el-date-picker>
        </el-form-item>
        <el-form-item class="dy-add-set-detail-el-form-item" label="是否接单" prop="songshenhe">
          <el-select v-model="ruleForm.songshenhe" :readonly="ro.songshenhe">
            <el-option v-for="(item, index) in shenheOptions" v-bind:key="index" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="dy-add-set-detail-el-form-item" label="配送员姓名" prop="psxingming">
          <el-input v-model="ruleForm.psxingming" placeholder="请输入配送员姓名" clearable
            :readonly="ro.psxingming"></el-input>
        </el-form-item>
        <el-form-item class="dy-add-set-detail-el-form-item" label="配送员电话" prop="psdianhua">
          <el-input v-model="ruleForm.psdianhua" placeholder="请输入配送员电话" clearable
            :readonly="ro.psdianhua"></el-input>
        </el-form-item>
        <el-form-item class="dy-add-set-detail-el-form-item" label="用户" prop="usersslid">
          <el-select v-model="ruleForm.usersslid" :readonly="ro.usersslid" placeholder="请选择用户">
            <el-option v-for="(item, index) in usersOptions" v-bind:key="item.id" :label="item.loginname"
              :value="item.id">
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
        xingming: false,
        dingdanid: false,
        dianhua: false,
        dizhi: false,
        shijian: false,
        songshenhe: false,
        psxingming: false,
        psdianhua: false,
        usersslid: false,

      },
      ruleForm: {
        users: { loginname: ''},
        xingming: '',
        dingdanid: '',
        dianhua: '',
        dizhi: '',
        shijian: this.getCurrentTime(1),
        songshenhe: '',
        psxingming: '',
        psdianhua: '',
        usersslid: '',

      },
      rules: {
        xingming: [{ required: true, message: '客户姓名不能为空', trigger: 'blur' },],
        dingdanid: [{ required: true, message: '订单不能为空', trigger: 'blur' }, { validator: validateIntNumber, trigger: 'blur' },],
        dianhua: [{ required: true, message: '电话不能为空', trigger: 'blur' }, { validator: validateMobile, trigger: 'blur' },],
        dizhi: [{ required: true, message: '地址不能为空', trigger: 'blur' },],
        shijian: [{ required: true, message: '时间不能为空', trigger: 'blur' },],
        songshenhe: [{ required: true, message: '是否接单不能为空', trigger: 'blur' },],
        psxingming: [{ required: true, message: '配送员姓名不能为空', trigger: 'blur' },],
        psdianhua: [{ required: true, message: '配送员电话不能为空', trigger: 'blur' }, { validator: validateMobile, trigger: 'blur' },],
        usersslid: [{ required: true, message: '用户不能为空', trigger: 'blur' }, { validator: validateIntNumber, trigger: 'blur' },],

      },
      xingbieOptions: [],
      typeOptions: [],
      shenheOptions: [],
        dingdanOptions: [],
        usersOptions: [],

    };
  },
  props: ["parent"],
  computed: {
  },
  created() {
   this.ruleForm.songshenhe = this.shenheOptions[0];
 
    this.getDingdanList();
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
        this.parent.peisongSetFlag = false;
        this.parent.peisongDetailFlag = false;
      } else {
        this.$router.replace('/peisongmana')
      }
    },

    // 获取database.tableMap.table.idColunmRemarksName详情数据
    info(id) {
      this.$http({
        url: `peisong/info/${id}`,
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
            url: `peisong/update`,
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
                    this.parent.peisongSetFlag = false;
                    this.parent.peisongDetailFlag = false;
                    this.parent.search();
                  } else if(this.$storage.get('type') && this.$storage.get('type') == '0') {
                    this.$router.replace('/peisongmana')
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

 
    //获取所有订单
    getDingdanList() {
      this.$http({
        url: "dingdan/all",
        method: "get",
        params: null
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.dingdanOptions = data.data;
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
<style lang="scss">
.search-box {
  position: absolute;
}

.el-date-editor.el-input {
  width: auto;
}
</style>
