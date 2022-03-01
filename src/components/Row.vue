<template>
  <portal to="sys-portal-data-table">
    <tr>
      <td :key="-1" id="column-first" v-if="showSelect" :style="styleColunm">
        <v-icon v-if="itemSelected" color="primary">mdi-checkbox-marked</v-icon>
        <v-icon v-else>mdi-checkbox-blank-outline</v-icon>
      </td>

      <template v-for="(header, key) in headers">
        <td
          :key="key"
          :style="styleColunm"
        >
          <slot
            :name="`item.${header.value}`"
            :item="row"
            :value="row[header.value]"
          >
            {{row[header.value]}}
          </slot>
        </td>
      </template>
    </tr>
  </portal>
</template>

<script>
export default {
  name: "Row",
  inject: [
    "headers",
    "itemHeight",
    "showSelect",
    "arrayItemKeySelected",
    "itemKey"
  ],
  props: {
    row: {
      type: Object,
      required: true
    }
  },
  computed: {
    itemSelected() {
      return this.arrayItemKeySelected.includes(this.row[this.itemKey]);
    },
    styleColunm() {
      return {
        height: `${this.itemHeight}px`
      }
    }
  }
}
</script>

<style scoped>
#column-first {
  width: 30px;
}
tr td {
  border-bottom: 1px solid #e1dfdf;
  font-size: 12px;
  padding: 0 3px;
}
</style>
