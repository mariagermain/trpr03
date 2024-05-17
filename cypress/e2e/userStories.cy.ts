describe('Récits utilisateur - En tant que professeur', () => {

  // Exécuté avant chaque test
  beforeEach(() => {
    // On réinitialise la base de données en appelant le script backend:cypress:seed qui se trouve dans le package.json. Ce script copie le fichier db-cypress-default.json dans db-cypress.json qui est utilisé par le serveur backend. Ainsi, on a une base de données propre pour chaque test.
    cy.exec('npm run backend:cypress:seed')

  })

  // Les tests sont écrits sous forme de récits utilisateur. Voir les notes de cours à ce sujet.
  it("je peux accéder à la page d'accueil", () => {
    // Ici, on visite la page d'accueil.
    cy.visit('/')

    // On vérifie que la page contient, dans une balise H1, le texte "Accueil"
    cy.contains('h1', /accueil/i)
  })

  it('je peux accéder à la page à propos', () => {
    cy.visit('/about')

    cy.contains('h1', /à propos/i)
  })


  it('En tant que prof, je peux me connecter', () => {
    // Ici on utilise la commande login qui est définie dans le fichier cypress/support/commands.js. Cette commande est disponible dans tous les tests et évite de répéter le code de connexion. Cette version est plus courte et plus lisible.
    cy.login("test@test.com", "test")
  })

  it('En tant que prof, je peux me déconnecter', () => {
    cy.login("test@test.com", "test")

    cy.contains(/déconnecter/i).click()

    cy.contains(/connexion/i)
  })

  it('En tant que prof, je peux voir la vue de prof (TeacherView)', () => {
    cy.login("test@test.com", "test")
    cy.visit('/teacher')
    cy.get('button').contains('Voir les étudiants de la classe').should('exist')
    cy.get('button').contains('Voir les questions des étudiants').should('exist')
    cy.get('button').contains('Créer une catégorie de question').should('exist')
  })

  it('En tant que prof, Je peut changer mon nom complet ou mon mot de passe',() => {
    cy.login("test@test.com", "test")
    cy.visit('/settings')
    cy.get('input[type=button]').click()
    cy.get('input[name=name]').type("newName")
    cy.get('input[name=password]').type("test")
    cy.get('input[name=confirm-password]').type("test")
    cy.get('button[type=submit]').click()

    cy.contains('newName').should('exist')
  })


  it ('En tant que prof, je peut créer un étudiant', ()=>{
    cy.login("test@test.com", "test")
    cy.visit('/registerstudent')
    cy.get("input[name=name]").type("student")
    cy.get("input[name=email]").type("stud@test.com")
    cy.get("button[type=button]").click()

    cy.contains("student").should('exist')
  })

  it ('En tant que prof, je peut supprimer un étudiant', ()=>{
    cy.login("test@test.com", "test")
    
    cy.visit('/students')
    cy.get('li').contains('Théo Hautois').click()
    cy.get('button[id=delete-student]').click()

    cy.get('li').contains('Théo Hautois').should('not.exist')
  })


})

describe('Récits utilisateur - En tant quétudiant', () => {

 
  // Exécuté avant chaque test
  beforeEach(() => {
    // On réinitialise la base de données en appelant le script backend:cypress:seed qui se trouve dans le package.json. Ce script copie le fichier db-cypress-default.json dans db-cypress.json qui est utilisé par le serveur backend. Ainsi, on a une base de données propre pour chaque test.
    cy.exec('npm run backend:cypress:seed')

  })

  it('En tant quétudiant, je peux me connecter', () => {
    // Ici on utilise la commande login qui est définie dans le fichier cypress/support/commands.js. Cette commande est disponible dans tous les tests et évite de répéter le code de connexion. Cette version est plus courte et plus lisible.
    cy.login("student@student.com", "test")
  })

  
  it('En tant quétudiant, je peux me déconnecter', () => {
    cy.login("student@student.com", "test")

    cy.contains(/déconnecter/i).click()

    cy.contains(/connexion/i)
  })

  it('En tant quétudiant, je peut changer mon mot de passe',() => {
    cy.login("student@student.com", "test")
    cy.visit('/settings')
    cy.get('input[type=button]').click()
    cy.get('input[name=password]').type("test")
    cy.get('input[name=confirm-password]').type("test")
    cy.get('button[type=submit]').click()
  })

  it('En tant quétudiant, je peux voir la vue détudiant (StudentView)', () => {
    cy.login("student@student.com", "test")
    cy.visit('/student')

    cy.contains("Théo Hautois").should('exist')
    cy.contains("student@student.com").should('exist')
  })

  it ('En tant quétudiant, je peut créer une question', ()=>{
    cy.login("student@student.com", "test")
    cy.visit('/ask')
    cy.get("input[name=question]").type("question")
    cy.get("select[name=select-category]").select("Travail pratique")
    cy.get("select[name=select-priority]").select("P2")

    cy.get("button[type=button]").click()

    cy.visit('/student')
    cy.get('div').contains("P2 - Travail pratique - Théo Hautois").should('exist')
  })

  it ('En tant quétudiant, je peux supprimer une question', ()=>{
    cy.login("student2@student.com", "test")
    
    cy.visit('/student')
    cy.get('#delete-question').first().click()

    cy.get('#question').contains("P1 - Travail pratique - Coquille C.").should('not.exist')
  })

})

/*
Liste des acceptations :
En tant qu'étudiant, je peux:
- Me connecter                                 OK
- Me déconnecter                               OK
- Changer mon mot de passe                     OK
- Créer une question                           OK
- Supprimer une question

En tant que prof, je peux:
- Me connecter                                  OK
- Me déconnecter                                OK
- Changer mon nom complet ou mon mot de passe   OK
- Créer un étudiant                             OK
- Supprimer un étudiant                         OK
*/
