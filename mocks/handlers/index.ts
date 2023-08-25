import getMain from './api/get'
import userLogin from './api/user/login'
import userLogout from './api/user/logout'
import userInfo from './api/user/info'

export const handlers = [
    getMain,
    userLogin,
    userLogout,
    userInfo,
]