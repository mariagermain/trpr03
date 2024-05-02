import { defineComponent } from "vue";
import QuestionForm from '../QuestionForm.vue'
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";

import { setupServer } from "msw/node"
import { getCategories, networkError } from "../../../tests/mocks/AppServiceMock";
import { categories } from "tests/data/categories";

const testComponent = defineComponent({
    components: { QuestionForm },
    template : '<Suspense><AccueilForm/></Suspense>'
})

const apiServer = setupServer(...getCategories);

beforeAll(() => apiServer.listen({onUnhandledRequest: 'error'}));
afterAll(() => apiServer.close());
afterEach(() => {
    apiServer.resetHandlers();
})


describe('QuestionForm', () => {

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
        expect(wrapper.findAll('option').length).toBe(categories.length);
        expect(wrapper.text()).toContain(categories[0].name);
        expect(wrapper.text()).toContain(categories[1].name);
        expect(wrapper.text()).toContain(categories[2].name);
    })

    it('Doit emit submit-question si le formulaire de question est bien rempli.', async () => {
        // Arrange
        const ANY_QUESTION = "question";
        const ANY_CATEGORY = categories[0];
        const wrapper = mount(testComponent)
        await flushPromises();
        await wrapper.find('textarea').setValue(ANY_QUESTION) //on met une valeur dans le input du username
        await wrapper.findComponent(QuestionForm).find('select').setValue(ANY_CATEGORY) // on force une valeur de ship au select
        const button = wrapper.findComponent(QuestionForm).find('button[type="button"]');

        // Act
        await button.trigger('click') 

        // Assert
        expect(wrapper.findComponent(QuestionForm).emitted('submit-question')).toBeTruthy();
    })

    it('Doit afficher une erreur si le champ de question est vide lors du click sur le bouton.', async() => {
      // Arrange
      const ANY_CATEGORY = categories[0];
      const wrapper = mount(testComponent)
      await flushPromises();
      wrapper.find('select').setValue(ANY_CATEGORY) // on force une valeur de ship au select
      const button = wrapper.findComponent(QuestionForm).find('button[type="button"]');
      // Act
      await button.trigger('click')

      // Assert
      expect(wrapper.text()).toContain('La question ne peut pas être vide.');
    })

    it('Doit afficher une erreur si aucune catégorie est selectionné lors du click sur le bouton.', async() => {
      // Arrange
      const ANY_QUESTION = "question";
      const wrapper = mount(testComponent)
      await flushPromises();
      wrapper.find('textarea').setValue(ANY_QUESTION) //on met une valeur dans le input du username
      const button = wrapper.findComponent(QuestionForm).find('button[type="button"]');

      // Act
      await button.trigger('click')

      // Assert
      expect(wrapper.text()).toContain('Veuillez choisir une catégorie.');
    })

    it('Doit afficher les erreurs si aucune question est entré et aucune catégorie est selectionnée lors du click sur le bouton.', async() => {
        // Arrange
        const wrapper = mount(testComponent)
        await flushPromises();
        const button = wrapper.findComponent(QuestionForm).find('button[type="button"]');
  
        // Act
        await button.trigger('click')
  
        // Assert
        expect(wrapper.text()).toContain('La question ne peut pas être vide.');
        expect(wrapper.text()).toContain('Veuillez choisir une catégorie.');
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