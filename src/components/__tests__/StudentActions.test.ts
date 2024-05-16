import { flushPromises, mount } from "@vue/test-utils";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest";
import StudentActions from '../StudentActions.vue'
import { defineComponent } from "vue";
import { createPinia, setActivePinia } from "pinia";
import { setupServer } from "msw/node";
import { getQuestions } from "../../../tests/mocks/AppServiceMock";

const apiServer = setupServer(...getQuestions);

const testComponent = defineComponent({
    components: { StudentActions },
    template : '<Suspense><StudentActions/></Suspense>'
})

beforeAll(() => apiServer.listen({onUnhandledRequest: 'error'}));
beforeEach(() => {setActivePinia(createPinia())}) // Comme notre composant utilise un store, on doit l'initialiser ici. (equivalent de ce qui se trouve dans main.ts)
afterAll(() => apiServer.close());
afterEach(() => {
    apiServer.resetHandlers();
})

describe ('StudentActions', () => {

    it('Doit afficher les questions des étudiants dans la classe.', async () => {
        // Arrange - Act
        const wrapper = mount(testComponent);
        await flushPromises();

        // Assert
        expect(wrapper.findComponent(StudentActions).findAll('#question').length).toBe(2);
    })

    it('Doit emit write-question lorsque le bouton est clické', async () => {
        // Arrange 
        const wrapper = mount(testComponent);
        await flushPromises();

        // Act
        wrapper.find('#write-question').trigger('click')

        // Assert
        expect(wrapper.findComponent(StudentActions).emitted('write-question')).toBeTruthy();
    })
})