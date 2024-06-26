import { createApp, defineComponent, nextTick, ref } from "vue";
import QuestionList from '../QuestionList.vue'
import QuestionDetails from '../QuestionDetails.vue'
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import { getQuestions } from "../../../tests/mocks/AppServiceMock";
import { setupServer } from "msw/node";
import { createTestingPinia } from "@pinia/testing"

const testComponent = defineComponent({
    components: { QuestionList },
    template : '<Suspense><QuestionList/></Suspense>'
})

const apiServer = setupServer(...getQuestions);

beforeAll(() => apiServer.listen({onUnhandledRequest: 'error'}));
afterAll(() => apiServer.close());
afterEach(() => {
    apiServer.resetHandlers();
})

describe('QuestionList', () => {

    it('Ne doit pas afficher le composant QuestionDetails si aucune question est sélectionnée.', () => {
        // Arrange - Act
        const wrapper = mount(QuestionList, {
            global:{
                plugins:[createTestingPinia({createSpy:vi.fn})] // pour utiliser pinia, il faut ajouter ce plugin !
            }});

        // Assert
        expect(wrapper.findComponent(QuestionDetails).exists()).toBeFalsy();
    })

    it('Doit afficher la liste de questions.', async () => {
        // Arrange 
        apiServer.use(getQuestions[0])
        const wrapper = mount(testComponent,{
            global:{
                plugins:[createTestingPinia({createSpy:vi.fn,stubActions:false})] // pour utiliser pinia, il faut ajouter ce plugin !
            }});

        await flushPromises();

        // Act
        await nextTick();

        // Assert
        expect(wrapper.findComponent(QuestionList).findAll('li').length).toBe(2);
    })

    it("Doit afficher le composant QuestionDetails lorsqu'une question est sélectionnée.", async () => {
        // Arrange 
        const wrapper = mount(testComponent,{
            global:{
                plugins:[createTestingPinia({createSpy:vi.fn,stubActions:false})] // pour utiliser pinia, il faut ajouter ce plugin !
            }});

        await flushPromises();
        let question = wrapper.findComponent(QuestionList).findAll('li')[0]

        // Act
        question.trigger('click')
        await flushPromises();

        // Assert
        expect(wrapper.findComponent(QuestionDetails).exists()).toBeTruthy();
        expect(wrapper.findComponent(QuestionDetails).text()).toContain('Théo Hautois');
        expect(wrapper.findComponent(QuestionDetails).text()).toContain('Travail Pratique');
    })

})