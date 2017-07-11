
// import * as types from './types'
import {
    UPDATEUSERINFO,
    GETUSERINFO,
    CLEARUSERINFO
} from '../mutation-types'

// 定义数据
// 获取用户信息 用户信息最好不要弄个vuex管理 应该使用localStorage使用
const state = {
    userInfo: {userName:""}
};
// 4.action 的具体操作
const mutations = {
    [UPDATEUSERINFO](state,data) {
        console.log(state.userInfo);
        state.userInfo.userName = data;
    },
    [GETUSERINFO](state) {
        state.userInfo.userName =window.localStorage.userName
    },
    [CLEARUSERINFO](state){
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_expired_at');
        localStorage.removeItem('userName');
    }

};

export default {
    state,
    mutations
}