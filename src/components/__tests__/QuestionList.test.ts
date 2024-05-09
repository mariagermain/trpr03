import { defineComponent } from "vue";
import QuestionList from '../QuestionList.vue'
import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";



const testComponent = defineComponent({
    components: { QuestionList },
    template : '<Suspense><QuestionList/></Suspense>'
})

describe('QuestionList', () => {

    it('Doit afficher la liste que questions.', () => {

    })

    it('Ne doit pas afficher le composant QuestionDetails si aucune question est sélectionnée.', () => {

    })

    it('Doit afficher le composant QuestionDetails lorsqu une question est sélectionnée.', () => {

    })

    it('Ne doit pas afficher le composant QuestionDetails lorsque la question sélectionnée est supprimée.', () => {

    })

})