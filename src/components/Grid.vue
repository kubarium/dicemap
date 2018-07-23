<template>
  <section class="svg">
    <svg class="legend-x">
      <text v-for="(v,index) in new Array(10)" :key="`legend-x-${index}`" :x="`${45+(index*100)}`" :y="20" class="legend">{{index%10}}{{index===0?"":"X"}}</text>
      <text v-for="(v,index) in new Array(100)" :key="`x-${index}`" :x="index*10" :y="30">{{index%10+1}}</text>
    </svg>
    <svg class="legend-y">
      <text v-for="(v,index) in new Array(10)" :key="`legend-y-${index}`" :y="`${80+(index*100)}`" x="0" class="legend">{{index%10}}{{index===0?"":"X"}}</text>
      <text v-for="(v,index) in new Array(100)" :key="`y-${index}`" :y="`${10+(index*10)}`" :x="20">{{index%10+1}}</text>
    </svg>
    <svg class="grid">
      <defs>
        <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="gray" stroke-width="0.5"></path>
        </pattern>
        <pattern id="grid10" width="100" height="100" patternUnits="userSpaceOnUse" x="0" y="0">
          <rect width="100" height="100" fill="url(#smallGrid)"></rect>
          <path d="M 100 0 L 0 0 0 100" fill="none" stroke="gray" stroke-width="1"></path>
        </pattern>
      </defs>

      <rect class="point red" :x="point.x" :y="point.y" v-show="preview" />

      <rect class="point blue" v-for="(point,index) in $store.state.map.points" :key="index" :x="point.x-offsetX" :y="point.y-offsetY" />

      <rect fill="url(#grid10)" height="1000 " width="1000 " x="0" y="0" @click="clickPoint" @mousemove="movePoint" @mouseout="preview=false" />
    </svg>
  </section>
</template>

<script>
export default {
  name: "Grid",
  data() {
    return {
      preview: false,
      points: [],
      point: {
        x: 0,
        y: 0
      }
    };
  },
  methods: {
    movePoint(event) {
      //console.log(event);
      this.preview = true;

      Object.assign(
        this.point,
        this.lowestDecimal(event.offsetX, event.offsetY)
      );
    },
    hasPoint(newPoint) {
      return (
        this.points.filter(
          point => point.x == newPoint.x && point.y == newPoint.y
        ).length > 0
      );
    },
    removePoint(oldPoint) {
      this.points = this.points.filter(
        point => point.x != oldPoint.x || point.y != oldPoint.y
      );
    },
    addPoint(newPoint) {
      this.points.push(newPoint);
    },
    clickPoint(event, override) {
      console.log(event);
      console.log(override);

      let point = override
        ? this.lowestDecimal(
            override.x + this.offsetX,
            override.y + this.offsetY
          )
        : this.lowestDecimal(
            event.offsetX + this.offsetX,
            event.offsetY + this.offsetY
          );
      console.log(point);

      this.hasPoint(point) ? this.removePoint(point) : this.addPoint(point);
    },
    highestDecimal(x, y) {
      return { x: x - x % 10 + 10, y: y - y % 10 + 10 };
    },
    lowestDecimal(x, y) {
      return {
        x: x - x % 10,
        y: y - y % 10
      };
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass" scoped>
$dimension: 1000px
$legend-gap: 30px 

.svg 
  display: grid
  grid-template-rows: $legend-gap $dimension
  grid-template-columns: $legend-gap $dimension
  position: absolute
  left: 340px
  top: 30px
  width: $dimension + $legend-gap + 10
  height: $dimension + $legend-gap + 10
  background: #FCFCFC
  outline: 1px solid #EBEBEB

.grid 
  height: $dimension
  width: $dimension
  grid-row-start: 2
  border-right: 1px solid #BEBEBE
  border-bottom: 1px solid #BEBEBE


.legend 
  font-size: 16px

.legend-x 
  height: $legend-gap
  width: $dimension + 10
  grid-column-start: 2

.legend-y 
  height: $dimension
  width: $legend-gap
  grid-row-start: 2
  grid-column-end: 2


text 
  font-family: monospace
  font-size: 10px


.point 
  width: 10px
  height: 10px

.blue 
  fill: blue

.red 
  fill: red

</style>
