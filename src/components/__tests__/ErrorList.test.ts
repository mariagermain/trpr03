import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import ErrorList from '../ErrorList.vue'

describe('ErrorList', () => {
    it("Ne doit pas être visible s'il n'y a pas d'erreurs", () => {
        // Arrange - Act
        const ANY_TITLE:string = "TITLE";
        const ERRORS:string[] = [];
        const wrapper = mount(ErrorList, {props:{title:ANY_TITLE, errors : ERRORS}})

        // Assert
        expect(wrapper.find('div').exists()).toBeFalsy();
    })

    it("Doit être visible s'il y a au moins une erreur", () => {
        // Arrange - Act
        const ANY_TITLE:string = "TITLE";
        const ERRORS:Array<string> = ["Erreur 1", "Erreur 2"];
        const wrapper = mount(ErrorList, {props:{title:ANY_TITLE, errors : ERRORS}})

        // Assert
        expect(wrapper.find('div').exists()).toBeTruthy();
    })

    it("Doit affiher le titre de l'erreur", () => {
        // Arrange - Act
        const ANY_TITLE:string = "TITLE";
        const ERRORS:Array<string> = ["Erreur 1", "Erreur 2"];
        const wrapper = mount(ErrorList, {props:{title:ANY_TITLE, errors : ERRORS}})

        // Assert
        expect(wrapper.text()).contain(ANY_TITLE);
    })

    it("Doit afficher la liste des erreurs", () => {
        // Arrange - Act
        const ANY_TITLE:string = "TITLE";
        const ERRORS:Array<string> = ["Erreur 1", "Erreur 2"];
        const wrapper = mount(ErrorList, {props:{title:ANY_TITLE, errors : ERRORS}});

        // Assert
        expect(wrapper.find('ul').findAll('li').length).toBe(ERRORS.length);
        expect(wrapper.find('ul').text()).toContain(ERRORS[0])
        expect(wrapper.find('ul').text()).toContain(ERRORS[1])
    })
})