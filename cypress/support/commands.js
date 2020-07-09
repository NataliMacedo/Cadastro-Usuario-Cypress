import 'cypress-file-upload';


// upload
Cypress.Commands.add('upload_file', (fileName, fileType = ' ', selector) => {
    cy.get(selector).then(subject => {
      cy.fixture(fileName, 'base64')
        .then(Cypress.Blob.base64StringToBlob)
        .then(blob => {
          const el = subject[0]
          const testFile = new File([blob], fileName, { type: fileType })
          const dataTransfer = new DataTransfer()
          dataTransfer.items.add(testFile)
          el.files = dataTransfer.files
        })
    })
  });

//preenchimento dos dados
Cypress.Commands.add('preencher_dados_pessoais', (nome,email,cpf,telefone,dataNascimento,carteirinha,seletor,senha) => {
    cy.get('#nome').type(nome)
    cy.get('#email').type(email)
    cy.get('#cpf').type(cpf)
    cy.get('#telefone').type(telefone)
    cy.get('#dataNascimento').type(dataNascimento)
    cy.get('#carteirinha').type(carteirinha)
    cy.get(seletor).click()
    cy.get('#senha').type(senha) 
    
})
