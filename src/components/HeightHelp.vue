<template>
  <portal
    to="sys-portal-data-table"
    :order="topOrBottom === 'top' ? 0 : 1000000000000000"
  >
    <tr>
      <td
        :colspan="colspan"
        :style="{height: `${height}px`}"
      ></td>
    </tr>
  </portal>
</template>

<script>
export default {
  name: "HeightHelp",
  props: {
    colspan: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    },
    topOrBottom: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
</style>
