<template>
  <el-dialog v-model="dialogFormVisible" title="添加用户" draggable>
    <el-form :model="form" :rules="rules" ref="ruleFormRef">
      <el-form-item
        label="用户名"
        :label-width="formLabelWidth"
        prop="userName"
      >
        <el-input v-model="form.userName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth" prop="userPass">
        <el-input
          v-model="form.userPass"
          type="password"
          show-password
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item
        label="Email"
        :label-width="formLabelWidth"
        prop="userEmail"
      >
        <el-input v-model="form.userEmail" autocomplete="off" type="email" />
      </el-form-item>
      <el-form-item
        label="昵称"
        :label-width="formLabelWidth"
        prop="userNickname"
      >
        <el-input v-model="form.userNickname" autocomplete="off" />
      </el-form-item>
      <el-form-item label="主页" :label-width="formLabelWidth" prop="userUrl">
        <el-input
          v-model="form.userUrl"
          autocomplete="off"
          placeholder="以http开头"
        />
      </el-form-item>
      <el-form-item
        label="状态"
        :label-width="formLabelWidth"
        prop="userStatus"
      >
        <el-input v-model="form.userStatus" autocomplete="off" type="number" />
      </el-form-item>
      <el-form-item
        label="头像链接"
        :label-width="formLabelWidth"
        prop="userAvatar"
      >
        <el-input
          v-model="form.userAvatar"
          autocomplete="off"
          placeholder="以http开头"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button @click="resetForm">重置</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)"
          >确定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import type { UserForm } from "@/utils/interfaces";
import UserHttp from "@/utils/UserHttp";
import { ElMessage } from "element-plus/es";

const emits = defineEmits<{
  (e: "finishAdd"): void;
}>();
const dialogFormVisible = ref(false);
const formLabelWidth = "90px";

const ruleFormRef = ref<FormInstance>();
const form = reactive<UserForm>({
  userName: "",
  userPass: "",
  userEmail: "",
  userNickname: null,
  userUrl: null,
  userStatus: null,
  userAvatar: null,
});

const rules = reactive<FormRules>({
  userName: [
    {
      required: true,
      message: "必须输入用户名",
      trigger: "blur",
    },
  ],
  userPass: [
    {
      required: true,
      message: "必须输入密码",
      trigger: "blur",
    },
  ],
  userEmail: [
    {
      required: true,
      message: "必须输入邮箱",
      trigger: "blur",
    },
  ],
  userNickname: [
    {
      trigger: "blur",
    },
  ],
  userUrl: [
    {
      trigger: "blur",
    },
  ],
  userStatus: [
    {
      required: true,
      message: "必须输入状态",
      trigger: "blur",
    },
  ],
  userAvatar: [
    {
      trigger: "blur",
    },
  ],
});

const showDialog = () => {
  dialogFormVisible.value = true;
};

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      UserHttp({
        url: "addUser",
        method: "post",
        data: {
          userName: form.userName,
          userPass: form.userPass,
          userEmail: form.userEmail,
          userNickname: processNull(form.userNickname),
          userUrl: processNull(form.userUrl),
          userStatus: processNull(form.userStatus),
          userAvatar: processNull(form.userAvatar),
        },
      })
        .then((data) => {
          if (data.status === 200) {
            dialogFormVisible.value = false;
            emits("finishAdd");
            ruleFormRef.value?.resetFields();
          }
        })
        .catch(() => {
          ElMessage({
            message: "添加失败，疑有重复键或网络问题",
            type: "error",
            duration: 1000,
          });
        });
    } else {
      ElMessage({
        message: "添加失败",
        type: "warning",
        duration: 1000,
      });
    }
  });
};

const resetForm = () => {
  ruleFormRef.value?.resetFields();
};

defineExpose({
  showDialog,
});

const processNull = (nullable: any) => {
  return nullable === null || nullable === "" ? null : nullable;
};
</script>

<style scoped></style>
