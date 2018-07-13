<template>
  <div id="app" class="container">
    <nav class="navbar is-fixed-top">
      <section class="container">
        <div class="navbar-brand">
          <h1 class="title is-3">Dicemap</h1>
          <div class="navbar-burger burger" data-target="navbarExampleTransparentExample">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div id="navbarExampleTransparentExample" class="navbar-menu">
          <div class="navbar-start">

          </div>

          <div class="navbar-end">
            <div class="navbar-item">
              <p class="is-5">
                Points: {{points.length}}
              </p>
            </div>
            <div class="navbar-item">
              <p class="is-5">
                Point: {{point.x-offsetX}}-{{point.y-offsetY}}
              </p>
            </div>
            <div class="navbar-item">
              <div class="field has-addons">
                <div class="control" v-if="dice.length">
                  <div class="buttons has-addons">
                    <span class="button is-small" @click="applyDice">Apply All</span>
                    <button class="button is-small" :disabled="hasPoint(die)" :class="{'is-link':die.applied}" v-for="(die,index) in dice" :key="index" @click="applyDie(die)">{{die.x}}-{{die.y}}</button>
                  </div>
                </div>
                <p class="control">
                  <input class="input is-small" type="number" min="1" max="10" v-model="times" placeholder="Text input">
                </p>
                <p class="control">
                  <button class="button is-primary is-small" @click="roll">
                    <span class="icon">
                      <i class="fas fa-dice"></i>
                    </span>
                    <span>Roll</span>
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </nav>

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
      offsetY: 20,
      dice: [],
      times: 10
    };
  },
  methods: {
    roll() {
      let timesToRoll = this.times;
      this.dice.splice(0);

      do {
        let die = this.lowestDecimal(
          Math.floor(Math.random() * 1000) + 10,
          Math.floor(Math.random() * 1000) + 10
        );

        die.applied = false;

        this.dice.push(die);
      } while (--timesToRoll);
    },
    applyDie(die) {
      die.applied = !die.applied;
      this.clickPoint(null, die);
    },
    applyDice() {
      this.dice.forEach(die => {
        die.applied = !die.applied;
        this.clickPoint(null, die);
      });
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
      let point = override
        ? this.lowestDecimal(
            override.x + this.offsetX,
            override.y + this.offsetY
          )
        : this.lowestDecimal(event.offsetX, event.offsetY);
      console.log(point);

      this.hasPoint(point) ? this.removePoint(point) : this.addPoint(point);
    },
    movePoint(event) {
      this.preview = true;

      Object.assign(
        this.point,
        this.lowestDecimal(event.offsetX, event.offsetY)
      );
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

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.navbar {
  padding: 10px 0;
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
