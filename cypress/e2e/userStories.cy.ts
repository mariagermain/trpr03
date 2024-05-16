describe('Récits utilisateur - En tant que professeur', () => {
  // On définit un utilisateur pour les tests. Cet utilisateur sera créé dans la base de données avant chaque test.
  /*const userProf = {
    email: 'prof@courriel.com',
    password: 'monmotdepasse',
    name: 'Bruce Lee',
    role:1
  }

  const userStudent = {
    email: 'student@courriel.com',
    password: 'monmotdepasse',
    name: 'Bruce Lee',
    role:2
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
  }*/

  // Exécuté avant chaque test
  beforeEach(() => {
    // On réinitialise la base de données en appelant le script backend:cypress:seed qui se trouve dans le package.json. Ce script copie le fichier db-cypress-default.json dans db-cypress.json qui est utilisé par le serveur backend. Ainsi, on a une base de données propre pour chaque test.
    cy.exec('npm run backend:cypress:seed')

    // On ajoute l'utilisateur à la BD en utilisant la commande POST /register de notre API REST (serveur backend).
    // TODO : utiliser une variable d'environnement pour l'URL du serveur backend.
    /*cy.request('POST', 'http://127.0.0.1:3000/register', {
      email: userProf.email,
      password: userProf.password,
      name: userProf.name,
      role:userProf.role
    })*/

    // on ajoute des questions :
    //cy.request('POST', 'http://127.0.0.1:3000/questions', question1)
    //cy.request('POST', 'http://127.0.0.1:3000/questions', question2)
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
    cy.contains('Voir les étudiants de la classe')
    cy.contains('Voir les questions des étudiants')
    cy.contains('Créer une catégorie de question')
  })

  it('En tant que prof, Je peut changer mon nom complet ou mon mot de passe',() => {
    cy.login("test@test.com", "test")
    cy.visit('/settings')
    cy.get('input[type=button]').click()
    cy.get('input[name=name]').type("newName")
    cy.get('input[name=password]').type("test")
    cy.get('input[name=confirm-password]').type("test")
    cy.get('button[type=submit]').click()
    cy.contains('newName')
  })


  it ('En tant que prof, je peut créer un étudiant', ()=>{
    cy.login("test@test.com", "test")
    cy.visit('/registerstudent')
    cy.get("input[name=name]").type("student")
    cy.get("input[name=email]").type("stud@test.com")
    cy.get("button[type=button]").click()
    //cy.visit('/students')
    cy.contains("student")
  })

  it ('En tant que prof, je peut supprimer un étudiant', ()=>{
    cy.login("test@test.com", "test")
    
    cy.visit('/students')
    cy.find('li').click()
    cy.find('#delete-student')
    cy.contains("student");
  })


})

describe('Récits utilisateur - En tant quétudiant', () => {

  /*const userStudent = {
    email: 'student@courriel.com',
    password: 'monmotdepasse',
    name: 'Bruce Lee',
    role:2
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

  const category1 = {
    id : 1,
    value: "Travail pratique"
  }*/

  // Exécuté avant chaque test
  beforeEach(() => {
    // On réinitialise la base de données en appelant le script backend:cypress:seed qui se trouve dans le package.json. Ce script copie le fichier db-cypress-default.json dans db-cypress.json qui est utilisé par le serveur backend. Ainsi, on a une base de données propre pour chaque test.
    cy.exec('npm run backend:cypress:seed')

    // On ajoute l'utilisateur à la BD en utilisant la commande POST /register de notre API REST (serveur backend).
    // TODO : utiliser une variable d'environnement pour l'URL du serveur backend.
    /*cy.request('POST', 'http://127.0.0.1:3000/register', {
      email: userStudent.email,
      password: userStudent.password,
      name: userStudent.name,
      role:userStudent.role
    })*/

    // on ajoute des questions :
    //cy.request('POST', 'http://127.0.0.1:3000/questions', question1)
    //cy.request('POST', 'http://127.0.0.1:3000/questions', question2)

    //on ajoute la catégorie
    //cy.request('POST', 'http://127.0.0.1:3000/categories', category1)
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
    cy.contains("Théo Hautois")
    cy.contains("student@student.com")
  })

  it ('En tant quétudiant, je peut créer une question', ()=>{
    cy.login("student@student.com", "test")
    cy.visit('/ask')
    cy.get("input[name=question]").type("question")
    cy.get("#select-category").type("Travail Pratique")
    cy.get("#select-priority").type("P1")

    cy.get("button[type=button]").click()

    cy.visit('/student')
    cy.get('#question').contains("Travail Pratique")
    cy.get('#question').contains("P1")
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
