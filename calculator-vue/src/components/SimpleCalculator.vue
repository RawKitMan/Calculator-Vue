<template>
  <BCard :header="calcTitle">
    <BCardBody>
      <BFormInput v-model="value" placeholder="Hi" type="text" />
      <div>
        <BButtonGroup class="mt-5" size="lg">
          <BButton @click="enterValue($event)" value="7">7</BButton>
          <BButton @click="enterValue($event)" value="8">8</BButton>
          <BButton @click="enterValue($event)" value="9">9</BButton>
        </BButtonGroup>
      </div>
      <div>
        <BButtonGroup class="mt-2" size="lg">
          <BButton @click="enterValue($event)" value="4">4</BButton>
          <BButton @click="enterValue($event)" value="5">5</BButton>
          <BButton @click="enterValue($event)" value="6">6</BButton>
        </BButtonGroup>
      </div>
      <div>
        <BButtonGroup class="mt-2" size="lg">
          <BButton @click="enterValue($event)" value="1">1</BButton>
          <BButton @click="enterValue($event)" value="2">2</BButton>
          <BButton @click="enterValue($event)" value="3">3</BButton>
        </BButtonGroup>
      </div>
      <div>
        <BButton class="mt-2" @click="enterValue($event)" value="0">0</BButton>
      </div>
    </BCardBody>
  </BCard>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import { BCard, BButtonGroup, BFormInput } from "bootstrap-vue";

@Component<SimpleCalculator>({
  components: {
    BCard,
    BButtonGroup,
    BFormInput,
  },
})
export default class SimpleCalculator extends Vue {
  private value = "";
  private get calcTitle() {
    return "Simple Calculator";
  }

  private enterValue(e: any) {
    console.log(e.target.value);
  }
}
</script>