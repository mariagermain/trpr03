import { describe, expect, it } from "vitest";
import TeacherActions from '../TeacherActions.vue'
import { mount } from "@vue/test-utils";

describe ('TeacherActions', () => {

    it('Doit avoir quatre boutons disponibles.', () => {
        // Arrange - Act
        const wrapper = mount(TeacherActions);

        // Assert
        expect(wrapper.findAll('button').length).toBe(4);
    })

    it('Doit emit add-student lorsque le bouton est cliqué', () => {
        // Arrange 
        const wrapper = mount(TeacherActions);

        // Act
        wrapper.find('#add-student').trigger('click')

        // Assert
        expect(wrapper.findComponent(TeacherActions).emitted('add-student')).toBeTruthy();
    })
    it('Doit emit delete-student lorsque le bouton est cliqué', () => {
        // Arrange 
        const wrapper = mount(TeacherActions);

        // Act
        wrapper.find('#delete-student').trigger('click')

        // Assert
        expect(wrapper.findComponent(TeacherActions).emitted('delete-student')).toBeTruthy();
    })
    it('Doit emit see-questions lorsque le bouton est cliqué', () => {
        // Arrange 
        const wrapper = mount(TeacherActions);

        // Act
        wrapper.find('#see-questions').trigger('click')

        // Assert
        expect(wrapper.findComponent(TeacherActions).emitted('see-questions')).toBeTruthy();
    })

    
    it('Doit emit create-question-category lorsque le bouton est cliqué', () => {
        // Arrange 
        const wrapper = mount(TeacherActions);

        // Act
        wrapper.find('#create-question-category').trigger('click')

        // Assert
        expect(wrapper.findComponent(TeacherActions).emitted('create-question-category')).toBeTruthy();
    })
})