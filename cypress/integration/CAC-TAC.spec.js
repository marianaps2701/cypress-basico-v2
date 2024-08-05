// reference type="Cypress"

// suite de teste
describe('Central de Atendimento ao Cliente TAT', function(){

    // o beforeEach garante que essa função seja passada antes de cada teste, nesse caso, antes de cada teste O Cypress ira consultar a pagina indicada
    beforeEach(function(){

    //o teste sera feito na versão local
    cy.visit('./src/index.html')

    })

    // teste case
    it ('verifica o título da aplicação', function(){ 
        
        //verificação do título
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')

    })

    it('seleciona um arquivo da pasta fictures', function(){
        // selecionar o botão de anexar arquivo
        cy.get('input[type="file"]#file-upload')
        // verificar se não tem nenhum arquivo anexado
        .should('not.have.value')
        // seleciona o arquivo que sera anexado
        .selectFile('./cypress/fixtures/example.json')
        // verifica se o arquivo foi anexado corretamente
        .should(function($input){
            // para encontrar os objetos/arrays foi dado um console.log($input) e inspecionado
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo no modo drag-and-drop', function(){
        cy.get('input[type="file"]#file-upload')
        .should('have.not.value')
        .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo usando a fixtures e um alias(apelido', function(){
        cy.fixture('example.json').as('simpleFile')
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('@simpleFile')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('verifica sem a política de privacidade abre em outra aba', function(){
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
        cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()
        cy.contains('Não salvamos dados submetidos no formulário da aplicação CAC TAT').should('be.visible')
    })
})