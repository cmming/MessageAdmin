// 将所有的请求写在这里
// 接口的二级目录
const allAjax = {
    userData: {
        
        /**
         * 登录接口
         * 
         * @param {json} data 发送的数据
         * @param {Function} fn 接口的成功回调函数
         */
        login(data, fn) {
            this.$http.post('', data).then(fn);
        },
        /**
         * 用户注册
         * 
         * @param {json} data 用户注册信息 
         * @param {any} fn  接口成功回调
         */
        signup(data,fn){
            this.$http.post('/addAdminData.php',data).then(fn);
        },
        signout(data,fn){
            this.$http.post('/addAdminData.php',data).then(fn);
        }
    },

    msg: {
        /**
         * 表格初始化数据
         * @param {any} fn  请求成功的回调
         */
        getMsg(data,fn){
            this.$http.post('',data).then(fn);
        },
        /**
         * 更具id 获取一条数据
         * 
         * @param {any} data 
         * @param {any} fn 
         */
        getContactById(data,fn){
            this.$http.post('',data).then(fn);
        },
        /**
         * 添加或修改消息
         * @param {any} data   
         * 修改
         * {"upd_flag":"1","update_id":"1","recvid":"13037125104","title":"msg add title","content":"msg content add","attach":"change"}
         * @param {any} fn    成功请求的回调
         */
        updateMsg(data,fn){
            this.$http.post('',data).then(fn);
        },
    },
    Contact:{
        /**
         * 
         * 
         * @param {any} data 
         * @param {any} fn 
         */
        getContacts(data,fn){
            this.$http.post('',data).then(fn);
        },
    },

};

export default allAjax;