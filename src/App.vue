<template>
  <div style="border: 10px solid #9b9696;padding: 50px;">
    <sys-table-virtual-scroll
        v-model="itemsSelecionados"
        :items="items"
        :headers="headers"
        item-height="40"
        class="elevation-5"
        item-key="header1"
        title="Lista de Produtos"
        :height="500"
        show-select
        style="background: white"
    >

      <template #item.acoes>
        <v-btn icon>
          <v-icon>mdi-pencil</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>

    </sys-table-virtual-scroll>
  </div>
</template>

<script>
import SysTableVirtualScroll from "./components/Index.vue"
import items from "./components/data.json"

export default {
  name: "App",
  components: {
    SysTableVirtualScroll
  },
  data: () => ({
    items,
    itemsSelecionados: [],
    headers: [
      {text: 'ID Produto', value: 'header1'},
      {text: 'Id Produto', value: 'header2'},
      {text: 'Fornecedor', value: 'header4'},
      {text: 'ID Familia', value: 'header5'},
      {text: 'Nome Familia', value: 'header6'},
      {text: 'ID Segmento', value: 'header7'},
      {text: 'Nome Segmento', value: 'header8'},
      {text: 'Ações', value: 'acoes'}
    ]
  })
}
</script>

<style>
body {
  font-family: Roboto;
  overflow: hidden;
  background: #9b9696;
}
.cursor-pointer {
  cursor: pointer;
}
</style>
