<template>
  <v-container>
    <v-row justify="space-around">
      <v-card width="100%">
        
         
        <v-card-text>
          <div class="font-weight-bold ml-8 mb-7">
            Recent Activity Feed
          </div>

          <v-timeline
            align-top
            dense
          >
            <v-timeline-item
              v-for="message in messages"
              :key="message.time"
              :color="message.color"
              small
            >
              <div>
                <div class="font-weight-normal">
                  <strong>{{ message.from }}</strong> @{{ message.time }}
                </div>
                <div>{{ message.message }}</div>
              </div>
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<style></style>
<script lang="ts" src="./feed.ts">

</script>