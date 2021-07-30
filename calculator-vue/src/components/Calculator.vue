<template>
  <div>
    <BContainer fluid="md" class="bg-info">
      <BRow>
        <BCol />
        <BCol>
          <SimpleCalculator v-if="isSimple" />
          <HarderCalculator v-else />
        </BCol>
        <BCol />
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
