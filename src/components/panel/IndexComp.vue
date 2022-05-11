<template>
  <div class="button-box">
    <el-button @click="refresh">刷新</el-button>
  </div>
  <div class="card-box">
    <InfoCard
      card-name="用户信息"
      :count="userCount || '-'"
      detail-link="/panel/manage"
      :icon="Eleme"
    ></InfoCard>
  </div>
</template>

<script setup lang="ts">
import InfoCard from "@/components/panel/InfoCard.vue";
import { Eleme } from "@element-plus/icons-vue";
import UserHttp from "@/utils/UserHttp";
import { ref } from "vue";
import { ElMessage } from "element-plus/es";

const userCount = ref();
const getUserCountPromise = () =>
  UserHttp({
    url: "getUserCount",
    method: "get",
  });
const showGetUserCountErrorMessage = () => {
  ElMessage({
    message: "获取用户数量失败",
    type: "error",
    duration: 1000,
  });
};
getUserCountPromise()
  .then((data) => {
    userCount.value = data.data;
  })
  .catch(() => {
    showGetUserCountErrorMessage();
  });
const refresh = () => {
  getUserCountPromise()
    .then((data) => {
      userCount.value = data.data;
      ElMessage({
        message: "已成功刷新",
        type: "success",
        duration: 1000,
      });
    })
    .catch(() => {
      showGetUserCountErrorMessage();
    });
};
</script>

<style scoped>
.card-box {
  display: flex;
}
.button-box {
  margin-bottom: 15px;
}
</style>
