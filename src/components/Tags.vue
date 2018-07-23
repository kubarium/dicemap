<template>
    <section class="component">
        <div class="panel-block all-tags" v-for="tag in $store.state.tags" :key="tag.id">
            <!-- {{tag.name}} -->
            <!-- <div class="field has-addons">
                <p class="control is-expanded has-icons-right">
                    <input type="text" class="input  " placeholder="Map Name" v-model="tag.name" />
                    <span class="icon is-small is-right" v-show="$store.state.justSaved">
                        <i class="fas fa-check"></i>
                    </span>
                </p>
                <div class="control">
                    <button class="button is-info is-pulled-right" @click="$store.dispatch('saveMap')">Save</button>
                </div>
            </div> -->
            <input type="text" class="input is-small" placeholder="Tag" v-model="tag.name" />

            <button class="button is-info is-small" @click="$store.dispatch('saveTag',tag)">
                <span class="icon">
                    <i class="fas fa-save"></i>
                </span>
            </button>
            <button class="button is-link is-small" @click="$store.dispatch('deleteTag',tag)">
                <span class="icon">
                    <i class="fas fa-trash"></i>
                </span>
            </button>
        </div>
        <footer>
            <button class="button is-success is-small" @click="$store.dispatch('newTag')">
                <!-- <span class="icon">
                    <i class="fas fa-trash"></i>
                </span> -->
                New Tag
            </button>
        </footer>
    </section>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("fetchTags");
  }
};
</script>

<style lang="sass" scoped>
.all-tags
    display: grid
    grid-template-columns: 1fr auto auto
    gap: 10px
</style>
