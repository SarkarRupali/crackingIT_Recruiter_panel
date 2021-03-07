<template>
  <!-- <v-data-table
    :headers="headers"
    :items="Students"
    :search="search"
    class="elevation-1"
  > -->
  <v-data-table
    :headers="headers"
    :items="sortByScore"
    class="elevation-1"
  >
    <template v-slot:[`item.Overall_Status`]="{ item }">
      <v-chip
        :color="getColor(item.Overall_Status)"
        dark
      >
        {{ item.Overall_Status }}
      </v-chip>
    </template>
  </v-data-table>
</template>

<style></style>
<script lang="ts" src="./table.ts">

</script>