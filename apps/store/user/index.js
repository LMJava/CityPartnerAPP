
import Tool from "../../common/Tool";

// ======================================================
// reducer 中心此下面的 state会挂到总state下面 state.User={}
// ======================================================
// userType: 1-城市合伙人 2-渠道合伙人 3-推广员
function reducer(state = {}, {type, data}) {
  if (type === 'INIT') {
    return data 
  } else if (type === 'ADD') {
    Tool.setItem("user", JSON.stringify(data))
    return data 
  } else if (type === 'DEL') {
    Tool.removeItem("user");
    return {}
  }
  return state;
}


// ======================================================
// actions 触发reducer 改变 state
// ======================================================
// 行为--获取用户data
function getUser(call) {
  return (dispatch) => {
    Tool.getItem("user", (data) => {
      let initState = {}
      if (data) {
        initState = JSON.parse(data)
      } else {
        initState = {}
      }
      dispatch(initUser(initState));
      call(initState);
    })
  }
}
// 行为--初始化用户data
function initUser(data) {
  return { type: 'INIT', data };
}
// 行为--登录用户data
function addUser(data) {
  return { type: 'ADD', data };
}
// 行为--注销用户data
function delUser() {
  return { type: 'DEL' };
}

export default {
  reducer,
  actions: { 
    getUser,
    initUser,
    addUser,
    delUser 
  },
};
