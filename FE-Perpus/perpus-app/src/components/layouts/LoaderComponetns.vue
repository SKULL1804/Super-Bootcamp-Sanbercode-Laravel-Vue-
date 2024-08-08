<script setup>
const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false
  }
});

function beforeEnter(el) {
  el.style.opacity = 0;
}

function enter(el, done) {
  el.offsetHeight;
  el.style.transition = 'opacity 0.5s';
  el.style.opacity = 1;
  done();
}

function leave(el, done) {
  el.style.transition = 'opacity 0.5s';
  el.style.opacity = 0;
  done();
}
</script>

<template>
  <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
    <div class="fixed top-0 left-0 flex justify-center items-center h-full w-full z-50 bg-base-100" v-if="props.isLoading">
      <span class="loading loading-infinity loading-lg"></span>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
