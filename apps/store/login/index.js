
import Tool from "../../common/Tool";

// ======================================================
// reducer 中心此下面的 state会挂到总state下面 state.Login={}
// ======================================================
function reducer(state = {}, {type, data}) {
  if (type === 'INITLOGIN') {
    return data 
  } else if (type === 'ADDLOGIN') {
    Tool.setItem("login", JSON.stringify(data))
    return data 
  } else if (type === 'DELLOGIN') {
    Tool.removeItem("login");
    return {}
  }
  return state;
}


// ======================================================
// actions 触发reducer 改变 state
// ======================================================
// 行为--获取登录data
function getLogin(call) {
  return (dispatch) => {
    Tool.getItem("login", (data) => {
      let initState = {}
      if (data) {
        initState = JSON.parse(data)
      } else {
        initState = {}
      }
      dispatch(initLogin(initState));
      call && call(initState);
    })
  }
}
// 行为--初始化登录data
function initLogin(data) {
  return { type: 'INITLOGIN', data };
}
// 行为--登录登录data
function addLogin(data) {
  return { type: 'ADDLOGIN', data };
}
// 行为--注销登录data
function delLogin() {
  return { type: 'DELLOGIN' };
}

export default {
  reducer,
  actions: { 
    getLogin,
    initLogin,
    addLogin,
    delLogin 
  },
};
