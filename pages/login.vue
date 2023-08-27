<template>
  <div class="login-container">
    <el-form
      ref="loginFormRef"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">Login Form</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <el-icon><ElIconUser /></el-icon>
        </span>
        <el-input
          ref="usernameRef"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-tooltip
        v-model="capsTooltip"
        content="Caps lock is On"
        placement="right"
        manual
      >
        <el-form-item prop="password">
          <span class="svg-container">
            <el-icon><ElIconLock /></el-icon>
          </span>
          <el-input
            :key="passwordType"
            ref="passwordRef"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="Password"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <el-icon >
              <ElIconView v-if="passwordType == 'password'" />
              <ElIconHide v-else />
            </el-icon>
            
          </span>
        </el-form-item>
      </el-tooltip>

      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.prevent="handleLogin"
      >
        Login
      </el-button>

      <div style="position: relative">
        <div class="tips">
          <span>username: admin</span>
          <span>password: any</span>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { reactive, ref, onMounted, onUnmounted, nextTick } from "vue";
import { validUsername } from "@/utils/validate";
import { useRoute, useRouter } from "vue-router";

definePageMeta({
    key: (route) => route.fullPath,
    name: "login",
    title: "Login",
    icon: "",
    sidebar: false,
});

const validateUsername = (rule: any, value: any, callback: any) => {
  if (!validUsername(value)) {
    callback(new Error("Please enter the correct user name"));
  } else {
    callback();
  }
};
const validatePassword = (rule: any, value: any, callback: any) => {
  if (value.length < 6) {
    callback(new Error("The password can not be less than 6 digits"));
  } else {
    callback();
  }
};

const loginForm = reactive({
  username: "admin",
  password: "111111",
});

const loginRules = reactive({
  username: [{ required: true, trigger: "blur", validator: validateUsername }],
  password: [{ required: true, trigger: "blur", validator: validatePassword }],
});

const usersStore = useUserStore();

const loginFormRef = ref();
const usernameRef = ref();
const passwordRef = ref();

const passwordType = ref("password");
const capsTooltip = ref(false);
const loading = ref(false);
const redirect = ref("/");
let otherQuery = reactive({});
const route = useRoute();
const router = useRouter();

const getOtherQuery = function (query: any) {
  return Object.keys(query).reduce((acc: any, cur) => {
    if (cur !== "redirect") {
      acc[cur] = query[cur];
    }
    return acc;
  }, {});
};

watch(
  () => route.path,
  () => {
    const query = route.query;

    if (query) {
      redirect.value = query.redirect as string;
      otherQuery = getOtherQuery(query);
    }
  },
  {
    immediate: true,
  }
);

// window.addEventListener('storage', afterQRScan)

onMounted(() => {
  if (loginForm.username === "") {
    nextTick(() => {
      if (usernameRef.value) {
        usernameRef.value.focus();
      }
    });
  } else if (loginForm.password === "") {
    nextTick(() => {
      if (passwordRef.value) {
        passwordRef.value.focus();
      }
    });
  }
});

onUnmounted(() => {
  // window.removeEventListener('storage', afterQRScan)
});

const checkCapslock = function (e: any) {
  const { key } = e;
  capsTooltip.value = key && key.length === 1 && key >= "A" && key <= "Z";
};

const showPwd = async () => {
  // console.log(passwordType.value);
  if (passwordType.value === "password") {
    passwordType.value = "";
  } else {
    passwordType.value = "password";
  }

  nextTick(() => {
    if (passwordRef.value) {
      passwordRef.value.focus();
    }
  });
};

const handleLogin = async () => {
  if (!loginFormRef.value) {
    return;
  }

  await loginFormRef.value.validate((valid:boolean, fields:any) => {
    if (valid) {
      loading.value = true;

      const nuxtApp = useNuxtApp();
      nuxtApp.callHook("page:start");

      usersStore
        .login(loginForm)
        .then(() => {
          nuxtApp.callHook("page:finish");
          router.push({ path: redirect.value || "/", query: otherQuery });
          loading.value = false;
        })
        .catch(() => {
          nuxtApp.callHook("page:finish");
          loading.value = false;
        });
    } else {
      console.log("error submit!!");
      return false;
    }
  });
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    height: 47px;
    width: 85%;

    .el-input__wrapper{
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;

      box-shadow: 0 0 0px 1000px $bg inset !important;
      -webkit-text-fill-color: $cursor !important;
    }

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
