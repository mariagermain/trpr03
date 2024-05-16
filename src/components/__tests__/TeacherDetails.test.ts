import TeacherDetails from '../TeacherDetails.vue'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import { defineComponent } from 'vue';
import { getTeacher, getUsers, networkError } from "../../../tests/mocks/AppServiceMock";
import { createPinia, setActivePinia } from "pinia";
import { setupServer } from 'msw/node';

const apiServer = setupServer(...getTeacher);
/*
beforeAll(() => apiServer.listen({onUnhandledRequest: 'error'}));
beforeEach(() => {setActivePinia(createPinia())}) // Comme notre composant utilise un store, on doit l'initialiser ici. (equivalent de ce qui se trouve dans main.ts)
afterAll(() => apiServer.close());
afterEach(() => {
    apiServer.resetHandlers();
})*/

const testComponent = defineComponent({
    components: { TeacherDetails },
    template : '<Suspense><TeacherDetails/></Suspense>'
})

describe ('TeacherDetails', () => {

    it('Doit afficher les infos du prof.', async () => {
        // Arrange - Act
        const wrapper = mount(testComponent);
        await flushPromises();
        wrapper.findComponent(TeacherDetails).vm.teacher = { id : 1, email : "test@test.com", name : "name", life : 4}

        // Assert
        expect(wrapper.findComponent(TeacherDetails).text()).toContain('Nom: ');
        expect(wrapper.findComponent(TeacherDetails).text()).toContain('Courriel: ');
        expect(wrapper.findComponent(TeacherDetails).text()).toContain('Vie: ');
    })

    it('Doit emit add-life lorsque le bouton est clické', async () => {
        // Arrange 
        const wrapper = mount(testComponent);

        // Act
        await wrapper.findComponent(testComponent).find('#add-life').trigger('click')

        // Assert
        expect(wrapper.findComponent(testComponent).emitted('add-life')).toBeTruthy();
    })

    it('Doit emit supp-life lorsque le bouton est clické', async () => {
        // Arrange 
        const wrapper = mount(testComponent);

        // Act
        await wrapper.findComponent(testComponent).find('#supp-life').trigger('click')

        // Assert
        expect(wrapper.findComponent(testComponent).emitted('supp-life')).toBeTruthy();
    })
})