<template>
  <div class="input-container">
    <input type="text" :placeholder="placeholder" :value="value" @input="onChange($event.target.value)" :class="{ filled: value }">
    <span class="currency" v-bind:style="{ transform: translation }">{{ this.currency }}</span>
  </div>
</template>

<script>
import { getTextWidth } from '../../helpers';

export default {
  props: ['placeholder', 'value', 'currency'],
  methods: {
    onChange(input) {
      this.$emit('input', input);
    }
  },
  computed: {
    translation() {
      const offset = Math.min(125, getTextWidth(this.value + ' ', '300 20px Roboto'));
      return `translateX(${ offset }px)`;
    }
  }
}
</script>

<style>
  .input-container {
    position: relative;
  }

  .currency {
    position: absolute;
    display: none;
    bottom: 6px;
    left: 0;
    font-weight: 300;
  }
  
  input {
    height: 35px;
    width: 100%;
    font-family: Roboto;
    font-size: 20px;
    font-weight: 300;
    border: none;
    border-bottom: 1px solid #e0e0e0;
    outline: none;
    transition: all 300ms ease;
  }

  input:focus,
  input.filled {
    border-bottom-color: #2c3e50;
  }

  input.filled + .currency {
    display: inline;
  }

  input::placeholder {
    color: #cccccc;
  }
</style>
