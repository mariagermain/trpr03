import { defineComponent } from "vue";
import QuestionForm from '../QuestionForm.vue'
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";

import { setupServer } from "msw/node"
import { getCategories, networkError } from "../../../tests/mocks/AppServiceMock";
import { categories } from "../../../tests/data/categories";

const testComponent = defineComponent({
    components: { QuestionForm },
    template : '<Suspense><QuestionForm/></Suspense>'
})

const apiServer = setupServer(...getCategories);

beforeAll(() => apiServer.listen({onUnhandledRequest: 'error'}));
afterAll(() => apiServer.close());
afterEach(() => {
    apiServer.resetHandlers();
})


describe('QuestionForm', () => {

    it('Doit afficher un input text pour le nom de létudiant.', () => {
        // Arrange - Act
        const wrapper = mount(QuestionForm);
        // Assert
        expect(wrapper.find('input[type="text"]')).toBeTruthy();
    })

    it('Doit afficher une zone de texte (textarea) pour la question.', () => {
        // Arrange - Act
        const wrapper = mount(QuestionForm);
        // Assert
        expect(wrapper.find('textarea')).toBeTruthy();
    })

    it('Doit afficher la liste des catégories disponibles.', async() => {
        // Arrange - Act
        const wrapper = mount(testComponent)
        await flushPromises();

        // Assert
        expect(wrapper.find('#select-category').findAll('option').length).toBe(categories.length);
        expect(wrapper.text()).toContain(categories[0].value);
        expect(wrapper.text()).toContain(categories[1].value);
        expect(wrapper.text()).toContain(categories[2].value);
    })

    it('Doit afficher la liste des priorités disponibles.', async() => {
        // Arrange - Act
        const wrapper = mount(testComponent)
        await flushPromises();

        // Assert
        expect(wrapper.find('#select-priority').findAll('option').length).toBe(5);
        expect(wrapper.text()).toContain('P1');
        expect(wrapper.text()).toContain('P2');
        expect(wrapper.text()).toContain('P3');
        expect(wrapper.text()).toContain('P4');
        expect(wrapper.text()).toContain('P5');
    })

    it('Doit emit submit-question si le formulaire de question est bien rempli.', async () => {
        // Arrange
        const ANY_CATEGORY = categories[0];
        const wrapper = mount(testComponent)
        await flushPromises();

        await wrapper.find('input[type="text"]').setValue("name") 
        await wrapper.find('textarea').setValue("question") 
        await wrapper.findComponent(QuestionForm).find('#select-category').setValue(ANY_CATEGORY) 
        await wrapper.findComponent(QuestionForm).find('#select-priority').setValue('P1') 

        const button = wrapper.findComponent(QuestionForm).find('button[type="button"]');

        // Act
        await button.trigger('click') 

        // Assert
        console.log(wrapper.html())
        expect(wrapper.findComponent(QuestionForm).emitted('submit-question')).toBeTruthy();
    })

    it('Doit afficher une erreur si le champ de nom de létudiant est vide lors du click sur le bouton.', async() => {
        // Arrange
        const ANY_CATEGORY = categories[0];
        const wrapper = mount(testComponent)
        await flushPromises();
  
        await wrapper.find('textarea').setValue("question") 
        await wrapper.findComponent(QuestionForm).find('#select-category').setValue(ANY_CATEGORY) 
        await wrapper.findComponent(QuestionForm).find('#select-priority').setValue('P1') 
        const button = wrapper.findComponent(QuestionForm).find('button[type="button"]');
        // Act
        await button.trigger('click')
  
        // Assert
        expect(wrapper.text()).toContain('Le nom ne peut pas être vide.');
      })

      
    it('Doit afficher une erreur si le champ de question est vide lors du click sur le bouton.', async() => {
      // Arrange
      const ANY_CATEGORY = categories[0];
      const wrapper = mount(testComponent)
      await flushPromises();

      await wrapper.find('input[type="text"]').setValue("name") 
      await wrapper.findComponent(QuestionForm).find('#select-category').setValue(ANY_CATEGORY) 
      await wrapper.findComponent(QuestionForm).find('#select-priority').setValue('P1') 
      const button = wrapper.findComponent(QuestionForm).find('button[type="button"]');
      // Act
      await button.trigger('click')

      // Assert
      console.log(wrapper.html())
      expect(wrapper.text()).toContain('La question ne peut pas être vide');
    })

    it('Doit afficher une erreur si aucune catégorie est selectionné lors du click sur le bouton.', async() => {
        // Arrange
        const wrapper = mount(testComponent)
        await flushPromises();

        await wrapper.find('input[type="text"]').setValue("name") 
        await wrapper.find('textarea').setValue("question") 
        await wrapper.findComponent(QuestionForm).find('#select-priority').setValue('P1') 
        const button = wrapper.findComponent(QuestionForm).find('button[type="button"]');

        // Act
        await button.trigger('click')

        // Assert
        expect(wrapper.text()).toContain('Veuillez choisir une catégorie.');
    })

    it('Doit afficher une erreur si aucune priorité est selectionné lors du click sur le bouton.', async() => {
        // Arrange
        const ANY_CATEGORY = categories[0];
        const wrapper = mount(testComponent)
        await flushPromises();
  
        await wrapper.find('input[type="text"]').setValue("name") 
        await wrapper.find('textarea').setValue("question") 
        await wrapper.findComponent(QuestionForm).find('#select-category').setValue(ANY_CATEGORY) 
        const button = wrapper.findComponent(QuestionForm).find('button[type="button"]');
  
        // Act
        await button.trigger('click')
  
        // Assert
        expect(wrapper.text()).toContain('Veuillez choisir une priorité.');
      })

    it('Doit afficher tous les erreurs lors du click sur le bouton.', async() => {
        // Arrange
        const wrapper = mount(testComponent)
        await flushPromises();
        const button = wrapper.findComponent(QuestionForm).find('button[type="button"]');
  
        // Act
        await button.trigger('click')
  
        // Assert
        expect(wrapper.text()).toContain('Le nom ne peut pas être vide.');
        expect(wrapper.text()).toContain('La question ne peut pas être vide.');
        expect(wrapper.text()).toContain('Veuillez choisir une catégorie.');
        expect(wrapper.text()).toContain('Veuillez choisir une priorité.');
    })

    it("Doit emit @loading-error si l'api ne répond pas.", async() => {
        // Arrange
        apiServer.use(networkError[0])

        // Act
        const wrapper = mount(testComponent);
        await flushPromises();

        // Assert
        expect(wrapper.findComponent(QuestionForm).emitted('loading-error')).toBeTruthy();
    })
})