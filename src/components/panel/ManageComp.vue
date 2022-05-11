<template>
  <el-button type="primary" @click="openAddUserDialog">添加用户</el-button>
  <el-button type="primary" plain @click="handleRefresh"
    >磅礴刷新服务不用你动手，磅礴为你刷新生活</el-button
  >
  <AddUserDialog ref="addUserDialog" @finishAdd="finishAdd"></AddUserDialog>
  <el-descriptions
    class="margin-top"
    :column="3"
    size="small"
    border
    v-for="item in userList"
    :key="item.userId"
  >
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon>
            <user />
          </el-icon>
          用户名
        </div>
      </template>
      {{ item.userName }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon>
            <Message />
          </el-icon>
          Email
        </div>
      </template>
      {{ item.userEmail }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon>
            <Star />
          </el-icon>
          昵称
        </div>
      </template>
      {{ item.userNickname }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon>
            <Compass />
          </el-icon>
          ID
        </div>
      </template>
      <el-tag size="small">{{ item.userId }}</el-tag>
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon>
            <House />
          </el-icon>
          主页
        </div>
      </template>
      <el-link
        :href="
          item.userUrl
            ? item.userUrl.startsWith('http')
              ? item.userUrl
              : 'http://' + item.userUrl
            : ''
        "
        type="primary"
        >{{ item.userUrl }}</el-link
      >
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon>
            <Clock />
          </el-icon>
          上次登录@
        </div>
      </template>
      {{ item.userLastLoginTime }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon>
            <office-building />
          </el-icon>
          状态
        </div>
      </template>
      <el-tag size="small">{{ item.userStatus }}</el-tag>
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon>
            <Clock />
          </el-icon>
          注册时间
        </div>
      </template>
      {{ item.userRegisterTime }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon>
            <Location />
          </el-icon>
          上次登录IP
        </div>
      </template>
      {{ item.userLastLoginIp }}
    </el-descriptions-item>

    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon>
            <Operation />
          </el-icon>
          操作
        </div>
      </template>
      <div class="button-box">
        <el-button type="primary" plain>修改</el-button>
        <el-popover placement="left-start" trigger="click">
          <template #reference>
            <el-button :disabled="!item.userAvatar">查看图片</el-button>
          </template>
          <el-image
            v-if="item.userAvatar"
            style="width: 100%; height: 100px"
            :src="item.userAvatar"
            fit="contain"
          />
        </el-popover>

        <el-popconfirm
          confirm-button-text="删除"
          cancel-button-text="取消"
          :icon="InfoFilled"
          icon-color="#FF6347"
          title="确认删除吗"
          @cancel="cancelEvent"
        >
          <template #reference>
            <el-button type="danger" plain>删除</el-button>
          </template>
        </el-popconfirm>
      </div>
    </el-descriptions-item>
  </el-descriptions>
</template>

<script setup lang="ts">
import UserHttp from "@/utils/UserHttp";
import {
  User,
  OfficeBuilding,
  Location,
  Message,
  Star,
  Compass,
  House,
  Clock,
  Operation,
  InfoFilled,
} from "@element-plus/icons-vue";
import { ref } from "vue";
import { ElMessage } from "element-plus/es";
import AddUserDialog from "@/components/panel/AddUserDialog.vue";

const userList = ref();
const showRefreshMessage = ref(false);
const addUserDialog = ref();
const getAllPromise = () => {
  return UserHttp({
    url: "getAll",
    method: "get",
  });
};
const refresh = () => {
  // 用于页面初始化的无提示刷新
  getAllPromise()
    .then((data) => {
      if (data.status === 200) {
        userList.value = data.data;
        showRefreshMessage.value = true;
      } else {
        ElMessage({
          showClose: true,
          message: "获取全部用户(getAll)失败",
          type: "error",
        });
      }
    })
    .catch(() => {
      showGetAllErrorMessage();
    });
};
refresh();
const cancelEvent = () => {
  ElMessage({
    showClose: true,
    message: "取消删除，没有任何数据被更改",
    type: "info",
    duration: 1000,
  });
};

const handleRefresh = async () => {
  getAllPromise()
    .then((data) => {
      if (data.status === 200) {
        userList.value = data.data;
        showRefreshMessage.value = true;
        openRefreshMessage();
      } else {
        ElMessage({
          showClose: true,
          message: "获取全部用户(getAll)失败",
          type: "error",
        });
      }
    })
    .catch(() => {
      showGetAllErrorMessage();
    });
};
const finishAdd = async () => {
  getAllPromise()
    .then((data) => {
      if (data.status === 200) {
        userList.value = data.data;
        showRefreshMessage.value = true;
        openAddRefreshMessage();
      } else {
        showGetAllErrorMessage();
      }
    })
    .catch(() => {
      showGetAllErrorMessage();
    });
};

const openRefreshMessage = () => {
  if (showRefreshMessage.value === true) {
    ElMessage({
      message: "已刷新，现在有" + userList.value.length + "条信息",
      type: "success",
      duration: 1000,
    });
  }
};

const openAddUserDialog = () => {
  addUserDialog.value.showDialog();
};

const openAddRefreshMessage = () => {
  ElMessage({
    message: "已添加，现在有" + userList.value.length + "条信息",
    type: "success",
    duration: 1000,
  });
};

const showGetAllErrorMessage = () => {
  ElMessage({
    showClose: true,
    message: "获取全部用户(getAll)失败",
    type: "error",
  });
};
</script>

<style scoped>
.margin-top {
  margin-top: 15px;
}
.button-box {
  display: flex;
  justify-content: right;
}
</style>
