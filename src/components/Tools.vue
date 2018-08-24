<template>
    <section class="component">
        <div class="panel-block">
            <div class="field has-addons">
                <p class="control is-expanded has-icons-right">
                    <input type="text" class="input  " placeholder="Map Name" v-model="$store.state.map.name" />
                    <span class="icon is-small is-right" v-show="$store.state.justSaved">
                        <i class="fas fa-check"></i>
                    </span>
                </p>
                <div class="control">
                    <button class="button is-info is-pulled-right" @click="$store.dispatch('saveMap')">Save</button>
                </div>
            </div>
        </div>
        <div class="panel-block">
            <div class="preview">
                <span class="dot" :style="{left:`${point.x/10}px`,top:`${point.y/10}px`}" v-for="(point,index) in $store.state.map.points" :key="index">""</span>
            </div>
        </div>
        <div class="panel-block">
            <div class="buttons has-addons dice">
                <span class="button is-small" @click="applyDice">Apply All</span>
                <button class="button is-small" :disabled="$store.getters.hasPoint(die)" :class="{'is-link':die.applied}" v-for="(die,index) in dice" :key="index" @click="applyDie(die)">{{die.x+offsetX}}-{{die.y+offsetY}}</button>
            </div>
            <p class="is-5">
                <!-- Point: {{point.x+this.offsetX}}-{{point.y+this.offsetY}} -->
            </p>
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
    </section>
</template>

<script>
import { lowestDecimal, highestDecimal } from "@/utils";
export default {
  name: "Tools",
  data() {
    return {
      times: 10,
      dice: [],
      offsetX: 10,
      offsetY: 10
    };
  },
  methods: {
    roll() {
      let timesToRoll = this.times;
      this.dice.splice(0);

      do {
        let die = lowestDecimal(
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
    }
  }
};
</script>


<style lang="sass" scoped>
.preview
    outline: 1px solid #EBEBEB
    width: 100px
    height: 100px
    position: relative
.dot
    outline: 1px solid blue
    position: absolute
    font-size: 0px
    line-height: 0px
.dice .button
    width: 67px
</style>
