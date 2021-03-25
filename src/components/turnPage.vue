<template>
 <div class="turn-page">
    <div
    id="prev-btn"
    @click="turnPage('prev')"
    :class="{'not-allow': this.nowP == 1}">&lt;</div>
    <template v-if="totalP <= 7">
      <div
      v-for="i in totalP"
      :key="i"
      :class="{active: i === nowP}"
      @click="turnPage(i)"
      >{{i}}</div>
    </template>
    <template v-else>
      <!-- nowP <= 4 1,2,3,4,5,6 -->
      <template v-if="nowP <= 4">
        <div
        v-for="i in 6"
        :key="i"
        :class="{active: i === nowP}"
        @click="turnPage(i)"
        >{{i}}</div>
      </template>
      <!-- nowP >4 1 ... -->
      <template v-if="nowP > 4">
        <div @click="turnPage(1)">1</div>
        <div @click="turnPage(nowP-5>0? nowP -5 : 1)">...</div>
      </template>
      <!-- nowP >4 && nowP < totalP - 3,  nowP-2 (nowP - 3 + i), nowP-1, nowP, nowP + 1, nowP +2 -->
      <template v-if="nowP > 4 && nowP < totalP - 3">
        <div
        v-for="i in 5"
        :key="nowP - 3 + i"
        :class="{ active:  i === 3 }"
        @click="turnPage(nowP - 3 + i)"
        >{{nowP - 3 + i}}</div>
      </template>
       <!-- nowP >= totalP - 3 totalP-5 (totalP - 6 + i), totalP -->
      <template v-if="nowP >= totalP - 3">
        <div
        v-for="i in 6"
        :key="totalP - 6 + i"
        :class="{active: totalP - 6 + i === nowP}"
        @click="turnPage(totalP - 6 + i)"
        >{{totalP - 6 + i}}</div>
      </template>
      <!-- nowP < totalP -3 ... totalP -->
      <template v-if="nowP < totalP - 3">
        <div @click="turnPage(nowP + 5 <= totalP ? nowP + 5 : totalP)">...</div>
        <div @click="turnPage(totalP)">{{ totalP }}</div>
      </template>
    </template>
    <div
    id="next-btn"
    @click="turnPage('next')"
    :class="{'not-allow': this.nowP == this.totalP}"
    >&gt;</div>
  </div>
</template>

<script>
// currentPage
export default {
  // data() {
  //   return {
  //     totalP: 100,
  //     nowP: 100,
  //   };
  // },
  props: ['totalP', 'nowP'],
  methods: {
    turnPage(n) {
      let np = null;
      if (n === 'prev') {
        if (this.nowP > 1) {
          // this.nowP -= 1;
          np = this.nowP - 1;
        }
      } else if (n === 'next') {
        if (this.nowP < this.totalP) {
          // this.nowP += 1;
          np = this.nowP + 1;
        }
      } else {
        // this.nowP = n;
        np = n;
      }
      if (np === null || np === this.nowP) {
        return;
      }
      this.$emit('currentPage', np);
    },
  },
};
</script>

<style scoped>
.turn-page {
  user-select: none;
}
.turn-page > div {
  padding: 0 4px;
  background: transparent;
  vertical-align: top;
  display: inline-block;
  font-size: 13px;
  min-width: 35.5px;
  height: 28px;
  line-height: 28px;
  cursor: pointer;
  box-sizing: border-box;
  text-align: center;
  margin: 0;
  border: none;
  cursor: pointer;
}
.turn-page > div:hover {
  color: #409eff;
}
.turn-page > .active {
  color: #409eff;
  cursor: default;
}
.not-allow {
  cursor: not-allowed!important;
}
.not-allow:hover {
  color: #000!important;
}
</style>
