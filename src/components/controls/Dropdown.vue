<template>
  <div class="dropdown" v-click-outside="hideOptions" :class="{ selected: !!value, open: optionsVisible }">
    <div class="dropdown--toggle" @click="toggleOptions()">
      <span v-if="value">{{ value.text }}</span>
      <span class="toggle--placeholder" v-if="!value">{{ placeholder }}</span>
      <svg class="toggle--expand-arrow" fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/><path d="M0-.25h24v24H0z" fill="none"/></svg>
    </div>
    <transition name="fade">
      <div class="dropdown--options" v-if="optionsVisible">
        <div class="dropdown--option" v-for="option of options" :key="option.id" @click="selectOption(option)">
          {{ option.text }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: ['options', 'placeholder', 'value'],
  data() {
    return {
      optionsVisible: false
    };
  },

  methods: {
    toggleOptions() {
      this.optionsVisible = !this.optionsVisible;
    },
    hideOptions() {
      this.optionsVisible = false;
    },
    selectOption(option) {
      this.hideOptions();
      this.$emit('input', option);
    }
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s ease-in-out;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.dropdown {
  width: 100%;
  position: relative;
}

.dropdown--toggle {
  border: 1px solid transparent;
  border-bottom: 1px solid #cccccc;
  font-family: Roboto;
  font-size: 20px;
  font-weight: 300;
  padding: 6px 10px;
  cursor: pointer;
  transition: all 300ms ease;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.dropdown.open .dropdown--toggle,
.dropdown--toggle:hover {
  box-shadow: 0px 10px 20px 6px rgba(0, 0, 0, .1), 0px 0px 4px rgba(0, 0, 0, .1);
  border-color: transparent !important;
}

.dropdown.selected .dropdown--toggle {
  border-bottom-color: #2c3e50;
}

.toggle--placeholder {
  color: #cccccc;
  transition: all 300ms ease;
}

.dropdown--toggle:hover .toggle--placeholder,
.dropdown.selected .toggle--placeholder,
.dropdown.open .toggle--placeholder {
  color: #2c3e50;
}

.toggle--expand-arrow {
  transform: rotate(90deg);
  fill: #cccccc;
  transition: all 300ms ease;
}

.dropdown--toggle:hover .toggle--expand-arrow,
.dropdown.selected .toggle--expand-arrow,
.dropdown.open .toggle--expand-arrow {
  fill: #2c3e50;
}

.dropdown--options {
  position: absolute;
  width: 200px;
  top: 42px;
  z-index: 10;
  background-color: white;
  box-shadow: 0px 10px 20px 6px rgba(0, 0, 0, .1), 0px 0px 4px rgba(0, 0, 0, .1);
}

.dropdown--option {
  height: 35px;
  font-family: Roboto;
  font-size: 18px;
  font-weight: 300;
  padding: 0 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 300ms ease;
}

.dropdown--option:hover {
  background: #f6f6f6;
}
</style>