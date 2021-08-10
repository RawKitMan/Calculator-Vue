<template>
  <BCard :header="calcTitle" class="calcCard">
    <BCardBody>
      <BAlert
        :show="dismissCountDown"
        @dismissed="dismissCountDown = 0"
        @dismiss-count-down="countDownChanged"
        variant="danger"
        >{{ alertMsg }}</BAlert
      >
      <BFormInput v-model="value" readonly placeholder="0" type="number" />
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
                <BButton class="mb-2" @click="resetCalculator">C</BButton>
                <BButton
                  class="mb-2 testPlusBtn"
                  @click="enterValue($event)"
                  value="+"
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
                <BButton
                  @click="enterValue($event)"
                  class="testEqualsBtn"
                  value="="
                  >=</BButton
                >
              </BButtonGroup>
            </div>
          </BCol>
        </BRow>
        <BRow class="mt-3">
          <BCol>
            <BRow>
              <BCol>
                <label class="prevValueLabel" for="prevValue"
                  >Enter value n between 1-10</label
                >
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
  BCardBody,
  BButtonGroup,
  BFormInput,
  BContainer,
  BAlert,
  BCol,
  BRow,
  BButton,
} from "bootstrap-vue";

@Component<SimpleCalculator>({
  components: {
    BCard,
    BCardBody,
    BButtonGroup,
    BFormInput,
    BContainer,
    BAlert,
    BRow,
    BCol,
    BButton,
  },
})
export default class SimpleCalculator extends Vue {
  public result: string = "";
  public left: number = 0;
  public operator: string = "";
  public reset: boolean = true;
  public prevValueIndex: string = "";

  public dismissTime = 3;
  public dismissCountDown = 0;
  public alertMsg = "";

  public prevValues: string[] = [];

  public get calcTitle() {
    return "Simple Calculator";
  }

  public get noResultsCalculated() {
    return this.prevValues.length === 0;
  }

  public enterValue(e: any) {
    const input = e.target.value;
    if (isNaN(input)) {
      this.handleInput(input);
    } else {
      if (this.reset) {
        this.reset = false;
        this.result = "";
      }
      if (parseInt(this.result) == 0) {
        this.result = input;
      } else {
        this.result += input;
      }
    }
  }

  public handleInput(input: string) {
    switch (input) {
      case "=":
        if (this.left && this.operator) {
          this.calculate();
          this.left = 0;
          this.operator = "";
          this.reset = true;
        }
        break;
      case ".":
        this.result += input;
        break;
      case "+/-":
        if (this.result) {
          this.result = (-parseFloat(this.result)).toString();
        }
        break;
      default:
        if (this.result && this.left === 0) {
          this.left = parseFloat(this.result);
          this.setOperator(input);
          this.reset = true;
        }
        break;
    }
  }

  public setOperator(input: string) {
    this.operator = input;
  }

  public calculate() {
    switch (this.operator) {
      case "+":
        this.result = (this.left + parseFloat(this.result)).toString();
        break;
      case "-":
        this.result = (this.left - parseFloat(this.result)).toString();
        break;
      case "*":
        this.result = (this.left * parseFloat(this.result)).toString();
        break;
      case "/":
        this.result = (this.left / parseFloat(this.result)).toString();
        break;
    }
    this.prevValues.unshift(this.result);
    if (this.prevValues.length > 10) {
      this.prevValues.pop();
    }
  }

  public getPreviousResult(index: any) {
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
    this.result = this.prevValues[parseInt(index, 10) - 1];
  }

  public showError() {
    this.dismissCountDown = this.dismissTime;
    this.alertMsg = "ERROR: Invalid index";
  }
  public countDownChanged(value: any) {
    this.dismissCountDown = value;
  }
  public resetCalculator() {
    this.left = 0;
    this.result = "0";
    this.operator = "";
    this.reset = true;
    this.prevValueIndex = "";
  }
}
</script>
