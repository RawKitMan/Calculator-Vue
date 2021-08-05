<template>
  <div>
    <BContainer class="bg-info">
      <BRow>
        <BCol cols="3"><BButton @click="toggleCalcs">Switch</BButton> </BCol>
        <BCol cols="6">
          <SimpleCalculator v-if="isSimpleCalc" />
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

import { BContainer, BButton } from "bootstrap-vue";

import SimpleCalculator from "@/components/SimpleCalculator.vue";
import HarderCalculator from "@/components/HarderCalculator.vue";

@Component<Calculator>({
  components: {
    BContainer,
    BButton,
    SimpleCalculator,
    HarderCalculator,
  },
})
export default class Calculator extends Vue {
  private isSimpleCalculator: boolean = true;

  private get isSimpleCalc() {
    return this.isSimpleCalculator;
  }

  private toggleCalcs() {
    this.isSimpleCalculator = !this.isSimpleCalculator;
  }
}
</script>
