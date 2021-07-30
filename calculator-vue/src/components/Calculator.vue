<template>
  <div>
    <BContainer fluid class="bg-info">
      <BRow>
        <BCol cols="3" />
        <BCol cols="6">
          <SimpleCalculator v-if="isSimple" />
          <HarderCalculator v-else />
        </BCol>
        <BCol cols="3" />
      </BRow>
    </BContainer>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import { BContainer } from "bootstrap-vue";

import SimpleCalculator from "@/components/SimpleCalculator.vue";
import HarderCalculator from "@/components/HarderCalculator.vue";

@Component<Calculator>({
  components: {
    BContainer,
    SimpleCalculator,
    HarderCalculator,
  },
})
export default class Calculator extends Vue {
  private get isSimple() {
    return true;
  }
}
</script>
