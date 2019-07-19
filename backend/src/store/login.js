import { userLogin } from "../api/index"
import { getSession, setSession } from "../utils"
import { SAVE_TOKEN } from "../store/types"

const getToken = () => getSession('token')

export default {
    namespace: 'login',
    state: {
        token: getToken() || ""
    },
    effects: {
        //提交异步数据
        * login({ payload }, { call, put }) { // eslint-disable-line
            const result = yield call(userLogin, payload)
            setSession("token", result.data.token)
            console.log(result.data.token, "*****")
            console.log(payload, "7777777777")
            console.log(result, "result")
            yield put({
                type: SAVE_TOKEN,
                payload: result.data
            });
        },
    },
    reducers: {
        [SAVE_TOKEN](state, { payload }) {
            console.log(state, payload, "payload");
            // state.token = payload
            return {
                ...state,
                ...payload
            };
        },
    },
}