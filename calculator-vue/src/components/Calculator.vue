<template>
  <div>
    <BContainer fluid class="bg-info calculator">
      <BRow>
        <BCol cols="3" class="mt-3"
          ><BButton @click="toggleCalcs">Switch</BButton>
        </BCol>
        <BCol cols="6" class="mt-3">
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
    // return this.isSimpleCalculator;
    return false;
  }

  private toggleCalcs() {
    this.isSimpleCalculator = !this.isSimpleCalculator;
  }
}
</script>

<style lang="scss" scoped>
.calculator {
  height: 100vh;
  min-width: 650px;
}
</style>
