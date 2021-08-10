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
      <BFormInput
        v-model="value"
        placeholder="Enter equation here"
        type="text"
        readonly
      />
      <BContainer>
        <BRow>
          <BCol>
            <div id="numbers">
              <div>
                <BButtonGroup class="mt-5" size="lg">
                  <BButton
                    class="border-danger bg-danger btnSpace"
                    @click="enterValue($event)"
                    value="7"
                    >7</BButton
                  >
                  <BButton
                    class="border-danger bg-danger btnSpace"
                    @click="enterValue($event)"
                    value="8"
                    >8</BButton
                  >
                  <BButton
                    class="border-danger bg-danger"
                    @click="enterValue($event)"
                    value="9"
                    >9</BButton
                  >
                </BButtonGroup>
              </div>
              <div>
                <BButtonGroup class="mt-2" size="lg">
                  <BButton
                    class="border-danger bg-danger btnSpace"
                    @click="enterValue($event)"
                    value="4"
                    >4</BButton
                  >
                  <BButton
                    class="border-danger bg-danger btnSpace"
                    @click="enterValue($event)"
                    value="5"
                    >5</BButton
                  >
                  <BButton
                    class="border-danger bg-danger"
                    @click="enterValue($event)"
                    value="6"
                    >6</BButton
                  >
                </BButtonGroup>
              </div>
              <div>
                <BButtonGroup class="mt-2" size="lg">
                  <BButton
                    class="border-danger bg-danger btnSpace"
                    @click="enterValue($event)"
                    value="1"
                    >1</BButton
                  >
                  <BButton
                    class="border-danger bg-danger btnSpace"
                    @click="enterValue($event)"
                    value="2"
                    >2</BButton
                  >
                  <BButton
                    class="border-danger bg-danger"
                    @click="enterValue($event)"
                    value="3"
                    >3</BButton
                  >
                </BButtonGroup>
              </div>
              <div>
                <BButtonGroup class="mt-2" size="lg">
                  <BButton
                    class="border-danger bg-danger btnSpace positiveNegative"
                    @click="enterValue($event)"
                    value="+/-"
                    >+/-</BButton
                  >
                  <BButton
                    class="border-danger bg-danger btnSpace"
                    @click="enterValue($event)"
                    value="0"
                    >0</BButton
                  >
                  <BButton
                    class="border-danger bg-danger"
                    @click="enterValue($event)"
                    value="."
                    >.</BButton
                  >
                </BButtonGroup>
              </div>
            </div>
          </BCol>
          <BCol>
            <div id="operators">
              <BButtonGroup size="lg" class="mt-5" vertical>
                <BButton
                  class="border-danger bg-danger mb-2"
                  @click="resetCalculator"
                  >C</BButton
                >
                <BButton
                  class="border-danger bg-danger mb-2"
                  @click="enterValue($event)"
                  value="+"
                  >+</BButton
                >
                <BButton
                  class="border-danger bg-danger mb-2"
                  @click="enterValue($event)"
                  value="-"
                  >-</BButton
                >
                <BButton
                  class="border-danger bg-danger mb-2"
                  @click="enterValue($event)"
                  value="*"
                  >*</BButton
                >
                <BButton
                  class="border-danger bg-danger mb-2"
                  @click="enterValue($event)"
                  value="/"
                  >/</BButton
                >
                <BButton
                  class="border-danger bg-danger"
                  @click="enterValue($event)"
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
                  class="border-danger bg-danger"
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
  BRow,
  BCol,
  BButton,
} from "bootstrap-vue";

