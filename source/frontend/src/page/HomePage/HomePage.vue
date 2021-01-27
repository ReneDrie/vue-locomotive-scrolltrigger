<style src="./HomePage.scss" module lang="scss"></style>
<script src="./HomePage.js"></script>

<template>
  <div
    :class="[$style.homePage]"
    data-scroll-container
  >
    <div :class="$style.temp" />
    <div :class="$style.temp">
      <div ref="example" :class="$style.example" />
    </div>
    <div :class="$style.temp" />
  </div>
</template>
