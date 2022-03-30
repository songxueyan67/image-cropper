<template>
  <div class='box'>
    <h1>图片裁剪</h1>
    <a-upload
      v-model:file-list="fileList"
      name="avatar"
      list-type="picture-card"
      class="avatar-uploader"
      :show-upload-list="false"
      :customRequest="function () {}"
      :before-upload="beforeUpload"
      @change="handleChange"
    >
      <img class='default-img' v-if="imageUrl" :src="imageUrl" alt="avatar" />
      <div v-else>
        <i-eos-icons-bubble-loading v-if="loading"></i-eos-icons-bubble-loading>
        <i-ic-baseline-plus v-else></i-ic-baseline-plus>
        <div class="ant-upload-text">上传</div>
      </div>
    </a-upload>
    <ImageCropper ref="cropperModal" @ok="handleCropperSuccess" />
  </div>
</template>
<script setup>
import { ref } from "vue";
import { getBase64 } from "@/utils/file";
const imageUrl = ref("");
const loading = ref(false);
const cropperModal = ref(null);

// 文件上传前
const beforeUpload = () => {};

// 从本地选择文件
const handleChange = (info) => {
  getBase64(info.file.originFileObj, (imgUrl) => {
    let target = {
      name: info.file.name,
      img: imgUrl,
    };
    cropperModal.value.edit(target);
  });
};

// 确定
const handleCropperSuccess = (file) => {
  loading.value = true;
  setTimeout(() => {
    getBase64(file, (base64) => {
      imageUrl.value = base64;
      loading.value = false;
    });
  }, 2000);
};
</script>
<style scoped lang="scss">
.box {
  width: 50%;
  margin: 0 auto;
}
.ant-upload-picture-card-wrapper.avatar-uploader {
width: 200px;
height: 200px;
}
::v-deep .ant-upload.ant-upload-select-picture-card {
  width: 200px;
  height: 200px;
}

</style>