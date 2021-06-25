<template>
  <div class="mask-map" id="mask-map"></div>
</template>

<script>
import L from 'leaflet'
export default {
  name: 'maskMap',
  data () {
    return {
      map: {}
    }
  },
  computed: {
    currDistrictInfo () {
      return this.$store.getters.currDistrictInfo
    },
    filterStores () {
      return this.$store.getters.filterStores
    }
  },
  watch: {
    // 切換行政區
    currDistrictInfo (dist) {
      this.map.panTo(new L.LatLng(dist.latitude, dist.longitude))
    },
    filterStores (stores) {
      stores.forEach(element => {
        this.addMarker(element)
      })
    }
  },
  mounted () {
    // 地圖初始化
    this.map = L.map('mask-map', {
      center: [25.03, 121.55],
      zoom: 14
    })
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '<a target="_blank" href="https://www.openstreetmap.org/">© OpenStreetMap 貢獻者</a>',
      maxZoom: 18
    }).addTo(this.map)
  },
  methods: {

  }
}
</script>
