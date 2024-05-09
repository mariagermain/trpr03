import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import StudentActions from '../StudentActions.vue'


describe ('StudentActions', () => {

    it('Doit avoir un bouton disponnible.', () => {
        // Arrange - Act
        const wrapper = mount(StudentActions);

        // Assert
        expect(wrapper.findAll('button').length).toBe(1);
    })

    it('Doit emit write-question lorsque le bouton est clické', () => {
        // Arrange 
        const wrapper = mount(StudentActions);

        // Act
        wrapper.find('#write-question').trigger('click')

        // Assert
        expect(wrapper.findComponent(StudentActions).emitted('write-question')).toBeTruthy();
    })
})