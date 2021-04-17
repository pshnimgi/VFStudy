<template>
    <!-- dark mode footer & position is bottom absolutely -->
    <v-footer app color="primary" dark absolute :footer="footer">
      <v-spacer></v-spacer>
      <div>
        {{new Date().getFullYear() + ' ' + footer }}
      </div>
    </v-footer>
</template>

<script>
export default {
  props: ['footer']
}
</script>
