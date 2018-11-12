<template>
  <div class="todo">
    Todo: {{name}}
  </div>
</template>

<script>
export default {
  props: {
    name: String
  }
};
</script>

<style>
.todo {
  background-color: lightyellow;
  border: 1px solid rgba(0, 0, 0, .1);
  display: block;
  padding: 15px;
}
</style>
