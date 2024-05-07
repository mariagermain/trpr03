import { describe, expect, it } from "vitest";
import { defineComponent } from "vue";
import QuestionDetails from '../QuestionDetails.vue'
import { flushPromises, mount } from "@vue/test-utils";

const testComponent = defineComponent({
    components: { QuestionDetails },
    template : '<Suspense><QuestionDetails :student="studentName" :question="value" :category="category" :priority="priority" /></Suspense>'
})

describe('QuestionDetails', () => {

    it('Doit afficher les détails de la question passé en props.', () => {
        // Arrange - Act
        const wrapper = mount(testComponent);
        // Assert
        expect(wrapper.findComponent(QuestionDetails)).toContain('studentName');
        expect(wrapper.findComponent(QuestionDetails)).toContain('value');
        expect(wrapper.findComponent(QuestionDetails)).toContain('category');
        expect(wrapper.findComponent(QuestionDetails)).toContain('priority');
    })

    it('Doit emit delete-question lorsque le bouton est cliqué.', async () => {
        // Arrange 
        const wrapper = mount(testComponent);
        await flushPromises();
        const button = wrapper.find('button[type="button"]');

        // Act 
        await button.trigger('click')

        // Assert
        expect(wrapper.findComponent(QuestionDetails).emitted('delete-question')).toBeTruthy();
    })

})