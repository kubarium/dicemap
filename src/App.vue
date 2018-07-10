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
      <section class="section">{{coord}}</section>
      <section class="section">
        <svg height="1030" width="1050" id="asd">
          <defs>
            <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="gray" stroke-width="0.5"></path>
            </pattern>
            <pattern id="grid10" width="100" height="100" patternUnits="userSpaceOnUse" x="30" y="30">
              <rect width="100" height="100" fill="url(#smallGrid)"></rect>
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="gray" stroke-width="1"></path>
            </pattern>
          </defs>

          <text v-for="(v,index) in new Array(10)" :key="`legend-x-${index}`" :x="`${75+(index*100)}`" y="20" class="legend">{{index%10}}{{index===0?"":"X"}}</text>
          <text v-for="(v,index) in new Array(10)" :key="`legend-y-${index}`" :y="`${80+(index*100)}`" x="0" class="legend">{{index%10}}{{index===0?"":"X"}}</text>
          <text v-for="(v,index) in new Array(100)" :key="`x-${index}`" :x="`${30+(index*10)}`" y="30">{{index%10+1}}</text>
          <text v-for="(v,index) in new Array(100)" :key="`y-${index}`" :y="`${40+(index*10)}`" x="20">{{index%10+1}}</text>
          <rect width="10" height="10" fill="red" v-bind:x="`${preview.x}`" v-bind:y="`${preview.y}`" v-show="preview.show" />
          <rect width="10" height="10" fill="blue" v-for="point in points" v-bind:x="`${point.x}`" v-bind:y="`${point.y}`" />


          <rect fill="url(#grid10)" height="1000 " width="1000 " x="30" y="30" @click="placePoint" @mousemove="updateCoord" @mouseout="preview.show=false" />
        </svg>
      </section>
      <!-- <router-view/> -->
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      coord: "",
      preview: { show: false },
      points: [],
      offsetX:20,
      offsetY:20
    };
  },
  methods: {
    placePoint(event) {
      //var normalizedCoords = this.normalizeCoords([event.offsetX,event.offsetY]);

      this.points.push(this.normalizeCoords([event.offsetX,event.offsetY]));
    },
    updateCoord(event) {
      var normalizedCoords = this.normalizeCoords([event.offsetX,event.offsetY]);
      this.preview = Object.assign(
        {},
        this.normalizeCoords([event.offsetX,event.offsetY]),
        {
         
          show: true
        }
      );

      //this.coord = `${event.offsetX - (event.offsetX - 1) % 10}-${event.offsetY - (event.offsetY - 1) % 10}`;
    },
    normalizeCoords([offsetX,offsetY]){
      return { 
          x: offsetX - (offsetX - 1) % 10,
          y: offsetY - (offsetY - 0) % 10 
          }
      //return {x:offsetX - this.offsetX - 1,y:offsetY - this.offsetY};
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
text {
  font-family: monospace;
  font-size: 10px;
}
.legend{
  font-size: 16px;
}
</style>
