<template>
    <nav class="panel">
        <p class="panel-heading">
            Dicemap
        </p>
        <div class="panel-block">
            <p class="control has-icons-left">
                <input class="input is-small" type="search" placeholder="Search Maps" v-model="$store.state.search" @keyup="$store.dispatch('search')">
                <span class="icon is-small is-left">
                    <i class="fas fa-search" aria-hidden="true"></i>
                </span>
            </p>
        </div>
        <p class="panel-tabs">
            <a :class="{'is-active':tab===$store.state.tab}" v-for="tab in $store.state.tabs" :key="tab" @click="$store.commit('changeTab', tab)" v-if="tab!='Tools' || $store.state.map.name">{{tab}}</a>
        </p>
        <maps v-show="$store.getters.showTab('Maps')" />
        <tools v-show="$store.getters.showTab('Tools')" />
        <tags v-show="$store.getters.showTab('Tags')" />
    </nav>
</template>


<script>
import Tools from "@/components/Tools.vue";
import Maps from "@/components/Maps.vue";
import Tags from "@/components/Tags.vue";
export default {
  name: "Panel",
  components: {
    Tools,
    Maps,
    Tags
  },
  data() {
    return {};
  },
  methods: {}
};
</script>


<style lang="sass" scoped>


.panel
  position: fixed
  top: 30px
  left: 30px
  width: 300px

.panel-block > *
    flex-grow: 1

</style>
