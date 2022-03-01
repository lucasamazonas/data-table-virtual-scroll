export default {
  modelValue: {
    type: Array,
    required: false
  },
  items: {
    type: Array,
    required: true
  },
  headers: {
    type: Array,
    required: true
  },
  itemHeight: {
    type: [Number, String],
    required: true
  },
  height: {
    type: Number,
    required: true
  },
  headerHeight: {
    type: [Number, String],
    default: '25px'
  },
  showSelect: {
    type: Boolean,
    default: false
  },
  itemKey: {
    type: String,
    required: false
  },
  title: {
    type: String,
    required: false
  },
  iconTitle: {
    type: String,
    default: "mdi-format-list-bulleted"
  },
  fixedHeader: {
    type: Boolean,
    default: true
  },
}
