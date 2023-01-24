// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import constants from '../../src/config/constants'

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', '/api/login', {
    username, password
  }).then(({ body }) => {
    localStorage.setItem(constants.userLocalStorage, JSON.stringify(body))
    cy.visit('/')
  })
})

Cypress.Commands.add('addUser', ({ username, name, password }) => {
  cy.request('POST', '/api/users', {
    username, name, password
  })
})

Cypress.Commands.add('getBySel', (selector, ...args) => {
  return cy.get(`[data-test="${selector}"]`, ...args)
})

Cypress.Commands.add('getBySelLike', (selector, ...args) => {
  return cy.get(`[data-test*="${selector}"]`, ...args)
})