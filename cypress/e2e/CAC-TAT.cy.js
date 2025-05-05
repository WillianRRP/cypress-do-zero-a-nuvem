/// <reference types="cypress" />

describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('Preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('#firstName').type('Billy')
    cy.get('#lastName').type('Rp')
    cy.get('#email').type('teste@teste.com')
    cy.get('#open-text-area').type('teste')
    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible')
  })

  it('Preenche os campos obrigatórios e envia o formulário com texto longo', () => {
    cy.clock()

    const longText = Cypress._.repeat('oi', 200)
    cy.get('#firstName').type('Billy')
    cy.get('#lastName').type('Rp')
    cy.get('#email').type('teste@teste.com')
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible')

    cy.tick(3000)
    cy.get('.success').should('not.be.visible')
  })

  it('Exibe mensagem de erro ao submeter o formulário com email inválido', () => {
    cy.clock()
    cy.get('#firstName').type('Billy')
    cy.get('#lastName').type('ro')
    cy.get('#email').type('testeteste')
    cy.get('#open-text-area').type('oi')
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
    cy.tick(3000)
    cy.get('.error').should('not.be.visible')
  })

  it('O campo de telefone permanece vazio ao digitar valor não numérico', () => {
    cy.get('#phone').type('acded').should('have.value', '')
  })

  it('Exibe erro se telefone for obrigatório mas não preenchido', () => {
    cy.clock()
    cy.get('#firstName').type('Billy')
    cy.get('#lastName').type('Rp')
    cy.get('#email').type('testeteste@gmail.com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('oi')
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
    cy.tick(3000)
    cy.get('.error').should('not.be.visible')
    
  })

  it('Preenche e limpa os campos nome, sobrenome, email, telefone e mensagem', () => {
    cy.get('#firstName')
      .type('Billy')
      .should('have.value', 'Billy')
      .clear()
      .should('have.value', '')

    cy.get('#lastName')
      .type('Rp')
      .should('have.value', 'Rp')
      .clear()
      .should('have.value', '')

    cy.get('#email')
      .type('testeteste')
      .should('have.value', 'testeteste')
      .clear()
      .should('have.value', '')

    cy.get('#open-text-area')
      .type('oi')
      .should('have.value', 'oi')
      .clear()
      .should('have.value', '')

    cy.get('#phone')
      .type('3423432')
      .should('have.value', '3423432')
      .clear()
      .should('have.value', '')
  })

  it('Exibe erro ao submeter o formulário vazio', () => {
    cy.clock()
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
    cy.tick(3000)
    cy.get('.error').should('not.be.visible')
  })

  it('Envia formulário com sucesso usando comando customizado', () => {
    cy.clock()
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')
    cy.tick(3000)
    cy.get('.success').should('not.be.visible')
  })

  it('Seleciona produto (YouTube) por texto', () => {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })

  it('Seleciona produto (Mentoria) por valor', () => {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })

  it('Seleciona produto (Blog) por índice', () => {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

  it('Marca tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"]').check('feedback').should('be.checked')
  })

  it('Marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]').each(($radio) => {
      cy.wrap($radio).check().should('be.checked')
    })
  })

  it('Marca ambos checkboxes e desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })
  it('seleciona um arquivo da pasta fixure', () => {
    cy.get('#file-upload')
    .selectFile('cypress/fixtures/example.json')
    .should(input =>{
      expect(input[0].files[0].name).to.equal('example.json');

    })
  })
  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload')
    .selectFile('cypress/fixtures/example.json', {action: "drag-drop"})
    .should(input =>{
      expect(input[0].files[0].name).to.equal('example.json');

    })
  })
  it('seleciona um arquivo ultilizando uma fixure para qual foi dada uma alias', () => {
    cy.fixture('example.json').as('samplefile')
    cy.get('#file-upload')
    .selectFile('@samplefile')
    .should(input =>{
      expect(input[0].files[0].name).to.equal('example.json');

    })
  })
  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a', 'Política de Privacidade')
    .should('have.attr', 'href', 'privacy.html')
    .and('have.attr', 'target', '_blank')
  })
  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a', 'Política de Privacidade')
    .invoke('removeAttr', 'target')
    .click()
    cy.contains('CAC TAT - Política de Privacidade').should('be.visible')
  })
  it('exibe e oculta as mensagens de sucesso e erro usando .invoke()', () => {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
  })
it('preencha o campo da área de texto usando o comando invoke', () => {
  cy.get('#open-text-area').invoke('val', 'um texto qualquer')
  .should('have.value', 'um texto qualquer')
})  

it('faz uma requisição HTTP', () => {
  cy.request('https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html')
  .as('getRequest')
  .its('status')
  .should('be.equal', 200)
  cy.get('@getRequest')
  .its('statusText')
  .should('be.equal', 'OK')
  cy.get('@getRequest')
  .its('body')
  .should('include', 'CAC TAT')
})
it.only('Encotre o gato escondido', () => {
  cy.get('#cat')
  .invoke('show')
  .should('be.visible')
  cy.get('#title')
  .invoke('text', 'cat tat')
  cy.get('#subtitle')
  .invoke('text', 'gatinho <3')

})
})
