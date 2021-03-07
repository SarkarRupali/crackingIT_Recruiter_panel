<template>
  <v-dialog
    v-model="confirmDialog"
    :max-width="options.width"
    :style="{ zIndex: options.zIndex }"
    @keydown.esc="cancel"
  >
    <v-card>
      <v-toolbar dark :color="options.color" dense flat>
        <v-toolbar-title class="white--text">{{ title }}</v-toolbar-title>
      </v-toolbar>
      <v-card-text v-show="!!message" class="pa-4">{{ message }}</v-card-text>
      <v-card-actions class="pt-0">
        <v-spacer></v-spacer>
        <v-btn color="primary darken-1" text @click.native="agree">Yes</v-btn>
        <v-btn color="grey" text @click.native="cancel">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
@Component({})
export default class Confirm extends Vue {
  data() {
    return {
      confirmDialog: false,
      resolve: null,
      reject: null,
      message: null,
      title: null,
      options: {
        color: "primary",
        width: 290,
        zIndex: 200
      }
    };
  }

  agree() {
    //@ts-ignore
    this.resolve(true);
    //@ts-ignore
    this.confirmDialog = false;
  }

  cancel() {
    //@ts-ignore
    this.resolve(false);
    //@ts-ignore
    this.confirmDialog = false;
  }

  open(title, message, options) {
    //@ts-ignore
    this.confirmDialog = true;
    //@ts-ignore
    this.title = title;
    //@ts-ignore
    this.message = message;
    //@ts-ignore
    this.options = Object.assign(this.options, options);
    return new Promise((resolve, reject) => {
      //@ts-ignore
      this.resolve = resolve;
      //@ts-ignore
      this.reject = reject;
    });
  }
}
</script>
