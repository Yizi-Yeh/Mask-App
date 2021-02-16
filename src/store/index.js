import { createStore } from 'vuex'

export default createStore({
  state: {
    // 使用者目前所選縣市，預設為台北
    currCity: '臺北市',
    // 使用者目前所選行政區，預設為北投區
    currDistrict: '北投區',
    // 存放API回傳的縣市/行政區的列表資訊
    location: [],
    // 存放API回傳的藥局資訊
    stores: [],
    keywords: '',
    showModal: false
  },
  getters: {
    // 抓出城市 List
    cityList (state) {
      return state.location.map((d) => d.name)
    },
    // 抓出區域 List
    districtList (state) {
      return state.location.find((d) => d.name === state.currCity)?.districts || []
    },
    filteredStores (state) {
      // 依縣市 行政區分組
      const { stores } = state
      console.log(state)
      // 加入關鍵字判斷功能
      return state.keywords
        ? stores.filter((d) => d.name.includes(state.keywords))
        : stores.filter((d) => d.county === state.currCity && d.town === state.currDistrict)
    }
  },
  mutations: {
    setcurrCity (state, payload) {
      state.currCity = payload
    },
    setcurrDistrict (state, payload) {
      state.currDistrict = payload
    },
    setAreaLocation (state, payload) {
      state.location = payload
    },
    setStores (state, payload) {
      state.stores = payload
    },
    setKeywords (state, payload) {
      state.keywords = payload
    },
    setShowModal (state, payload) {
      state.showModal = payload
    }
  },
  actions: {
    // 取得行政區資料
    async fetchLocations ({ commit }) {
      const json = await fetch('https://raw.githubusercontent.com/kurotanshi/mask-map/master/raw/area-location.json')
        .then((res) => res.json())
      // 透過 commit 來操作 mutations
      commit('setAreaLocation', json)
    },
    // 取得藥局資料
    async fetchPharmacies ({ commit }) {
      const json = await fetch('https://kiang.github.io/pharmacies/json/points.json')
        .then((res) => res.json())

      // 整理資料格式，拆出經緯度
      const data = json.features.map((d) => ({
        ...d.properties,
        latitude: d.geometry.coordinates[0],
        longitude: d.geometry.coordinates[1]
      }))
      console.log(data)
      // 透過 commit 來操作 mutations
      commit('setStores', data)
    }
  },
  modules: {
  }
})
