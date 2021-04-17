// Only one tag in template tag
<template>
    <toolbar-title>
        <!-- Page Title ######  -->
        {{ title }}
    </toolbar-title>
</template>

<script>
export default {
  props: ['title']
}
</script>
