<template>
  <BCard :header="calcTitle">
    <BCardBody>
      <BFormInput v-model="value" placeholder="0" type="text" />
      <BContainer>
        <BRow>
          <BCol>
            <div id="numbers">
              <div>
                <BButtonGroup class="mt-5" size="lg">
                  <BButton
                    class="btnSpace"
                    @click="enterValue($event)"
                    value="7"
                    >7</BButton
                  >
                  <BButton
                    class="btnSpace"
                    @click="enterValue($event)"
                    value="8"
                    >8</BButton
                  >
                  <BButton @click="enterValue($event)" value="9">9</BButton>
                </BButtonGroup>
              </div>
              <div>
                <BButtonGroup class="mt-2" size="lg">
                  <BButton
                    class="btnSpace"
                    @click="enterValue($event)"
                    value="4"
                    >4</BButton
                  >
                  <BButton
                    class="btnSpace"
                    @click="enterValue($event)"
                    value="5"
                    >5</BButton
                  >
                  <BButton @click="enterValue($event)" value="6">6</BButton>
                </BButtonGroup>
              </div>
              <div>
                <BButtonGroup class="mt-2" size="lg">
                  <BButton
                    class="btnSpace"
                    @click="enterValue($event)"
                    value="1"
                    >1</BButton
                  >
                  <BButton
                    class="btnSpace"
                    @click="enterValue($event)"
                    value="2"
                    >2</BButton
                  >
                  <BButton @click="enterValue($event)" value="3">3</BButton>
                </BButtonGroup>
              </div>
              <div>
                <BButtonGroup class="mt-2" size="lg">
                  <BButton
                    class="btnSpace"
                    @click="enterValue($event)"
                    value="+/-"
                    >+/-</BButton
                  >
                  <BButton
                    class="btnSpace"
                    @click="enterValue($event)"
                    value="0"
                    >0</BButton
                  >
                  <BButton @click="enterValue($event)" value=".">.</BButton>
                </BButtonGroup>
              </div>
            </div>
          </BCol>
          <BCol>
            <div id="operators">
              <BButtonGroup size="lg" class="mt-5" vertical>
                <BButton class="mb-2" @click="enterValue($event)" value="C"
                  >C</BButton
                >
                <BButton class="mb-2" @click="enterValue($event)" value="+"
                  >+</BButton
                >
                <BButton class="mb-2" @click="enterValue($event)" value="-"
                  >-</BButton
                >
                <BButton class="mb-2" @click="enterValue($event)" value="*"
                  >*</BButton
                >
                <BButton class="mb-2" @click="enterValue($event)" value="/"
                  >/</BButton
                >
                <BButton @click="enterValue($event)" value="=">=</BButton>
              </BButtonGroup>
            </div>
          </BCol>
        </BRow>
      </BContainer>
    </BCardBody>
  </BCard>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import { BCard, BButtonGroup, BFormInput, BContainer } from "bootstrap-vue";

@Component<SimpleCalculator>({
  components: {
    BCard,
    BButtonGroup,
    BFormInput,
    BContainer,
  },
})
export default class SimpleCalculator extends Vue {
  private value: string = "";
  private left: number = 0;
  private operator: string = "";
  private reset: boolean = true;

  private values: string[] = [];

  private get calcTitle() {
    return "Simple Calculator";
  }

  private enterValue(e: any) {
    // console.log(e.target.value);
    if (this.reset) {
      this.reset = false;
      this.value = "";
    }
    const input = e.target.value;
    if (isNaN(input)) {
      this.handleInput(input);
    } else {
      this.value += input;
    }
  }

  private handleInput(input: string) {
    switch (input) {
      case "C":
        this.left = 0;
        this.value = "0";
        this.operator = "";
        this.reset = true;
        break;
      case "=":
        this.getResult();
        this.left = 0;
        this.operator = "";
        this.reset = true;
        break;
      case ".":
        this.value += input;
        break;
      case "+/-":
        if (this.value) {
          this.value = (-parseFloat(this.value)).toString();
        }
        break;
      default:
        if (this.left === 0) {
          this.left = parseFloat(this.value);
          this.operator = input;
          this.reset = true;
        }
        break;
    }
  }

  private getResult() {
    switch (this.operator) {
      case "+":
        this.value = (this.left + parseFloat(this.value)).toString();
        break;
      case "-":
        this.value = (this.left - parseFloat(this.value)).toString();
        break;
      case "*":
        this.value = (this.left * parseFloat(this.value)).toString();
        break;
      case "/":
        this.value = (this.left / parseFloat(this.value)).toString();
        break;
    }
    this.values.push(this.value);
    if (this.values.length > 11) {
      this.values.pop();
    }
  }

  private getPreviousResult(index: number) {
    if (index < 1 || index > 10) {
      console.log("ERROR: Invalid index");
      return false;
    }
    this.resetCalculator();
    this.value = this.values[index + 1];
  }
  private resetCalculator() {
    this.left = 0;
    this.value = "0";
    this.operator = "";
    this.reset = true;
  }
}
</script>

<style lang="scss" scoped>
</style>