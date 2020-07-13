///<reference types="cypress" />

import '../support/commands'

describe('Cadastro de paciente com plano de saúde', () => {

    it('Cenário de teste positivo', () => {
        //entra no site
        cy.visit('https://www.psicologiaviva.com.br/')

        //clica em 'Cadastrar'
        cy.get(':nth-child(7) > .ancora').click()   

      
        //seleciona a opção de plano de saúde e a operadora
        cy.get('[onclick="mostrarPlanoSaude()"]').click()
        cy.get('#sel').select('Amil').should('have.value','Amil')

        //seleciona o documento 
        cy.get('[for="option1"]').click()

        //faz o upload dos arquivos
        const fileType = 'Octet string';
        cy.preencher_campos('#file-upload-btn','imagem1.png', fileType, 'input#fotoDocFrente')
        cy.preencher_campos('#file-upload-btn-2','imagem2.png', fileType, 'input#fotoDocVerso')
        cy.preencher_campos('#file-upload-btn-3','imagem3.png', fileType, 'input#fotoCarteirinha')
        cy.preencher_campos('#file-upload-btn-4','imagem4.png', fileType, 'input#fotoEncaminhamento')

        //ao final dos uploads, seleciona o botão próximo
        cy.get('#nextBtn').click()

        //realiza o preenchimento de todos os campos dos dados pessoais
        cy.preencher_dados_pessoais('Carla Silveira', 'carlas@gmail.com','09922236605', '31900748585', '43695536','AB7481113') 
        cy.get('#dataNascimento').type('2010-02-15')
        cy.get('[for="opt-feminino"]').click()
        cy.preencher_campos('#file-upload-btn-5','imagem5.png', fileType, 'input#fotoRosto')
       
        //finaliza o cadastro e verifica se foi realizado com sucesso
        cy.finalizar_cadastro('#btnSend','Cadastro realizado com sucesso!')
    
    })
})