import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import StudentActions from '../StudentActions.vue'


describe ('StudentActions', () => {

    it('Doit avoir trois bouttons disponnibles.', () => {
        // Arrange - Act
        const wrapper = mount(StudentActions);

        // Assert
        expect(wrapper.findAll('button').length).toBe(3);
    })

    it('Doit emit raise-hand lorsque le bouton est clické', () => {
        // Arrange 
        const wrapper = mount(StudentActions);

        // Act
        wrapper.find('#raise-hand').trigger('click')

        // Assert
        expect(wrapper.findComponent(StudentActions).emitted('raise-hand')).toBeTruthy();
    })
    it('Doit emit drop-hand lorsque le bouton est clické', () => {
        // Arrange 
        const wrapper = mount(StudentActions);

        // Act
        wrapper.find('#drop-hand').trigger('click')

        // Assert
        expect(wrapper.findComponent(StudentActions).emitted('drop-hand')).toBeTruthy();
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