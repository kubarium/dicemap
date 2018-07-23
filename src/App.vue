<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
console.clear();
</script>

<style lang="sass">

.component .panel-block:first-child
    border-top: 0

.panel footer
  border: 1px solid #dbdbdb
  border-top: 0
  border-radius: 0 0 4px 4px
  padding: 0.5em 0.75em
  background: hsl(0, 0%, 96%)
  margin-bottom: 1em


</style>
