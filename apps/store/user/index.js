
import Tool from "../../common/Tool";

// ======================================================
// reducer 中心此下面的 state会挂到总state下面 state.User={}
// ======================================================
function reducer(state = {}, action) {
  if (action.type === 'INIT') {
    return action.data 
  } else if (action.type === 'ADD') {
    Tool.setItem("user", JSON.stringify(data))
    return action.data 
  } else if (action.type === 'DEL') {
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
        initState = {
          role: 'boss'
        }
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
