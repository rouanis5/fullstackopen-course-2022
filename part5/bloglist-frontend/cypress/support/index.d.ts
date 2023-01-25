// add custom cammands IntelliSense
declare namespace Cypress {
  interface Chainable<Subject> {
    login({ username, passsword }, refresh?: boolean): void
    addUser({ username, name, password }): void
    addBlog({ title, author, url, likes }, refresh?: boolean)
    getBySel(selector: string, options?: Partial<Cypress.Loggable & Cypress.Timeoutable & Cypress.Withinable & Cypress.Shadow> | undefined): Chainable<any>
    getBySelLike(selector: string, options?: Partial<Cypress.Loggable & Cypress.Timeoutable & Cypress.Withinable & Cypress.Shadow> | undefined): Chainable<any>
  }
}
