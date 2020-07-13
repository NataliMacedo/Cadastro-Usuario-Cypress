///<reference types="cypress" />

import '../support/commands'

describe('Cadastro de paciente com plano de saúde', () => {

    it('Cenário de teste positivo', () => {
        //entra no site
        cy.visit('https://www.psicologiaviva.com.br/')

        cy.title('Consulte com um psicólogo online de qualquer lugar - Psicologia Viva')


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

        //realiza o preenchimento de todos os campos dos dados pessoais, exceto data de nascimento
        cy.get('#nome').type('luiza martins')
        cy.get('#email').type('luizam@gmail.com')
        cy.get('#cpf').type('44188203617')
        cy.get('#telefone').type('31900747785')
        cy.get('#carteirinha').type('574564578')
        cy.get('[for="opt-feminino"]').click()
        cy.get('#senha').type('AD102365213') 
        cy.preencher_campos('#file-upload-btn-5','imagem5.png', fileType, 'input#fotoRosto')
       
        //finaliza o cadastro e verifica se a mensagem de cadastro realizado com sucesso não foi exibida
        cy.get('#btnSend').click()
        cy.get('.swal-title').should('not.exist')   
        cy.visit('https://www.psicologiaviva.com.br/')     
    
    })
})