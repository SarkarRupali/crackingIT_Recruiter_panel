<template>
  <v-simple-table>
    <template v-slot:default>
      <tbody>
        <tr
          v-for="item in subjects"
          :key="item.sub_name"
        > 
          <td><v-icon>{{ item.icon }}</v-icon></td>
          <td>{{ item.sub_name }}</td>
          <td>
            <v-progress-linear
              color="deep-purple accent-4"
              value="60"
              rounded
              height="6"
            ></v-progress-linear>   
          </td>
          <td>{{ item.percentage }}%</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<style></style>
<script lang="ts" src="./subjectTable.ts">

</script>