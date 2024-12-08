<template>
  <div id="questionSubmitView">
    <a-form :model="searchParams" layout="inline" style="margin-left: 300px">
      <a-form-item field="questionId" label="题号" tooltip="请输入题目Id">
        <a-input
          v-model="searchParams.questionId"
          placeholder="请输入搜索题号"
        />
      </a-form-item>
      <a-form-item field="language" label="编程语言：" style="min-width: 240px">
        <a-select v-model="searchParams.language" placeholder="选择编程语言">
          <a-option>java</a-option>
          <a-option>cpp</a-option>
          <a-option>go</a-option>
          <a-option>python</a-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button type="outline" shape="round" status="normal" @click="doSubmit"
          >搜索
        </a-button>
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          shape="round"
          status="success"
          @click="loadData"
          >刷新
        </a-button>
      </a-form-item>
      <a-checkbox v-model="showMy">只看我的</a-checkbox>
    </a-form>
    <a-divider size="0" />
    <a-table
      column-resizable
      wrapper
      :ref="tableRef"
      :columns="columns"
      :data="dataList"
      :pagination="{
        showTotal: true,
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        total,
        showJumper: true,
        showPageSize: true,
      }"
      @page-change="onPageChange"
      @pageSizeChange="onPageSizeChange"
    >
      <template #judgeInfo="{ record }">
        <a-tag :color="handleColor(record.judgeInfo?.message)">
          {{ record?.judgeInfo?.message || "编译出错" }}
        </a-tag>
      </template>
      <template #status="{ record }">
        {{ record?.status === 2 ? "判题成功" : "判题失败" }}
      </template>

      <template #createTime="{ record }">
        {{ moment(record.createTime).format("YYYY-MM-DD HH:mm:ss") }}
      </template>
      <template #questionId="{ record }">
        <a-link
          status="success"
          style="color: blue"
          @click="toQuestionPage(record)"
          >{{ record.questionId }}
        </a-link>
      </template>

      <template #optional="{ record }">
        <a-space>
          <a-button
            type="primary"
            v-if="loginUser.id === record.userId"
            @click="toQuestionPage(record)"
            >查看详情
          </a-button>
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import {
  QuestionControllerService,
  QuestionSubmitQueryRequest,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import moment from "moment";
import store from "@/store";

const loginUser = store.state.user.loginUser;
const tableRef = ref();
const dataList = ref([]);
const total = ref(0);
// 搜索请求
const searchParams = ref<QuestionSubmitQueryRequest>({
  questionId: undefined,
  language: "",
  pageSize: 10,
  current: 1,
});
const showMy = ref(false);

const loadData = async () => {
  let res;
  if (showMy.value) {
    res = await QuestionControllerService.listMyQuestionSubmitByPageUsingPost({
      ...searchParams.value,
      sortField: "createTime",
      sortOrder: "descend",
    });
  } else {
    res = await QuestionControllerService.listQuestionSubmitByPageUsingPost({
      ...searchParams.value,
      sortField: "createTime",
      sortOrder: "descend",
    });
  }
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
  } else {
    message.error("加载失败，" + res.message);
  }
};

/**
 * 监听 searchParams 变量，改变时触发页面的重新加载
 */
watchEffect(() => {
  loadData();
});

/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  loadData();
});

const columns = [
  {
    title: "提交号",
    dataIndex: "id",
    align: "center",
  },
  {
    title: "题号",
    slotName: "questionId",
    align: "center",
  },
  {
    title: "提交者",
    dataIndex: "userId",
    align: "center",
  },
  {
    title: "判题信息",
    slotName: "judgeInfo",
    align: "center",
  },
  {
    title: "编程语言",
    dataIndex: "language",
    align: "center",
  },
  {
    title: "提交状态",
    slotName: "status",
    align: "center",
  },
  {
    title: "创建时间",
    slotName: "createTime",
    align: "center",
  },
  {
    title: "操作",
    slotName: "optional",
  },
];
/**
 * 当前分页
 * @param page
 */
const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};
/**
 * 分页大小
 * @param size
 */
const onPageSizeChange = (size: number) => {
  searchParams.value = {
    ...searchParams.value,
    pageSize: size,
  };
};
const router = useRouter();
const handleColor = (record: any): string => {
  if (record === "通过") {
    return "green";
  } else {
    return "red";
  }
};

// /**
//  * 跳转到做题页面
//  * @param question
//  */
// const toQuestionPage = (questionId: QuestionSubmitQueryRequest) => {
//   router.push({
//     path: `/question/view/${questionId.questionId}`,
//   });
// };

/**
 * 跳转到做题详细页面
 * @param question
 */
const toQuestionPage = (question: QuestionSubmitQueryRequest) => {
  router.push({
    path: `/submissions/detail/${question.id}`,
  });
};

/**
 * 确认搜索，重新加载数据
 */
const doSubmit = () => {
  // 这里需要重置搜索页号
  searchParams.value = {
    ...searchParams.value,
    current: 1,
  };
};
</script>

<style scoped>
#questionSubmitView {
  max-width: 1280px;
  margin: 0 auto;
  border-radius: 10px;
}
</style>
