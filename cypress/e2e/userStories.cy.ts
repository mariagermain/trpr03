describe('Récits utilisateur - En tant que professeur', () => {
  // On définit un utilisateur pour les tests. Cet utilisateur sera créé dans la base de données avant chaque test.
  const user = {
    email: 'mon@courriel.com',
    password: 'monmotdepasse',
    name: 'Bruce Lee',
    role:1
  }

  // questions
  const question1 = {
    id: 1,
    studentId: 1,
    studentName: "Coquille C.",
    value: "Question 1",
    priority: "P1",
    category: "Travail pratique"
  }

  const question2 = {
    id: 2,
    studentId: 2,
    studentName: "Bob",
    value: "Question 2",
    priority: "P2",
    category: "Travail pratique"
  }

  // Exécuté avant chaque test
  beforeEach(() => {
    // On réinitialise la base de données en appelant le script backend:cypress:seed qui se trouve dans le package.json. Ce script copie le fichier db-cypress-default.json dans db-cypress.json qui est utilisé par le serveur backend. Ainsi, on a une base de données propre pour chaque test.
    cy.exec('npm run backend:cypress:seed')

    // On ajoute l'utilisateur à la BD en utilisant la commande POST /register de notre API REST (serveur backend).
    // TODO : utiliser une variable d'environnement pour l'URL du serveur backend.
    cy.request('POST', 'http://127.0.0.1:3000/register', {
      email: user.email,
      password: user.password,
      name: user.name,
      role:user.role
    })

    // on ajoute des questions :


    cy.request('POST', 'http://127.0.0.1:3000/questions', question1)
    cy.request('POST', 'http://127.0.0.1:3000/questions', question2)
  })

  // Les tests sont écrits sous forme de récits utilisateur. Voir les notes de cours à ce sujet.
  it("je peux accéder à la page d'accueil", () => {
    // L'instruction `cy` permet d'exécuter des commandes de Cypress.
    // Ici, on visite la page d'accueil.
    cy.visit('/')

    // On vérifie que la page contient, dans une balise H1, le texte "Accueil"
    cy.contains('h1', /accueil/i)
  })

  it('je peux accéder à la page à propos', () => {
    cy.visit('/about')

    cy.contains('h1', /à propos/i)
  })


  it('je peux me connecter', () => {
    // Ici on utilise la commande login qui est définie dans le fichier cypress/support/commands.js. Cette commande est disponible dans tous les tests et évite de répéter le code de connexion. Cette version est plus courte et plus lisible.
    cy.login(user.email, user.password)
  })

  it('je peux me déconnecter', () => {
    cy.login(user.email, user.password)

    cy.contains(/déconnecter/i).click()

    cy.contains(/connexion/i)
  })

  it('je peux voir mon profil', () => {
    cy.login(user.email, user.password)
    cy.visit('/teacher')
    cy.contains(user.name)
    cy.contains(user.email)
  })

  it('Je peut changer mon nom complet ou mon mot de passe',() => {
    cy.login(user.email, user.password)
    cy.visit('/settings')
    cy.get('input[type=button]').click()
    cy.get('input[name=name]').type("newName")
    cy.get('input[name=password').type("test")
    cy.get('input[name=confirm-password').type("test")
    cy.get('button[type=submit]').click()
    cy.contains('newName')
  })

  it ('Je peut créer un étudiant', ()=>{
    cy.login(user.email, user.password)
    cy.visit('/registerstudent')
    cy.get("input[name=name]").type("student")
    cy.get("input[name=email]").type("stud@test.com")
    cy.get("button[type=button]").click()
    cy.contains("student")
  })
})

/*
Liste des acceptations :
En tant qu'étudiant, je peux:
- Me connecter
- Me déconnecter
- Changer mon mot de passe
- Créer une question
- Supprimer une question

En tant que prof, je peux:
- Me connecter                                  OK
- Me déconnecter                                OK
- Changer mon nom complet ou mon mot de passe   OK
- Créer un étudiant
- Supprimer un étudiant
*/
