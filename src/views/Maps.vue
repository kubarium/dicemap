<template>
  <div class="about">
    <panel/>
    <grid/>

  </div>
</template>
<script>
import Grid from "@/components/Grid.vue";
import Panel from "@/components/Panel.vue";
export default {
  components: {
    Grid,
    Panel
  }
};
</script>

<style lang="sass">

$fullhd-enabled: false
$widescreen-enabled: false
$tablet: 1600px


@import "~bulma/bulma"

</style>
