import { mount } from '@vue/test-utils';
import NestedComponent from './src/package/components/NestedComponent.tsx';

const data = { name: 'test' };
const wrapper = mount(NestedComponent, {
  props: {
    data,
    level: 1,
    parentKey: 'obj',
    darkMode: true,
    expanded: false,
  },
});

console.log('Initial expanded:', wrapper.vm.expanded);
console.log(
  'Toggle elements found:',
  wrapper.findAll('.cursor-pointer').length,
);
console.log('Component HTML:', wrapper.html());

const toggleButton = wrapper.find('.cursor-pointer');
console.log('Toggle button exists:', toggleButton.exists());

await toggleButton.trigger('click');
console.log('After click expanded:', wrapper.vm.expanded);
