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
      <BFormInput
        v-model="value"
        placeholder="Enter equation here"
        type="text"
      />
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

@Component<HarderCalculator>({
  components: {
    BCard,
    BButtonGroup,
    BFormInput,
    BContainer,
    BAlert,
  },
})
export default class HarderCalculator extends Vue {
  private value = "";
  private operators: string[] = [];
  private reset: boolean = true;
  private operatorRegex: RegExp = /[-+*/]/;
  private output: any[] = [];
  private prevResults: string[] = [];

  private alertMsg: string = "";
  private dismissCountDown: number = 0;
  private dismissTime = 3;

  private precedence: object = {
    "*": 2,
    "/": 2,
    "+": 1,
    "-": 1,
  };

  private enterValue(e: any) {
    if (this.reset) {
      this.reset = false;
      this.value = "";
    }

    const input = e.target.value;

    if (input === "=") {
      this.calculate();
    } else {
      this.value += input.match(this.operatorRegex) ? ` ${input} ` : input;
    }

    switch (input) {
      case "C":
        this.value = "";
        this.output = [];
        this.operators = [];
        this.reset = true;
        break;
      case "=":
        this.calculate();
        break;
      case "+/-":
        this.togglePosNegOperand();
        break;
      default:
        this.value += input;
        break;
    }
  }

  private togglePosNegOperand() {
    console.log("togglePostNegOperand");
  }

  private calculate() {
    // Take operator and number arrays and perform order of operations.
    // parse equation one by one
    this.value.split(" ").forEach((x: any) => {
      if (x.match(this.operatorRegex)) {
        if (this.operators.length) {
          if (this.operators[0] === "*" || this.operators[0] === "/") {
            const left = this.output.pop();
            const right = this.output.pop();

            switch (this.operators[0]) {
              case "*":
                this.output.push(left * right);
                break;
              case "/":
                if (right !== 0) {
                  this.output.push(left / right);
                } else {
                  this.showError("ERROR: Cannot divide by 0");
                  this.resetCalculator();
                  return false;
                }
                break;
            }
          }
          this.operators.pop();
        }
        this.operators.push(x);
      } else {
        if (isNaN(x)) {
          this.showError("ERROR: Not a valid number");
          this.resetCalculator();
          return false;
        }
        this.output.push(parseFloat(x));
      }
    });

    while (this.operators.length) {
      const left = this.output.pop();
      const right = this.output.pop();

      switch (this.operators[0]) {
        case "*":
          this.output.push(left * right);
          break;
        case "/":
          if (right !== 0) {
            this.output.push(left / right);
          } else {
            this.showError("ERROR: Cannot divide by 0");
            this.resetCalculator();
            return false;
          }
          break;
        case "+":
          this.output.push(left + right);
          break;
        case "-":
          this.output.push(left - right);
          break;
      }
      this.operators.pop();
    }

    if (this.operators.length) {
      this.showError("ERROR: Equation must start and end with a number");
      this.resetCalculator();
      return false;
    }

    this.value = this.output[0].toString();
    this.prevResults.push(this.value);
    this.reset = true;
    this.operators = [];
    this.output = [];
  }

  private showError(msg: string) {
    this.dismissCountDown = this.dismissTime;
    this.alertMsg = msg;
  }

  private resetCalculator() {
    this.value = "";
    this.output = [];
    this.operators = [];
    this.reset = true;
  }
}
</script>