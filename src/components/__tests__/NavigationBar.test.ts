import { vi, describe, it, expect } from 'vitest'

import NavigationBar from '../NavigationBar.vue'
import { defineComponent } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { useAuthStore } from '@/stores/authStore'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '@/router/routes'
import { useProfileStore } from '@/stores/profileStore'

const router = createRouter({
  history: createWebHistory(),
  routes : routes
})


const testComponent = defineComponent({
  components: { NavigationBar },
  template : '<Suspense><NavigationBar/></Suspense>'
})

describe('NavigationBar', () => {
  describe('utilisateur non connecté', () => {
    it ("Doit afficher l'option 'connection'",async() => {
      // Arrange - Act
      router.push('/') // S'assurer de commencer avec une route connue
      await router.isReady() // Attendre que le routeur soit prêt

      const wrapper = mount(testComponent,{
        global:{
            plugins:[createTestingPinia({createSpy:vi.fn}),router]
        }})

        const authStore = useAuthStore()
        //@ts-expect-error: Getter is read only 
        authStore.isLoggedIn = false  // typescript indique une erreur si on n'ajoute pas le commentaire du dessus.
        await flushPromises()
        // Assert
        expect(wrapper.findComponent(NavigationBar).text()).toContain('Connexion')

    })
  })
  describe('utilisateur connecté en tant que prof', () => {
    it ("Doit afficher la page 'Espace prof' et 'Paramètre du compte'", async ()=> {
            // Arrange - Act
            router.push('/') // S'assurer de commencer avec une route connue
            await router.isReady() // Attendre que le routeur soit prêt
      
            const wrapper = mount(testComponent,{
              global:{
                  plugins:[createTestingPinia({createSpy:vi.fn}),router]
              }})
      
              const authStore = useAuthStore()
              //@ts-expect-error: Getter is read only 
              authStore.isLoggedIn = true  // typescript indique une erreur si on n'ajoute pas le commentaire du dessus.
              
              const profileStore = useProfileStore()
              profileStore.role = 1 // pour être prof
              await flushPromises()
              // Assert
              console.log("\n SITE : \n" + wrapper.findComponent(NavigationBar).text())
              expect(wrapper.findComponent(NavigationBar).text()).toContain('Espace prof')
              expect(wrapper.findComponent(NavigationBar).text()).toContain('Paramètre du compte')
    })
  })

  describe("utilisateur connecté en tant qu'étudiant", () => {
    it ("Doit afficher la page 'Espace étudiant' et 'Paramètre du compte'", async () => {
                  // Arrange - Act
            router.push('/') // S'assurer de commencer avec une route connue
            await router.isReady() // Attendre que le routeur soit prêt
      
            const wrapper = mount(testComponent,{
              global:{
                  plugins:[createTestingPinia({createSpy:vi.fn}),router]
              }})
      
              const authStore = useAuthStore()
              //@ts-expect-error: Getter is read only 
              authStore.isLoggedIn = true  // typescript indique une erreur si on n'ajoute pas le commentaire du dessus.
              
              const profileStore = useProfileStore()
              profileStore.role = 2 // pour être étudiant
              await flushPromises()
              // Assert
              console.log("\n SITE : \n" + wrapper.findComponent(NavigationBar).text())
              expect(wrapper.findComponent(NavigationBar).text()).toContain('Espace étudiant')
              expect(wrapper.findComponent(NavigationBar).text()).toContain('Paramètre du compte')
    })
  })

  describe("utilisateur connecté", () => {
    it ("Doit afficher le boutton 'Se déconnecter'", async() =>{
                        // Arrange - Act
            router.push('/') // S'assurer de commencer avec une route connue
            await router.isReady() // Attendre que le routeur soit prêt
      
            const wrapper = mount(testComponent,{
              global:{
                  plugins:[createTestingPinia({createSpy:vi.fn}),router]
              }})
      
              const authStore = useAuthStore()
              //@ts-expect-error: Getter is read only 
              authStore.isLoggedIn = true  // typescript indique une erreur si on n'ajoute pas le commentaire du dessus.
              
              await flushPromises()
              // Assert
              console.log("\n SITE : \n" + wrapper.findComponent(NavigationBar).text())
              expect(wrapper.findComponent(NavigationBar).text()).toContain('Se déconnecter')
    })
  })
})
