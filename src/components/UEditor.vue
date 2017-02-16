<template>
  <div>
    <script id="editor" type="text/plain" style="width:100%;height:500px;"></script>
  </div>
</template>
<style>

</style>
<script>
  const UE = require('UE');// eslint-disable-line
  export default {
    name: 'editorView',
    data() {
      return {
        editor: null
      }
    },
    methods: {},
    mounted() {
      this.editor = UE.getEditor('editor')
    },
    destroyed() {
      this.editor.destroy()
    }
  }
</script>
