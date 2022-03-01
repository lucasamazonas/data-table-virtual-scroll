<template>
  <div>
    <div :style="styleBlockTable" @scroll="scrollTable($event.target.scrollTop)">
      <table>
        <t-header
          :icon-primary="items.length === modelValue.length"
          :icon-minus-box="modelValue.length > 0"
        >
          <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
            <slot :name="name" v-bind="slotData" />
          </template>
        </t-header>

        <portal-target name="sys-portal-data-table" multiple tag="tbody" />
      </table>
    </div>

    <HeightHelp :colspan="headers.length" :height="scrollTopTable" top-or-bottom="top" />
    <HeightHelp :colspan="headers.length" :height="heightRowBottom" top-or-bottom="bottom" />

    <v-virtual-scroll
      id="comp-virtual-scroll"
      width="100%"
      :height="height"
      :items="_items"
      :item-height="itemHeight"
      v-slot="{item}"
      ref="compVirtualScrollRef"
    >
      <row :row="item">
        <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
          <slot :name="name" v-bind="slotData" />
        </template>
      </row>
    </v-virtual-scroll>
  </div>
</template>

<script>
import props from "./IndexProps.js";
import HeightHelp from "./HeightHelp";
import Row from "./Row";
import THeader from "./THeader";

export default {
  name: "Index",
  components: {
    THeader,
    Row,
    HeightHelp
  },
  model: {
    prop: "modelValue",
    event: "update:modelValue"
  },
  props: props,
  provide: function () {
    return {
      headers: this.headers,
      itemHeight: this.itemHeight,
      showSelect: this.showSelect,
      arrayItemKeySelected: this.arrayItemKeySelected,
      itemKey: this.itemKey,
      fixedHeader: this.fixedHeader,
    };
  },
  data: () => ({
    timerScroll: null,
    scrollTopTable: 0,
    heightVirtualScroll: 0
  }),
  computed: {
    styleBlockTable() {
      return{
        height: `${this.height}px`,
        borderRadius: '5px',
        overflowY: 'auto'
      };
    },
    arrayItemKeySelected() {
      return [];
      // return this.Helpers.arrayColumn(this.modelValue, this.itemKey);
    },
    _items() {
      let prepend = [];
      let append = [];

      if (this.$scopedSlots['prepend-item']) {
        prepend = [{ _slot: 'prepend-item'}];
      }

      if (this.$scopedSlots['append-item']) {
        append = [{ _slot: 'append-item'}];
      }

      return prepend.concat(this.items).concat(append);
    },
    heightRowBottom() {
      if ((this.height + this.scrollTopTable) >= this.heightVirtualScroll) {
        return 0;
      }

      return this.heightVirtualScroll - (this.height + this.scrollTopTable);
    }
  },
  mounted() {
    this.heightVirtualScroll = this.$refs.compVirtualScrollRef.$el.scrollHeight;
  },
  methods: {
    scrollTable(scrollTop) {
      if ((scrollTop + this.height) <= this.heightVirtualScroll) {
        this.scrollTopTable = scrollTop;
        this.$refs.compVirtualScrollRef.$el.scrollTop = scrollTop;
      } else {
        this.scrollTopTable = (this.heightVirtualScroll - this.height);
        this.$refs.compVirtualScrollRef.$el.scrollTop = (this.heightVirtualScroll - this.height);
      }
    },
    itemSelecionado(item) {
      let novaModelValue;

      if (this.itemEstaSelecionado(item)) {
        novaModelValue = this.removeItemDaModelValue(item);
      } else {
        novaModelValue = this.adicionarItemAModelValue(item);
      }

      this.updateModelValue(novaModelValue);
    },
    selecionarTodosOsItems(selecionarTodos) {
      const novaModelValue = selecionarTodos
        ? this.items
        : [];

      this.updateModelValue(novaModelValue);
    },
    updateModelValue(valores) {
      this.$emit("update:modelValue", valores);
    },
    itemEstaSelecionado(item) {
      return this.arrayItemKeySelected.includes(item[this.itemKey]);
    },
    removeItemDaModelValue(item) {
      return this.modelValue.filter(value => (item[this.itemKey] !== value[this.itemKey]));
    },
    adicionarItemAModelValue(item) {
      return [].concat(this.modelValue, item);
    }
  }
}
</script>

<style scoped>
table {
  border-collapse: separate;
  border-spacing: 0px;
  width: 100%;
  overflow-y: auto;
}
#comp-virtual-scroll {
  position: absolute;
  margin-left: 0;
  left: -101%;
  top: -101%;
}
</style>
