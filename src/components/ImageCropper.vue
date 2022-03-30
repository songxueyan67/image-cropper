<template>
  <a-modal
    :width="800"
    v-model:visible="visible"
    :title="prop.title"
    :maskClosable="false"
  >
    <div class="cropper-wrapper">
      <VueCropper
        ref="cropper"
        :img="options.data.img"
        :outputSize="options.data.outputSize"
        :outputType="options.data.outputType"
        :info="options.data.info"
        :canScale="options.data.canScale"
        :autoCrop="options.data.autoCrop"
        :autoCropWidth="options.data.autoCropWidth"
        :autoCropHeight="options.data.autoCropHeight"
        :fixed="options.data.fixed"
        :fixedBox="options.data.fixedBox"
        :fixedNumber="options.data.fixedNumber"
      />
    </div>
    <template #footer>
      <a-button key="back" @click="cancelHandel">取消</a-button>
      <a-button
        key="submit"
        type="primary"
        :loading="confirmLoading"
        @click="okHandel"
        >保存</a-button
      >
    </template>
  </a-modal>
</template>

<script setup>
import { dataURLtoFile } from "@/utils/file";
import { ref, reactive, defineExpose, defineProps } from "vue";
import "vue-cropper/dist/index.css";
import { VueCropper } from "vue-cropper";
const visible = ref(false);
const confirmLoading = ref(false);
const options = reactive({
  data: {
    name: "",
    img: "", // 裁剪图片的地址
    info: true, // 裁剪框的大小信息
    outputSize: 1, // 裁剪生成图片的质量
    outputType: "jpeg", // 裁剪生成图片的格式
    canScale: true, // 图片是否允许滚轮缩放
    autoCrop: true, // 是否默认生成截图框
    autoCropWidth: 300, // 默认生成截图框宽度
    autoCropHeight: 300, // 默认生成截图框高度
    fixedBox: false, // 固定截图框大小 不允许改变
    fixed: true, // 是否开启截图框宽高固定比例
    fixedNumber: [1, 1], // 截图框的宽高比例
    full: true, // 是否输出原图比例的截图
    canMoveBox: true, // 截图框能否拖动
    original: false, // 上传图片按照原始比例渲染
    centerBox: false, // 截图框是否被限制在图片里面
    infoTrue: true, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
    canMove: true,
  },
});
const prop = defineProps({
  title: {
    type: String,
    default: "图片裁剪",
  },
});
// 显示裁剪弹窗
const edit = (record) => {
  visible.value = true;
  options.data = Object.assign({}, options.data, record);
};

// 取消
const cancelHandel = () => {
  visible.value = false;
  options.data = {
    img: "",
    autoCropWidth: 100,
    autoCropHeight: 100,
  };
};
const emit = defineEmits(["ok"]);
const cropper = ref();
// 确定
const okHandel = () => {
  confirmLoading.value = true;
  cropper.value.getCropData((data) => {
    // 转换为File对象
    let file = dataURLtoFile(data, options.data.name);
    //将裁剪侯的图片对象返回给父组件
    emit("ok", file);
    cancelHandel();
    confirmLoading.value = false;
  });
};

defineExpose({
  edit,
});
</script>
<style scoped lang='scss'>
.cropper-wrapper {
  width: 100%;
  height: 400px;
}
</style>
