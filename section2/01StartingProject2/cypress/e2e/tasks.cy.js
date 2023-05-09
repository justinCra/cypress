describe('tasks management', () => {
    it('should open the modal', () => {
        cy.visit('http://127.0.0.1:5173/');
        cy.get('button').click();
    })

    it('should close the modal via backdrop', () => {
        cy.visit('http://127.0.0.1:5173/');
        cy.get('button').click();

        cy.get('.backdrop').click({ force: true });
    })

    it('close the modal via button', () => {
        cy.visit('http://127.0.0.1:5173/');
        cy.get('button').click();

        cy.contains('Cancel').click();
    })

    it('should add a task to the list of tasks', () => {
        cy.visit('http://127.0.0.1:5173/');
        cy.contains('Add Task').click();
        cy.get('#title').type('new title');
        cy.get('#summary').type('new summary');
        // there is already an Add Task button, so get specific and select the modal, that way you get the only one that is visible
        cy.get('.modal').contains('Add Task').click();

        // check if the element we just created exists
        cy.get('.task').should('have.length', 1); // getting the task is going to list ALL elements with the class task, so we should have a list of 1
        cy.get('.task h2').contains('new title');
        cy.get('.task p').contains('new summary');
    })

    it('should validate input', () => {
        cy.visit('http://127.0.0.1:5173/');
        cy.contains('Add Task').click();
        cy.get('.modal').contains('Add Task').click();
        cy.contains('Please provide')
    })

    it('should filter tasks', () => {
        cy.visit('http://127.0.0.1:5173/');
        cy.contains('Add Task').click();
        cy.get('#title').type('new title');
        cy.get('#summary').type('new summary');
        cy.get('#category').select('urgent');
        cy.get('.modal').contains('Add Task').click();
        cy.get('.task').should('have.length', 1);
        cy.get('#filter').select('moderate');
        cy.get('.task').should('have.length', 0);
        cy.get('#filter').select('urgent');
        cy.get('.task').should('have.length', 1);
        cy.get('#filter').select('all');
        cy.get('.task').should('have.length', 1);
    })
});