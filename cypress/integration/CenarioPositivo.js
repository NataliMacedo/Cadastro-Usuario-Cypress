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

        //seleciona o documento e faz o upload dos arquivos
        cy.get('[for="option1"]').click()

        const fileType = 'Octet string';
        cy.get('#file-upload-btn').each(($el, index, $list) => {
            cy.upload_file('imagem1.png', fileType, 'input#fotoDocFrente');
        })
        cy.get('#file-upload-btn-2').each(($el, index, $list) => {
            cy.upload_file('imagem2.png', fileType, 'input#fotoDocVerso');
        })
        /*OBSERVAÇÃO: no cenário positivo realizado inicialmente, eu havia dito que só era possível
                      nesse campo o tipo de arquivo pdf, mas verifiquei posteriormente que aceita 
                      o formato foto também, mas não foi possível editar meu arquivo inicial         */
        cy.get('#file-upload-btn-3').each(($el, index, $list) => {
            cy.upload_file('imagem3.png', fileType, 'input#fotoCarteirinha');
        })
        cy.get('#file-upload-btn-4').each(($el, index, $list) => {
            cy.upload_file('imagem4.png', 'Octet string', 'input#fotoEncaminhamento');
        })
       
        //ao final dos uploads, seleciona o botão próximo
        cy.get('#nextBtn').click()

        //realiza o preenchimento de todos os campos dos dados pessoais
        cy.preencher_dados_pessoais('Carlos Silva', 'carloss@gmail.com','77726771380', '31900748585', '2010-02-15','43695536','[for="opt-masculino"]', 'AB7485213') 
        cy.get('#file-upload-btn-5').each(($el, index, $list) => {
            cy.upload_file('imagem5.png', 'Octet string', 'input#fotoRosto');
        })
       
        //finaliza o cadastro e verifica se foi realizado com sucesso
        cy.get('#btnSend').click()
        cy.get('.swal-title').should('contain', 'Cadastro realizado com sucesso!')     
        cy.get('.swal-button').click()
    
    })
})