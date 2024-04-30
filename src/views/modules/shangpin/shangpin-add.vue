<template>
  <div class="dy-admin-router-view-div">
    <el-form class="dy-add-set-detail-el-form" ref="ruleForm" :model="ruleForm" :rules="rules" label-width="110px">
    <el-form-item class="dy-add-set-detail-el-form-item" label="名称" prop="mingcheng">
      <el-input v-model="ruleForm.mingcheng" placeholder="请输入名称" clearable
        :readonly="ro.mingcheng"></el-input>
    </el-form-item>
    <el-form-item class="dy-add-set-detail-el-form-item" label="编号" prop="bianhao">
      <el-input v-model="ruleForm.bianhao" placeholder="请输入编号" clearable
        :readonly="ro.bianhao"></el-input>
    </el-form-item>
    <el-form-item class="dy-add-set-detail-el-form-item" label="分类" prop="zhongleiid">
      <el-select v-model="ruleForm.zhongleiid" placeholder="请选择分类">
        <el-option v-for="(item, index) in zhongleiOptions" v-bind:key="item.id" :label="item.mingcheng"
          :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item class="dy-add-set-detail-el-form-item" label="内容介绍" prop="neirong">
      <el-input style="min-width: 200px; max-width: 600px;" type="textarea" :rows="8" placeholder="请输入内容介绍"
        v-model="ruleForm.neirong" :readonly="ro.neirong">
      </el-input>
    </el-form-item>
    <el-form-item class="dy-add-set-detail-el-form-item" label="图片" prop="image">
      <file-upload tip="点击上传图片" action="common/uploadfile" :limit="1" :multiple="true"
        @change="imageUploadChange"></file-upload>
    </el-form-item>
    <el-form-item class="dy-add-set-detail-el-form-item" label="原价" prop="yuanshijiage">
      <el-input v-model="ruleForm.yuanshijiage" placeholder="请输入原价" clearable
        :readonly="ro.yuanshijiage"></el-input>
    </el-form-item>
    <el-form-item class="dy-add-set-detail-el-form-item" label="现价" prop="jiage">
      <el-input v-model="ruleForm.jiage" placeholder="请输入现价" clearable
        :readonly="ro.jiage"></el-input>
    </el-form-item>
    <el-form-item class="dy-add-set-detail-el-form-item" label="单位" prop="danwei">
      <el-input v-model="ruleForm.danwei" placeholder="请输入单位" clearable
        :readonly="ro.danwei"></el-input>
    </el-form-item>
    <el-form-item class="dy-add-set-detail-el-form-item" label="是否特价" prop="shenhe">
      <el-select v-model="ruleForm.shenhe">
        <el-option v-for="(item, index) in shenheOptions" v-bind:key="index" :label="item" :value="item">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item class="dy-add-set-detail-el-form-item" label="库存数量" prop="kucunshuliang">
      <el-input v-model="ruleForm.kucunshuliang" placeholder="请输入库存数量" clearable
        :readonly="ro.kucunshuliang"></el-input>
    </el-form-item>
    <el-form-item class="dy-add-set-detail-el-form-item" label="销售数量" prop="xiaoshoushuliang">
      <el-input v-model="ruleForm.xiaoshoushuliang" placeholder="请输入销售数量" clearable
        :readonly="ro.xiaoshoushuliang"></el-input>
    </el-form-item>
    <el-form-item class="dy-add-set-detail-el-form-item" label="用户" prop="usersid">
      <el-select v-model="users.loginname" disabled>
      </el-select>
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
        mingcheng: false,
        bianhao: false,
        zhongleiid: false,
        neirong: false,
        image: false,
        yuanshijiage: false,
        jiage: false,
        danwei: false,
        shenhe: false,
        kucunshuliang: false,
        xiaoshoushuliang: false,
        usersid: false,

      },
      ruleForm: {
        mingcheng: '',
        bianhao: '',
        zhongleiid: '',
        neirong: '',
        image: '',
        yuanshijiage: 0,
        jiage: 0,
        danwei: '',
        shenhe: '',
        kucunshuliang: 0,
        xiaoshoushuliang: 0,
        usersid: this.$storage.get('usersid'),

      },
      rules: {
        mingcheng: [{ required: true, message: '名称不能为空', trigger: 'blur' },],
        bianhao: [{ required: true, message: '编号不能为空', trigger: 'blur' },],
        zhongleiid: [{ required: true, message: '分类不能为空', trigger: 'blur' }, { validator: validateIntNumber, trigger: 'blur' },],
        neirong: [],
        image: [{ required: true, message: '图片不能为空', trigger: 'blur' },],
        yuanshijiage: [{ required: true, message: '原价不能为空', trigger: 'blur' }, { validator: validateIntNumber, trigger: 'blur' },],
        jiage: [{ required: true, message: '现价不能为空', trigger: 'blur' }, { validator: validateIntNumber, trigger: 'blur' },],
        danwei: [{ required: true, message: '单位不能为空', trigger: 'blur' },],
        shenhe: [{ required: true, message: '是否特价不能为空', trigger: 'blur' },],
        kucunshuliang: [{ required: true, message: '库存数量不能为空', trigger: 'blur' }, { validator: validateIntNumber, trigger: 'blur' },],
        xiaoshoushuliang: [{ required: true, message: '销售数量不能为空', trigger: 'blur' }, { validator: validateIntNumber, trigger: 'blur' },],
        usersid: [{ required: true, message: '用户不能为空', trigger: 'blur' }, { validator: validateIntNumber, trigger: 'blur' },],

      },
      xingbieOptions: [],
      typeOptions: [],
      shenheOptions: [],
        zhongleiOptions: [],
        usersOptions: [],

    };
  },
  props: ["parent"],
  computed: {
  },
  created() {
    this.init();
   this.ruleForm.shenhe = this.shenheOptions[0];
 
    this.getZhongleiList();
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
        this.parent.shangpinSetFlag = false;
        this.parent.shangpinDetailFlag = false;
      } else {
        this.$router.replace('/shangpinmana')
      }
    },

    // 提交
    onSubmit() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          this.$http({
            url: `shangpin/save`,
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
                    this.parent.shangpinSetFlag = false;
                    this.parent.shangpinDetailFlag = false;
                    this.parent.search();
                  } else if(this.$storage.get('type') && this.$storage.get('type') == '0') {
                    this.$router.replace('/shangpinmana')
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

    //图片上传回调
    imageUploadChange(fileUrl) {
      this.ruleForm.image= fileUrl;
    },
 
    //获取所有分类
    getZhongleiList() {
      this.$http({
        url: "zhonglei/all",
        method: "get",
        params: null
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.zhongleiOptions = data.data;
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
