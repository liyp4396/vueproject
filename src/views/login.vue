<template>
  <div class="login">
    <h1>欢迎登录个人系统</h1>
    <div class="top-hat"></div>

    <div class="login-box">
      <!-- logo -->
      <div class="logo-wrap">
        <div class="logo-box"></div>
      </div>
      <!-- 登录表单 -->
      <div class="input-group" :class="{active:act_index===1,error:errors.has('cno')}">
        <label for="cm_code">公司编号：</label>
        <input
          id="cm_code"
          v-model="cm_code"
          name="cno"
          type="number"
          @focus="act_index=1"
          v-validate="{required:true,max:6,min:4}"
        />
      </div>
      <div class="input-group" :class="{active:act_index === 2,error:errors.has('pno')}">
        <label>员工编号：</label>
        <input
          name="pno"
          type="number"
          @focus="act_index=2"
          id="PNO"
          v-model="PNO"
          v-validate="{required:true,max:6,min:4}"
        />
      </div>
      <div class="input-group" :class="{active:act_index === 3,error:errors.has('passwd')}">
        <label>用户密码：</label>
        <input
          name="passwd"
          type="password"
          @focus="act_index=3"
          v-model="passwd"
          id="Passwd"
          v-validate="{required:true,max:6,min:4}"
        />
      </div>
      <!--记住密码 自动登录 -->
      <div class="ck_row">
        <div class="ckbox_wrap" :class="{active:rememb}" @click="remembSet">
          <i class="iconfont" :class="{'icon-check-square':rememb,'icon-border':!rememb}"></i>
          <span>记住密码</span>
        </div>
        <div class="ckbox_wrap" :class="{active:autologin}" @click="autologininSet">
          <i class="iconfont" :class="{'icon-check-square':autologin,'icon-border':!autologin}"></i>
          <span>自动登录</span>
        </div>
      </div>
    </div>
    <!-- 登录按钮 -->
    <div class="btn-wrap" @click="loginBtnClick">
      <p>登录</p>
    </div>
  </div>
</template>

<script>
import "../assets/font/iconfont.css"; //引入字体图标
import { Indicator, Toast } from "mint-ui";
import axios from "axios";
//映射到initUser
// import { mapMutations } from 'vuex';
import services from "../service";




export default {
  name: "login",
  data() {
    return {
      act_index: 1,
      cm_code: "",
      PNO: "",
      passwd: "",
      rememb: false,
      autologin: false
    };
  },
  mounted() {
    this.$validator.validate();
    let data = JSON.parse(localStorage.getItem("Login_data"));
    if(data) {
        this.cm_code = data.CNO;
        this.passwd = data.Passwd;
        this.PNO = data.PNO;
        this.autologin = data.autologin;
        this.rememb = data.rememb;
    }
    if(this.autologin) {
        this.loginBtnClick();
    }
  },
  methods: {
    //    ...mapMutations(["initUser"]),
    remembSet() {
      this.rememb = !this.rememb;
      this.rember || (this.autologin = false);
    },
    autologininSet() {
      this.autologin = !this.autologin;
      this.autologin && (this.rememb = true);
    },
    loginBtnClick() {
      if (this.errors.any()) {
        return;
      }
      Indicator.open("正在登录...");
     
      // axios
      //   .post("/api/login", {
      //     CNO: this.cm_code,
      //     PNO: this.PNO,
      //     Passwd: this.passwd
      //   })
       services
        .login({
          CNO: this.cm_code,
          PNO: this.PNO,
          Passwd: this.passwd
        })
        .then(res => {
          //   console.log(res.data);
          //用户密码正确  保存用户信息
          if (res.data.code == 1) {
            localStorage.setItem(
              "Login_data",
              JSON.stringify({
                rememb: this.rememb,
                autologin: this.autologin,
                PNO: this.rememb ? this.PNO : "",
                CNO: this.rememb ? this.cm_code : "",
                Passwd: this.rememb ? this.passwd : ""
              })
            );


            //把当前登录的用户信息放到sessionStorage
            //  sessionStorage.setItem("LoginUser", JSON.stringify(res.data.user));
             sessionStorage.setItem('LoginToken', res.data.token);
            //跳转页面之前  把当前登录的用户信息放到vuex  到store.js定义vuex代码   commit突变
            // this.$store.commit('initUser', res.data.user)
            // this.initUser(res.data.user);


            //跳转页面
            this.$router.push("/home");
          } else {
            Toast({
              message: "用户名密码不正确登录失败",
              duration: 2000
            });
          }
          Indicator.close();
        })
        .catch(e => {
           Toast({
              message: "登录异常失败",
              duration: 2000
            });
          Indicator.close();
        });
    }
  }
};
</script>



<style lang="scss" scoped>
h1 {
  height: px2rem(36);
  font-size: px2rem(36);
  text-align: center;
  padding: px2rem(148-36-44) 0 px2rem(44) 0;
  line-height: px2rem(36);
  color: #fff;
}
@mixin login_wrap {
  width: px2rem(600);
  height: px2rem(836);
  background-color: #fff;
  margin: 0 auto;
  border-radius: px2rem(20);
}

.login {
  background-color: green;
  height: 100%;
  .top-hat {
    width: px2rem(537);
    height: px2rem(18);
    background-color: #eee;
    margin: 0 auto;
    border-radius: px2rem(18) px2rem(18) 0 0;
  }
  //登录box
  .login-box {
    @include login_wrap();
    .logo-wrap {
      padding: px2rem(80);
      .logo-box {
        width: px2rem(190);
        height: px2rem(190);
        margin: 0 auto;
        background: url(../assets/icon-hero.png);
        border-radius: 50%;
        background-size: cover;
      }
    }
    // 登录表单
    @mixin rowStyle() {
      padding: 0 px2rem(36);
      color: $text-color;
      width: px2rem(401);
    }
    .input-group {
      @include rowStyle();
      border: 2px solid #e2e2e2;
      border-radius: px2rem(45);
      font-size: $text-size-mid;
      line-height: px2rem(90);
      margin: 0 auto px2rem(30);
      input {
        border: none;
        font-size: $text-size-mid;
        line-height: px2rem(90);
        width: px2rem(200);
        padding-left: 1em;
      }
    }
    .input-group.active {
      color: $act-color;
      border: 2px solid $act-color;
    }
    .input-group.error {
      //校验样式
      color: red;
      border: 2px solid red;
    }

    .ck_row {
      @include rowStyle();
      font-size: $text-size;
      display: flex;
      justify-content: space-around;
      .ckbox_wrap {
        padding-left: px2rem(36);
        padding-top: px2rem(8);
        i {
          display: inline-block;
          height: px2rem(32);
          width: px2rem(32);
          font-size: px2rem(32);
        }
      }
      .ckbox_wrap.active {
        color: $act-color;
      }
    }
  }
  .btn-wrap {
    @include login_wrap();
    height: px2rem(100);
    font-size: $text-size-imp;
    color: $act-color;
    text-align: center;
    line-height: px2rem(100);
    margin-top: px2rem(20);
    font-weight: 700;
    letter-spacing: px2rem(10);
  }
}
</style>


<style lang="scss" >
html,
body,
#app {
  height: 100%;
}
</style>