import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'
import { getToken } from '@/utils/auth' // get token from cookie

const whiteList = ['/login', '/register', '/404', '/500', '/'] // no redirect whitelist

export default defineNuxtRouteMiddleware(async (to: any, from: any) => {
  const usersStore = useUserStore()

  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      return navigateTo('/')
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      const hasGetUserInfo = usersStore.name
      if (!hasGetUserInfo) {
        try {
          // get user info
          await usersStore.getInfo()
        } catch (err:any) {
          // remove token and go to login page to re-login
          await usersStore.resetToken()
          ElMessage.error(err || 'Has Error')
          navigateTo(`/login?redirect=${to.path}`)
        }
      }
    }
    // console.log('已经登录')
  } else if (!whiteList.includes(to.path)) {
    // console.log('未登录')
    // other pages that do not have permission to access are redirected to the login page.
    return navigateTo(`/login?redirect=${to.path}`)
  }
})
