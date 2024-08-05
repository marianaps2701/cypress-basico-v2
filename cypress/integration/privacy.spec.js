// suite de teste 
describe('politica de privacidade', function(){

    beforeEach(function(){
        cy.visit('./src/privacy.html')
    })

    it('testa individualmente a página de política de privacidade', function(){
        cy.contains('Talking About Testing')
        .should('be.visible')
    })
})