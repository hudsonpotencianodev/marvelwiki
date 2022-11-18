import { mount } from '@vue/test-utils'
import HomePage from '../pages/index.vue'

describe('HomePage', () => {
  test('have a home page', () => {
    const wrapper = mount(HomePage)
    expect(wrapper.vm).toBeTruthy()
  })
})
