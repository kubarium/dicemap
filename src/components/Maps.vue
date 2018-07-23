<template>
    <section class="component">
        <p class="panel-block">
            <span class="is-6 title">
                The 5 Most Recent Maps
            </span>
        </p>

        <div class="panel-block most-recent-maps" :class="{'is-active':map.id===$store.state.map.id}" v-for="map in $store.state.maps" :key="map.id">

            <a class="" @click="$store.dispatch('editMap', map)">
                {{map.name}}
            </a>
            <span class="last-edit-date">
                ({{map.editDate}})
            </span>
            <button class="button is-link is-small" @click="deleteMap(map.id)">
                <span class="icon">
                    <i class="fas fa-trash"></i>
                </span>
            </button>

        </div>
        <footer>
            <button class="button is-success is-small" @click="$store.dispatch('newMap')">
                <!-- <span class="icon">
                    <i class="fas fa-trash"></i>
                </span> -->
                New Map
            </button>

        </footer>
        <div class="message" v-show="confirmation.show">
            <div class="message-header">
                <p>Are you sure?</p>
            </div>
            <div class="message-body">
                <button class="button control is-danger" @click="confirmation.show=false;$store.dispatch('deleteMap',confirmation.data)">Yes, I give 0 fuck</button>

                <button class="button control is-success" @click="confirmation.show=false">No, Fuck no!</button>
            </div>
        </div>

    </section>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("fetchLast5Maps");
  },
  name: "Maps",
  data() {
    return {
      confirmation: { show: false, data: null }
    };
  },
  methods: {
    deleteMap(id) {
      Object.assign(this.confirmation, { show: true, data: id });
    }
  }
};
</script>

<style lang="sass" scoped>
.last-edit-date
  font-style: italic
  font-size: xx-small
  

.most-recent-maps
    display: grid
    grid-template-columns: 1fr auto auto
    gap: 10px


.message-body
    padding-right: 1em 
    padding-left: 1em
    display: flex
    justify-content: space-between
</style>
