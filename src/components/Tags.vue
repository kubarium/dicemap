<template>
    <section class="component">
        <div class="panel-block">
            <div class="tags">
                <span class="tag is-info" v-for="tag in $store.state.tags" :key="tag.id">
                    <span @click="editTag(tag)">
                        {{tag.name}}
                    </span>
                    <button class="delete is-small" @click="$store.dispatch('deleteTag',tag)"></button>
                </span>
            </div>
        </div>
        <div class="panel-block all-tags" v-if="tag">
            <input type="text" class="input is-small" placeholder="Tag" v-model="tag.name" />

            <button class="button is-info is-small" @click="$store.dispatch('saveTag',tag); tag=null">
                <span class="icon">
                    <i class="fas fa-save"></i>
                </span>
            </button>
        </div>
        <footer>
            <button class="button is-success is-small" @click="$store.dispatch('newTag')">
                New Tag
            </button>
        </footer>
    </section>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("fetchTags");
  },
  data() {
    return {
      tag: null
    };
  },
  methods: {
    editTag(tag) {
      this.tag = tag;
    }
  }
};
</script>

<style lang="sass" scoped>
.all-tags
    display: grid
    grid-template-columns: 1fr auto
    gap: 10px

.tag
    cursor: pointer
</style>
