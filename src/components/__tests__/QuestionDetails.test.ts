import { describe, expect, it } from "vitest";
import QuestionDetails from '../QuestionDetails.vue'
import { flushPromises, mount } from "@vue/test-utils";

const ANY_STUDENT = "student"
const ANY_QUESTION = "question"
const ANY_CATEGORY = "exercice"
const ANY_PRIORITY = "p3"

const ANY_PROPS = {
    isLoading:false,
    student:ANY_STUDENT,
    question:ANY_QUESTION, 
    category:ANY_CATEGORY, 
    priority:ANY_PRIORITY 
}

describe('QuestionDetails', () => {

    it('Doit afficher les détails de la question passé en props.', () => {
        // Arrange - Act
        const wrapper = mount(QuestionDetails,{props:ANY_PROPS});

        // Assert
        expect(wrapper.text()).toContain(ANY_PROPS.student);
        expect(wrapper.text()).toContain(ANY_PROPS.question);
        expect(wrapper.text()).toContain(ANY_PROPS.category);
        expect(wrapper.text()).toContain(ANY_PROPS.priority);
    })

    it('Doit emit delete-question lorsque le bouton est cliqué.', async () => {
        // Arrange 
        const wrapper = mount(QuestionDetails, {props:ANY_PROPS});
        await flushPromises();
        const button = wrapper.find('button[type="button"]');

        // Act 
        await button.trigger('click')

        // Assert
        expect(wrapper.findComponent(QuestionDetails).emitted('delete-question')).toBeTruthy();
    })

})