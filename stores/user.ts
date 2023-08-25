import { acceptHMRUpdate, defineStore } from 'pinia'
import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'

export const useUserStore = defineStore('users', {
  state: () => {
    return {
      token: getToken(),
      name: '' as string,
      avatar: '' as string,
      introduction: '' as string,
      roles: [] as string[],
    }
  },
  getters: {
    isLogin: (state) => state.token != undefined && state.token != "" 
  },
  actions: {

    // user login
    login(userInfo: any) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        login({ username: username.trim(), password: password }).then(response => {
          const { data } = response
          this.token = data
          setToken(data)

          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // get user info
    getInfo() {
      return new Promise((resolve: (value: any) => void, reject: (reason?: any) => void) => {
        this.token = getToken()

        if (!this.token) {
          reject("token is empty")
        }

        getInfo(this.token as string).then(response => {
          const { data } = response

          if (!data) {
            reject('Verification failed, please Login again.')
          }

          const { roles, name, avatar, introduction } = data

          // roles must be a non-empty array
          if (!roles || roles.length <= 0) {
            reject('getInfo: roles must be a non-null array!')
          }

          this.roles = roles
          this.name = name
          this.avatar = avatar
          this.introduction = introduction
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // user logout
    logout() {
      return new Promise((resolve, reject) => {

        logout().then(() => {
          this.token = ''
          this.roles = []
          removeToken()
          // resetRouter()

          // reset visited views and cached views
          // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
          // const tagsViewStore = useTagsViewStore()
          // tagsViewStore.delAllViews()

          resolve("")
        }).catch(error => {
          reject(error)
        })
      })
    },

    // remove token
    resetToken() {
      return new Promise(resolve => {
        this.token = ''
        this.roles = []
        removeToken()
        resolve("")
      })
    },

    // dynamically modify permissions
    async changeRoles(role: string) {
      const token = role + '-token'

      this.token = token
      setToken(token)

      // const userStore = useUserStore()
      // const { roles } = await userStore.getInfo()

      // // generate accessible routes map based on roles
      // const permissionsStore = usePermissionsStore();
      // await permissionsStore.generateRoutes(roles)

      // // reset visited views and cached views
      // const tagsViewStore = useTagsViewStore()
      // tagsViewStore.delAllViews()
    }
  },
})

// 确保传递正确的 store 声明，本例中为 `useUserStore`
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}