@Component<HarderCalculator>({
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
export default class HarderCalculator extends Vue {
  private calcTitle = "Harder Calculator";
  private value = "";
  private operators: string[] = [];
  private reset: boolean = true;
  private operatorRegex: RegExp = /^[-+*/]$/g;
  private output: any[] = [];
  private prevResults: string[] = [];
  private prevValueIndex = "";
  private invalidEquation = false;
  private newNumberStartIndex: number = 0;

  private alertMsg: string = "";
  private dismissCountDown: number = 0;
  private dismissTime = 4;

  private get noResultsCalculated() {
    return this.prevResults.length === 0;
  }

  private enterValue(e: any) {
    if (this.reset) {
      this.reset = false;
      this.value = "";
    }

    const input = e.target.value;

    switch (input) {
      case "=":
        this.calculate();
        break;
      case "+/-":
        this.togglePosNegOperand();
        break;
      default:
        if (input.match(this.operatorRegex)) {
          this.value += ` ${input} `;
          this.newNumberStartIndex = this.value.length;
        } else {
          this.value += input;
        }
        break;
    }
  }

  private togglePosNegOperand() {
    if (this.value.length > 0) {
      if (this.value.length === 1 && this.value[0] === "-") {
        this.value = "";
      } else {
        const symbol = this.value[this.newNumberStartIndex];
        if (symbol === "-") {
          this.value =
            this.value.substring(0, this.newNumberStartIndex) +
            this.value.substring(this.newNumberStartIndex + 1);
        } else {
          this.value =
            this.value.substring(0, this.newNumberStartIndex) +
            "-" +
            this.value.substring(this.newNumberStartIndex);
        }
      }
    } else {
      this.value = "-";
    }
  }

  private calculate() {
    // Take operator and number arrays and perform order of operations.
    // parse equation one by one\

    this.value.split(" ").forEach((x: any) => {
      if (this.invalidEquation) {
        return;
      }
      if (x.match(this.operatorRegex)) {
        if (this.operators.length) {
          if (this.operators[0] === "*" || this.operators[0] === "/") {
            const right = this.output.shift();
            const left = this.output.shift();
            switch (this.operators[0]) {
              case "*":
                this.output.unshift(left * right);
                break;
              case "/":
                if (right !== 0) {
                  this.output.unshift(left / right);
                } else {
                  this.showError("ERROR: Cannot divide by 0");
                  this.invalidEquation = true;
                }
                break;
            }
            this.operators.shift();
          }
        }
        this.operators.unshift(x);
      } else {
        if (isNaN(x) || x === "") {
          this.showError("ERROR: Invalid equation");
          this.invalidEquation = true;
          return false;
        }

        this.output.unshift(parseFloat(x));
      }
    });

    if (this.operators.length > 0 && this.output.length < 2) {
      this.invalidEquation = true;
    }

    while (this.operators.length && !this.invalidEquation) {
      const right = this.output.shift();
      const left = this.output.shift();

      switch (this.operators[0]) {
        case "*":
          this.output.unshift(left * right);
          break;
        case "/":
          if (right !== 0) {
            this.output.unshift(left / right);
          } else {
            this.showError("ERROR: Cannot divide by 0");
            this.invalidEquation = true;
            return false;
          }
          break;
        case "+":
          this.output.unshift(left + right);
          break;
        case "-":
          this.output.unshift(left - right);
          break;
      }
      this.operators.shift();
    }

    if (this.invalidEquation) {
      this.showError("ERROR: Invalid equation");
      this.resetCalculator();
      return false;
    }

    this.value = this.output[0].toString();
    this.prevResults.unshift(this.value);

    if (this.prevResults.length > 10) {
      this.prevResults.pop();
    }

    this.reset = true;
    this.operators = [];
    this.output = [];
  }

  private showError(msg: string) {
    this.dismissCountDown = this.dismissTime;
    this.alertMsg = msg;
  }
  private countDownChanged(value: any) {
    this.dismissCountDown = value;
  }

  private resetCalculator() {
    this.value = "";
    this.output = [];
    this.operators = [];
    this.reset = true;
    this.invalidEquation = false;
    this.prevValueIndex = "";
    this.newNumberStartIndex = 0;
  }

  private getPreviousResult(index: any) {
    if (
      isNaN(index) ||
      parseInt(index, 10) < 1 ||
      parseInt(index, 10) > 10 ||
      parseInt(index, 10) > this.prevResults.length
    ) {
      this.prevValueIndex = "";
      this.showError("ERROR: Invalid index");
      return false;
    }
    this.resetCalculator();
    this.value = this.prevResults[parseInt(index, 10) - 1];
  }
}
</script>