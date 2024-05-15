import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import StudentActions from '../StudentActions.vue'


describe ('StudentActions', () => {

    it('Doit afficher les questions des étudiants dans la classe.', () => {
        // Arrange - Act
        const wrapper = mount(StudentActions);

        // Assert
        expect(wrapper.findAll('li').length).toBe(2);
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