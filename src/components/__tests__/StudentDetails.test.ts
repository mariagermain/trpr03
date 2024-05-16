import { describe, expect, it } from 'vitest';
import StudentDetails from '../StudentDetails.vue'
import { flushPromises, mount } from '@vue/test-utils';
import { defineComponent } from 'vue';


const testComponent = defineComponent({
    components: { StudentDetails },
    template : '<Suspense><StudentDetails :name="name" :email="email" :life="1"/></Suspense>'
})

describe ('StudentDetails', () => {

    it('Doit afficher les infos de létudiant.', async () => {
        // Arrange - Act
        const wrapper = mount(StudentDetails, {props:{name:"name", email:"email", life:2, deleteIsLoading:false, manageLifeIsLoading:true}});
        await flushPromises();

        // Assert
        expect(wrapper.findComponent(StudentDetails).text()).toContain('Nom: name');
        expect(wrapper.findComponent(StudentDetails).text()).toContain('Courriel: email');
        expect(wrapper.findComponent(StudentDetails).text()).toContain('Vie: ');
        expect(wrapper.findComponent(StudentDetails).findAll('img').length).toBe(2);
    })

    it('Doit emit delete-student lorsque le bouton est clické', async () => {
        // Arrange 
        const wrapper = mount(testComponent);

        // Act
        await wrapper.findComponent(StudentDetails).find('#delete-student').trigger('click')

        // Assert
        expect(wrapper.findComponent(StudentDetails).emitted('delete-student')).toBeTruthy();
    })

    it('Doit emit add-life lorsque le bouton est clické', async () => {
        // Arrange 
        const wrapper = mount(testComponent);

        // Act
        await wrapper.findComponent(StudentDetails).find('#add-life').trigger('click')

        // Assert
        expect(wrapper.findComponent(StudentDetails).emitted('add-life')).toBeTruthy();
    })

    it('Doit emit supp-life lorsque le bouton est clické', async () => {
        // Arrange 
        const wrapper = mount(testComponent);

        // Act
        await wrapper.findComponent(StudentDetails).find('#supp-life').trigger('click')

        // Assert
        expect(wrapper.findComponent(StudentDetails).emitted('supp-life')).toBeTruthy();
    })
})