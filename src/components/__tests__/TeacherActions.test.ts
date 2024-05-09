import { describe, expect, it } from "vitest";
import TeacherActions from '../TeacherActions.vue'
import { mount } from "@vue/test-utils";

describe ('TeacherActions', () => {

    it('Doit avoir trois boutons disponibles.', () => {
        // Arrange - Act
        const wrapper = mount(TeacherActions);

        // Assert
        expect(wrapper.findAll('button').length).toBe(3);
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

    it('Doit emit see-students lorsque le bouton est cliqué', () => {
        // Arrange 
        const wrapper = mount(TeacherActions);

        // Act
        wrapper.find('#see-students').trigger('click')

        // Assert
        expect(wrapper.findComponent(TeacherActions).emitted('see-students')).toBeTruthy();
    })
})