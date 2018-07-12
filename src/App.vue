<template>
  <section class="section">
    <div id="app" class="container">
      <nav class="navbar is-transparent">
        <div class="navbar-brand">
          <h1 class="title">Dicemap</h1>
          <div class="navbar-burger burger" data-target="navbarExampleTransparentExample">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div id="navbarExampleTransparentExample" class="navbar-menu">
          <div class="navbar-start">
            <a class="navbar-item" href="https://bulma.io/">
              Home
            </a>
            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link" href="/documentation/overview/start/">
                Docs
              </a>
              <div class="navbar-dropdown is-boxed">
                <a class="navbar-item" href="/documentation/overview/start/">
                  Overview
                </a>
                <a class="navbar-item" href="https://bulma.io/documentation/modifiers/syntax/">
                  Modifiers
                </a>
                <a class="navbar-item" href="https://bulma.io/documentation/columns/basics/">
                  Columns
                </a>
                <a class="navbar-item" href="https://bulma.io/documentation/layout/container/">
                  Layout
                </a>
                <a class="navbar-item" href="https://bulma.io/documentation/form/general/">
                  Form
                </a>
                <hr class="navbar-divider">
                <a class="navbar-item" href="https://bulma.io/documentation/elements/box/">
                  Elements
                </a>
                <a class="navbar-item is-active" href="https://bulma.io/documentation/components/breadcrumb/">
                  Components
                </a>
              </div>
            </div>
          </div>

          <div class="navbar-end">
            <div class="navbar-item">
              <p class="control">
                <a class="button is-primary" href="https://github.com/jgthms/bulma/releases/download/0.7.1/bulma-0.7.1.zip">
                  <span class="icon">
                    <i class="fas fa-dice"></i>
                  </span>
                  <span>Roll</span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </nav>
      <section class="section">{{point.x-offsetX}}-{{point.y-offsetY}}</section>
      <section class="section">
        <svg>
          <defs>
            <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="gray" stroke-width="0.5"></path>
            </pattern>
            <pattern id="grid10" width="100" height="100" patternUnits="userSpaceOnUse" x="30" y="30">
              <rect width="100" height="100" fill="url(#smallGrid)"></rect>
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="gray" stroke-width="1"></path>
            </pattern>
          </defs>

          <text v-for="(v,index) in new Array(10)" :key="`legend-x-${index}`" :x="`${75+(index*100)}`" :y="offsetY" class="legend">{{index%10}}{{index===0?"":"X"}}</text>
          <text v-for="(v,index) in new Array(10)" :key="`legend-y-${index}`" :y="`${80+(index*100)}`" x="0" class="legend">{{index%10}}{{index===0?"":"X"}}</text>
          <text v-for="(v,index) in new Array(100)" :key="`x-${index}`" :x="`${30+(index*10)}`" :y="offsetY+10">{{index%10+1}}</text>
          <text v-for="(v,index) in new Array(100)" :key="`y-${index}`" :y="`${40+(index*10)}`" :x="offsetX">{{index%10+1}}</text>

          <rect class="point red" :x="point.x" :y="point.y" v-show="preview" />

          <rect class="point blue" v-for="(point,index) in points" :key="index" :x="point.x" :y="point.y" />

          <rect fill="url(#grid10)" height="1000 " width="1000 " x="30" y="30" @click="clickPoint" @mousemove="movePoint" @mouseout="preview=false" />
        </svg>
      </section>
      <!-- <router-view/> -->
    </div>
  </section>
</template>
<script>
console.clear();
export default {
  data() {
    return {
      preview: false,
      point: { x: 0, y: 0 },
      points: [],
      offsetX: 20,
      offsetY: 20
    };
  },
  methods: {
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
    clickPoint() {
      let point = this.normalizeCoords(event.offsetX, event.offsetY);

      this.hasPoint(point) ? this.removePoint(point) : this.addPoint(point);
    },
    movePoint(event) {
      this.preview = true;

      Object.assign(
        this.point,
        this.normalizeCoords(event.offsetX, event.offsetY)
      );
    },
    normalizeCoords(offsetX, offsetY) {
      return {
        x: offsetX - offsetX % 10,
        y: offsetY - offsetY % 10
      };
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
svg {
  height: 1030px;
  width: 1030px;
}
text {
  font-family: monospace;
  font-size: 10px;
}
.legend {
  font-size: 16px;
}
.point {
  width: 10px;
  height: 10px;
}
.blue {
  fill: blue;
}
.red {
  fill: red;
}
</style>
