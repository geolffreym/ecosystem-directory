<template>
  <div class="slider-container">
    <div
      v-hammer:swipe.horizontal="onSwipe"
      class="slider-card">

      <div class="slide-nav">

        <button
          class="nav-arrow"
          @click="incrementSelection(selectedSeg - 1)">
          <PrevArrow
            stroke="#052437"
            width="10"
            height="15" />
        </button>

        <h3 class="title-between-buttons">
          {{ currentCategory.label }}
        </h3>

        <button
          class="nav-arrow"
          @click="incrementSelection(selectedSeg + 1)">
          <NextArrow
            stroke="#052437"
            width="10"
            height="15" />
        </button>

      </div>

      <transition name="slide-fade" mode="out-in">

        <div :key="currentCategory.label">

          <div class="title-large-screen">
            <h3>
              {{ currentCategory.label }}
            </h3>
          </div>

          <div class="description">
            {{ currentCategory.description ? currentCategory.description : '' }}
          </div>

          <div v-if="logos" class="logo-wrapper">

            <img
              v-for="path in logos"
              :key="path"
              :src="$relativity(`/images/projects/${path}`)" />

          </div>

        </div>
      </transition>

      <button
        class="view-all button noselect"
        @click="jump2Filters">
        {{ filterToggleButtonText }}
      </button>

    </div>
  </div>
</template>

<script>
// ===================================================================== Imports
import { mapGetters, mapActions } from 'vuex'

import PrevArrow from '@/components/Icons/PrevArrow'
import NextArrow from '@/components/Icons/NextArrow'

// ====================================================================== Export
export default {
  name: 'Slider',

  components: {
    PrevArrow,
    NextArrow
  },

  props: {
    selectedSeg: {
      type: Number,
      default: 0
    },
    parentCategory: {
      type: String,
      required: true
    },
    containerHeight: {
      type: Number,
      default: 440
    }
  },

  computed: {
    ...mapGetters({
      siteContent: 'global/siteContent',
      routeQuery: 'filters/routeQuery',
      segmentCollection: 'core/segmentCollection'
    }),
    filterToggleButtonText () {
      return this.siteContent.index.page_content.segment_slider.filter_toggle_button_text
    },
    logos () {
      if (this.currentCategory.hasOwnProperty('logos')) {
        return this.currentCategory.logos
      }
      return false
    },
    currentCategory () {
      if (this.selectedSeg in this.segmentCollection) {
        return this.segmentCollection[this.selectedSeg]
      }
      return {}
    }
  },

  beforeDestroy () {
    if (this.resize) { window.removeEventListener('resize', this.resize) }
  },

  methods: {
    ...mapActions({
      setRouteQuery: 'filters/setRouteQuery',
      setFilterPanelOpen: 'filters/setFilterPanelOpen'
    }),
    incrementSelection (seg) {
      this.$emit('update-slider', seg)
    },
    jump2Filters () {
      this.setRouteQuery({ key: 'filters', data: 'enabled' })
      this.setRouteQuery({ key: 'tags', data: this.currentCategory.slug })
      this.setFilterPanelOpen(true)
    },
    onSwipe (e) {
      if (e.type === 'swipeleft') {
        this.incrementSelection(this.selectedSeg + 1)
      } else if (e.type === 'swiperight') {
        this.incrementSelection(this.selectedSeg - 1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// ////////////////////////////////////////////////////////////////////// Slider
.slider-container {
  min-width: 16rem;
  flex: 1 1 10rem;
  display: flex;
  align-items: center;
}

.slider-card {
  @include borderRadius3;
  background-color: #ffffff;
  width: 100%;
  padding: 2rem;
  position: relative;
  align-items: center;
  h3 {
    @include leading_Regular;
    font-weight: 500;
    @include small {
      @include fontSize_Small;
    }
  }
}

.title-large-screen {
  margin-bottom: 1rem;
  @include leading_Regular;
  @include medium {
    display: none;
  }
}

.title-between-buttons {
  display: none;
  @include medium {
    display: inline;
  }
}

.description {
  @include fontSize_Small;
  font-weight: 400;
  margin-bottom: 2rem;
  line-height: 1.4;
  color: #494949;
  @include small {
    max-width: 50%;
    margin-left: auto;
    margin-right: auto;
  }
  @include tiny {
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
  }
}

.slide-nav {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.75rem;
  @include small {
    justify-content: space-between;
    max-width: 50%;
    margin-left: auto;
    margin-right: auto;
  }
}

.nav-arrow {
  @include borderRadius3;
  display: flex;
  padding: 0.25rem;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 0.5rem;
  color: rgba(0, 0, 0, 0.5);
  background-color: #FFFFFF;
  border: none;
  font-weight: 900;
  width: 3.75rem;
  @include small {
    width: auto;
  }
  &:hover {
    color: rgb(2, 28, 54);
  }
  &:focus {
    outline: none;
    box-shadow: none;
  }
}

.logo-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  max-width: 300px;
  margin: 0 auto;
  margin-bottom: 1.5rem;
  img {
    &:first-child {
      margin-left: 0;
    }
    &:last-child {
      margin-right: 0;
    }
  }
}

.logo-wrapper {
  > img {
    margin: 0 0.75rem;
    width: auto;
    max-width: 25%;
    max-height: 2.5rem;
  }
}

.view-all {
  position: absolute;
  margin: 0 auto;
  padding: 0.25rem 0;
  width: 10rem;
  left: 0;
  right: 0;
  bottom: 0px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-weight: 500;
  text-align: center;
  text-decoration: none;
  color: white;
  background-color: rgb(2, 28, 54);
  border: none;
  @include borderRadius3;
  transform: translateY(50%);
  @include medium {
    transform: translateY(0%);
    position: relative;
  }
  &:focus {
    outline: none;
    box-shadow: none;
  }
}

.noselect {
  user-select: none;
}

// ////////////////////////////////////////////////////////////////// Animations
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all .25s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
}
</style>
