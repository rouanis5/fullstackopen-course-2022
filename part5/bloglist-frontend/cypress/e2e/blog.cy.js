// NB: i checked from the documentation (jan 24, 2022)
// that cypress supports arrow functions
describe('Blog app', () => {
  beforeEach(() => {
    cy.request('POST', '/api/testing/reset')
    cy.addUser({ username: 'user1', name: 'namedOne', password: '852654Suuuu!'
    })
    cy.visit('/')
  })

  it('Login form is shown', () => {
    cy.getBySelLike('login:form')
    cy.getBySel('login:username_input')
    cy.getBySel('login:password_input')
  })

  describe('Login', () => {
    beforeEach(() => {
      cy.getBySel('login:form').as('form')
      cy.getBySel('login:username_input').as('user')
      cy.getBySel('login:password_input').as('pass')
      cy.getBySel('login:submit').as('btn')
    })
    it('succeeds with correct credentials', () => {
      cy.get('@user').type('user1')
      cy.get('@pass').type('852654Suuuu!')
      cy.get('@btn').click()

      cy.contains('namedOne login')
      cy.contains('namedOne logged in')
      cy.get('@form').should('not.exist')
    })

    it('fails with wrong credentials', () => {
      cy.get('@user').type('user1')
      cy.get('@pass').type('wrong')
      cy.get('@btn').click()
      // Optional bonus exercise:
      // Check that the notification shown
      // with unsuccessful login is displayed red.
      cy.contains('invalid username or password')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
        .and('have.css', 'border-color', 'rgb(255, 0, 0)')

      cy.should('not.have.text', 'namedOne logged in')
      cy.get('@form')
    })
  })
})