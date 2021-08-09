import { shallowMount } from '@vue/test-utils';
import SimpleCalculator from '@/components/SimpleCalculator.vue';

const wrapper = shallowMount(SimpleCalculator);
const wrapperVM = wrapper.vm as any;

describe('SimpleCalculator', () => {
  it('is a vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it('sets left value', () => {

    wrapper.setData({ left: 0, result: "45" });

    wrapperVM.handleInput("+");

    expect(wrapperVM.left).toBe(45);
    expect(wrapperVM.operator).toBe("+");
  });

  it('calculates sum via handleInput', () => {
    wrapper.setData({ left: 25, result: "45", operator: "+" });

    wrapperVM.handleInput("=");

    expect((wrapper.vm as any).result).toBe("70");
  });
});
