<template>
    <!--常用表单元素样式-->
    <!--通用导航条 -->
    <div>
        <v-breadcrumb :breadcrumbData="toBreadcrumb"></v-breadcrumb>
        <div class="col-md-12">
            <div class="smart-widget widget-purple">
                <div class="smart-widget-header">
                    上传文件
                </div>
                <div class="smart-widget-inner">
                    <div class="smart-widget-body">
                        <!--为表单添加验证过滤-->
                        <form class="form-horizontal no-margin" @submit.prevent="validateBeforeSubmit">
                            <div class="form-group">
                                <label class="control-label col-lg-2">base64 上传图片</label>
                                <div :class="{'col-lg-6': true, 'has-error': errors.has('email') }">

                                    <a href="javascript:;" class="file">选择文件
                                        <input type="file" name="imgs" id="file"  v-on:change = "showFileInfo"  ref="inputer">
                                        <i class="fa fa fa-file-o"></i>
                                    </a>
                                    <!--图片预览-->
                                    <img :src="dataUrl" alt="" style="width:30px;height:30px;vertical-align:baseline;">
                                </div>
                            </div>
                            
                        </form>

                    </div>
                </div>
                <!-- ./smart-widget-inner -->
            </div>
            <!-- ./smart-widget -->
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                // 初始化导航栏数据
                toBreadcrumb: [
                    { path: 'main', name: '主页' },
                    { path: 'addFile', name: '上传文件' },
                ],
                // validate 定义
                file:'',
                dataUrl:'',
                formdata:{
                    file:''
                }
            }
        },
        methods: {
            // 监视文件改变
            showFileInfo(){
                // 使用base 64 转化
                var reader = new FileReader();
                let inputDOM = this.$refs.inputer;
                // 通过DOM取文件数据
                this.file = inputDOM.files[0];
                this.imgPreview(this.file);
                console.log(this.file);
                // var param = {'fileData':reader.readAsDataURL(file.files[0])};
                // var resData = { 'type': "uploadFile", 'dataform': JSON.stringify(param)};
                // console.log(resData,param);
                // this.axios.post('',resData)
                // .then(res    ponse=>{
                //     console.log(response.data);
                // })  
            },
            // 时时预览 图片
            imgPreview (file) {
                let self = this;
                // 看支持不支持FileReader
                if (!file || !window.FileReader) return;
        
                if (/^image/.test(file.type)) {
                    // 创建一个reader
                    var reader = new FileReader();
                    // 将图片将转成 base64 格式
                    reader.readAsDataURL(file);
                    // 读取成功后的回调
                    reader.onloadend = function () {
                        self.dataUrl = this.result;
                        
                        //
                        var param = {img:self.dataUrl.split(",")[1],file_type:file.type,file_name:file.name};
                        var resData = { 'type': "uploadFile", 'dataform': JSON.stringify(param)};
                        // console.log(resData,param);
                        self.axios.post('',resData)
                        .then(response=>{
                            console.log(response.data);
                        })  
                    }
                }
            },
            validateBeforeSubmit() {
                this.$validator.validateAll().then(() => {
                    // eslint-disable-next-line
                    alert('ok');
                }).catch(() => {
                    // eslint-disable-next-line
                    alert('未通过');
                });
            }
        }
    }

</script>
<style lang="css">
    .file {
        position: relative;
        display: inline-block;
        background: #D0EEFF;
        border: 1px solid #99D3F5;
        border-radius: 4px;
        padding: 4px 12px;
        overflow: hidden;
        color: #1E88C7;
        text-decoration: none;
        text-indent: 0;
        line-height: 20px;
    }

    .file input {
        position: absolute;
        font-size: 100px;
        right: 0;
        top: 0;
        opacity: 0;
    }

    .file:hover {
        background: #AADFFD;
        border-color: #78C3F3;
        color: #004974;
        text-decoration: none;
    }
</style>