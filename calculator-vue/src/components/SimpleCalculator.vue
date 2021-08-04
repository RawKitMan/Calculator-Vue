<template>
  <BCard :header="calcTitle">
    <BCardBody>
      <BAlert
        :show="dismissCountDown"
        @dismissed="dismissCountDown = 0"
        @dismiss-count-down="countDownChanged"
        variant="danger"
        >{{ alertMsg }}</BAlert
      >
      <BFormInput v-model="value" placeholder="0" type="number" />
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
        <BRow class="mt-3">
          <BCol>
            <BRow>
              <BCol>
                <label for="prevValue">Enter value n between 1-10</label>
                <BFormInput
                  id="prevValue"
                  v-model="prevValueIndex"
                  type="text"
                  :disabled="noResultsCalculated"
                  placeholder="0"
                />
              </BCol>
              <BCol class="mt-4">
                <BButton
                  @click="getPreviousResult(prevValueIndex)"
                  :disabled="noResultsCalculated"
                  >Get nth Previous Result</BButton
                >
              </BCol>
            </BRow>
          </BCol>
        </BRow>
      </BContainer>
    </BCardBody>
  </BCard>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import {
  BCard,
  BButtonGroup,
  BFormInput,
  BContainer,
  BAlert,
} from "bootstrap-vue";

@Component<SimpleCalculator>({
  components: {
    BCard,
    BButtonGroup,
    BFormInput,
    BContainer,
    BAlert,
  },
})
export default class SimpleCalculator extends Vue {
  private value: string = "";
  private left: number = 0;
  private operator: string = "";
  private reset: boolean = true;
  private prevValueIndex: string = "";

  private dismissTime = 3;
  private dismissCountDown = 0;
  private alertMsg = "";

  private prevValues: string[] = [];

  private get calcTitle() {
    return "Simple Calculator";
  }

  private get noResultsCalculated() {
    return this.prevValues.length === 0;
  }

  private enterValue(e: any) {
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
    console.log("handleInput", input);
    switch (input) {
      case "C":
        this.left = 0;
        this.value = "0";
        this.operator = "";
        this.reset = true;
        break;
      case "=":
        this.calculate();
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
          this.setInput(input);
          this.reset = true;
        }
        break;
    }
  }

  private setInput(input: string) {
    this.operator = input;
  }

  private calculate() {
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
    this.prevValues.push(this.value);
    if (this.prevValues.length > 11) {
      this.prevValues.pop();
    }
  }

  private getPreviousResult(index: any) {
    if (
      isNaN(index) ||
      parseInt(index, 10) < 1 ||
      parseInt(index, 10) > 10 ||
      parseInt(index, 10) > this.prevValues.length
    ) {
      this.prevValueIndex = "";
      this.showError();
      return false;
    }
    this.resetCalculator();
    this.value = this.prevValues[parseInt(index, 10) - 1];
  }

  private showError() {
    this.dismissCountDown = this.dismissTime;
    this.alertMsg = "ERROR: Invalid index";
  }
  private countDownChanged(value: any) {
    this.dismissCountDown = value;
  }
  private resetCalculator() {
    this.left = 0;
    this.value = "0";
    this.operator = "";
    this.reset = true;
    this.prevValueIndex = "";
  }
}
</script>

<style lang="scss" scoped>
</style>