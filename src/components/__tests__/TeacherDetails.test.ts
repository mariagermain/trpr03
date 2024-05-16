import TeacherDetails from '../TeacherDetails.vue'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import { defineComponent } from 'vue';
import { getTeacher,getUsers, networkError, putUserStats0 } from "../../../tests/mocks/AppServiceMock";
import { createPinia, setActivePinia } from "pinia";
import { setupServer } from 'msw/node';
import { createTestingPinia } from '@pinia/testing';
import { useUserStore } from '@/stores/userStore';

const apiServer = setupServer(...getTeacher);

beforeAll(() => apiServer.listen({onUnhandledRequest: 'error'}));
afterAll(() => apiServer.close());
afterEach(() => {
    apiServer.resetHandlers();
})

const testComponent = defineComponent({
    components: { TeacherDetails },
    template : '<Suspense><TeacherDetails/></Suspense>'
})

describe ('TeacherDetails', () => {

    it('Doit afficher les infos du prof.', async () => {
        // Arrange - Act
        const wrapper = mount(testComponent,{
            global:{
                plugins:[createTestingPinia({createSpy:vi.fn,stubActions:false})] // pour utiliser pinia, il faut ajouter ce plugin !
            }});
            
        await flushPromises();
        wrapper.findComponent(TeacherDetails).vm.teacher = { id : 1, email : "test@test.com", name : "name", life : 4}

        // Assert
        expect(wrapper.findComponent(TeacherDetails).text()).toContain('Nom: ');
        expect(wrapper.findComponent(TeacherDetails).text()).toContain('Courriel: ');
        expect(wrapper.findComponent(TeacherDetails).text()).toContain('Vie: ');
    })

    it('Doit ajouter de la vie lorsque le bouton est cliqué.', async () => {
        // Arrange 
        const wrapper = mount(testComponent,{
            global:{
                plugins:[createTestingPinia({createSpy:vi.fn})]
            }});
        
        const userStore = useUserStore()
        userStore.teacher = {id:1, email: "test@test.com",name: "name",life: 6} // creation d'un teacher dans le store.

        await flushPromises()

        // Act
        console.log("\n PAGE : \n" + wrapper.html())
        await wrapper.findComponent(TeacherDetails).find('#add-life').trigger('click')

        // Assert
        expect(userStore.addLifeToUser).toBeCalledWith(1,7) // Vérification que la méthode a été appelée.
    })

    it('Doit enlevé de la vie si le boutton est cliqué.', async () => {
        // Arrange 
        const wrapper = mount(testComponent,{
            global:{
                plugins:[createTestingPinia({createSpy:vi.fn})]
            }});

        const userStore = useUserStore()
        userStore.teacher = {id:1, email: "test@test.com",name: "name",life: 6} // creation d'un teacher dans le store.

        await flushPromises()
        // Act
        await wrapper.findComponent(testComponent).find('#supp-life').trigger('click')

        // Assert
        expect(userStore.addLifeToUser).toBeCalledWith(1,5)
    })
})