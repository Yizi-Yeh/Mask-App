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
    showModal: false,
    infoBoxSid: null
  },
  getters: {
    // 抓出城市 List
    cityList (state) {
      return state.location.map((d) => d.name)
    },
    // 抓出區域 List
    // 依下拉的城市做區域的改變
    districtList (state) {
      return state.location.find((d) => d.name === state.currCity)?.districts || []
    },
    filteredStores (state) {
      // 依縣市 行政區分組
      // 先從 state 中 解構 stored
      const { stores } = state
      // 加入關鍵字判斷功能
      return state.keywords
        ? stores.filter((d) => d.name.includes(state.keywords))
        : stores.filter((d) => d.county === state.currCity && d.town === state.currDistrict)
    },
    currDistrictInfo (state, getters) {
      // 目前所選行政區資訊
      return getters.districtList.find((d) => d.name === state.currDistrict) || {}
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
    setshowModal (state, payload) {
      state.showModal = payload
    },
    setInfoBoxSid (state, payload) {
      state.infoBoxSid = payload
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
      // d為features陣列中的值
      const data = json.features.map((d) => ({
        // 將 properties中的變數解構，重組一個data新陣列
        ...d.properties,
        latitude: d.geometry.coordinates[0],
        longitude: d.geometry.coordinates[1]
      }))
      // 透過 commit 來操作 mutations
      commit('setStores', data)
    }
  },
  modules: {
  }
})
