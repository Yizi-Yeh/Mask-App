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
    }
  },
  watch: {
    // 切換行政區
    currDistrictInfo (dist) {
      this.map.panTo(new L.LatLng(dist.latitude, dist.longitude))
    }
  },
  mounted () {
    this.map = L.map('mask-map', {
      center: [25.03, 121.55],
      zoom: 14
    })
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '<a target="_blank" href="https://www.openstreetmap.org/">© OpenStreetMap 貢獻者</a>',
      maxZoom: 18
    }).addTo(this.map)
  }
}
</script>
