<template>
  <transition name="modal">
    <div class="modal-mask" v-show="showModal">
      <div class="modal=wrapper" @click.self="close">

        <div class="modal container">
          <div class="modal-body">
            <div >hello</div>
          </div>
        </div>

      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Lightbox',
  computed: {
    showModal: {
      get () {
        return this.$store.state.showModal
      },
      set (value) {
        this.$store.commit('setshowModal', value)
      }
    }
  },
  mothods: {
    close () {
      this.showModal = false
    }
  }
}
</script>
