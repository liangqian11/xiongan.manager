//---------------------------------------------------------------------------- Package
import Vue from 'vue'
//---------------------------------------------------------------------------- Exports
export default function (value, format) {
  return Vue.time.dateFormat(format, value)
}