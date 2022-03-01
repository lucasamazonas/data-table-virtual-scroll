<template>
  <thead :class="classHeader">
    <tr class="text-left">
      <th :key="-1" v-if="showSelect" id="column-first" class="cursor-pointer">
        <v-icon v-if="iconPrimary" color="primary">mdi-checkbox-marked</v-icon>
        <v-icon v-else-if="iconMinusBox">mdi-minus-box</v-icon>
        <v-icon v-else>mdi-checkbox-blank-outline</v-icon>
      </th>

      <template v-for="(header, key) in headers">
        <th :key="key">
          <slot
            :name="`header.${header.value}`"
            :header="header"
            :text="header.text"
            :value="header.value"
          >
            {{ header.text }}
          </slot>
        </th>
      </template>
    </tr>
  </thead>
</template>

<script>
export default {
  name: "THeader",
  props: {
    iconPrimary: Boolean,
    iconMinusBox: Boolean,
  },
  inject: [
    "headers",
    "fixedHeader",
    "showSelect"
  ],
  computed: {
    classHeader() {
      return {
        'header-fixed': this.fixedHeader
      }
    }
  }
}
</script>

<style scoped>
#column-first {
  width: 30px;
}
thead tr th {
  background: white;
  align-items: center;
  vertical-align: top;
  border-bottom: 1px solid #e1dfdf;
  text-align: left;
  font-size: 12px;
  padding: 5px 3px;
}
.header-fixed {
  position: sticky;
  top: 0;
}
</style>
