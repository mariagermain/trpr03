import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import CategoryForm from "../CategoryForm.vue";


describe('CategoryForm', () => {

    it('Doit afficher une zone de texte pour la nouvelle catérogie.', () => {
        // Arrange - Act
        const wrapper = mount(CategoryForm);
        // Assert
        expect(wrapper.find('input[type=text]')).toBeTruthy();
    })

    it('Doit emit submit-category si le formulaire de catégorie est bien rempli.', async () => {
        // Arrange
        const wrapper = mount(CategoryForm)

        await wrapper.find('input[type=text]').setValue("nouvelle catégorie") 

        const button = wrapper.findComponent(CategoryForm).find('button[type="button"]');

        // Act
        await button.trigger('click') 

        // Assert
        expect(wrapper.findComponent(CategoryForm).emitted('submit-category')).toBeTruthy();
    })
})