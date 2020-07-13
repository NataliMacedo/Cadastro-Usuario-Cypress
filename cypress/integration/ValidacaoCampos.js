///<reference types="cypress" />

import '../support/commands'

describe('Validação dos campos', () => {

        before(() =>{
            //entra no site, seleciona o plano de saúde e o documento
            cy.visit('https://www.psicologiaviva.com.br/')
            cy.get(':nth-child(7) > .ancora').click() 
            cy.get('[onclick="mostrarPlanoSaude()"]').click()                          
        })

        beforeEach(() => {
            cy.reload()
            cy.get('#sel').select('Amil').should('have.value','Amil')
            cy.get('[for="option1"]').click()
        })

        describe('Validação dos campos de upload', () => {

            const fileType = 'Octet string';

            it('validação de todos os campos', () => {
                cy.get('#nextBtn').click()
                cy.get('.swal-title').should('contain', 'Favor anexar os documentos!')     
                cy.get('.swal-button').click()
            })
            
            it('validação do primeiro documento', () => {            
                cy.preencher_campos('#file-upload-btn-2','imagem2.png', fileType, 'input#fotoDocVerso')
                cy.preencher_campos('#file-upload-btn-3','imagem3.png', fileType, 'input#fotoCarteirinha')
                cy.preencher_campos('#file-upload-btn-4','imagem4.png', fileType, 'input#fotoEncaminhamento')
                cy.get('#nextBtn').click()
                cy.get('.swal-title').should('contain', 'Favor anexar os documentos!')     
                cy.get('.swal-button').click()
            })
                    
            it('validação do segundo documento', () => {
                cy.preencher_campos('#file-upload-btn','imagem1.png', fileType, 'input#fotoDocFrente')
                cy.preencher_campos('#file-upload-btn-3','imagem3.png', fileType, 'input#fotoCarteirinha')
                cy.preencher_campos('#file-upload-btn-4','imagem4.png', fileType, 'input#fotoEncaminhamento')
                cy.get('#nextBtn').click()
                cy.get('.swal-title').should('contain', 'Favor anexar os documentos!')     
                cy.get('.swal-button').click()
            })

            it('validação do terceiro documento', () => {
                cy.preencher_campos('#file-upload-btn','imagem1.png', fileType, 'input#fotoDocFrente')
                cy.preencher_campos('#file-upload-btn-2','imagem2.png', fileType, 'input#fotoDocVerso')
                cy.preencher_campos('#file-upload-btn-4','imagem4.png', fileType, 'input#fotoEncaminhamento')
                cy.get('#nextBtn').click()
                cy.get('.swal-title').should('contain', 'Favor anexar os documentos!')     
                cy.get('.swal-button').click()
            })

            it('validação do quarto documento', () => {
                cy.preencher_campos('#file-upload-btn','imagem1.png', fileType, 'input#fotoDocFrente')
                cy.preencher_campos('#file-upload-btn-2','imagem2.png', fileType, 'input#fotoDocVerso')
                cy.preencher_campos('#file-upload-btn-3','imagem3.png', fileType, 'input#fotoCarteirinha')
                cy.get('#nextBtn').click()
                cy.get('.swal-title').should('contain', 'Favor anexar os documentos!')     
                cy.get('.swal-button').click()
            })
        })
        
        describe.only('Validação dos campos de dados pessoais obrigatórios', () => {

            beforeEach('verificação', () => {
                //preenche os dados inicias
                const fileType = 'Octet string';
                cy.preencher_campos('#file-upload-btn','imagem1.png', fileType, 'input#fotoDocFrente')
                cy.preencher_campos('#file-upload-btn-2','imagem2.png', fileType, 'input#fotoDocVerso')
                cy.preencher_campos('#file-upload-btn-3','imagem3.png', fileType, 'input#fotoCarteirinha')
                cy.preencher_campos('#file-upload-btn-4','imagem4.png', fileType, 'input#fotoEncaminhamento')
                cy.get('#nextBtn').click()
            })

            it('validação do campo nome', () => {
                cy.get('#email').type('pedross@gmail.com')
                cy.get('#cpf').type('09922236605')
                cy.get('#telefone').type('3125478963')
                cy.get('#dataNascimento').type('2000-04-07')
                cy.get('#carteirinha').type('968574125')
                cy.get('#senha').type('es254178') 
                cy.get('#btnSend').click()
                cy.get('.swal-title').should('contain', 'Nome é obrigatório!') 
                cy.get('.swal-button').click() 
            })

            it('validação do campo email', () => {
                cy.get('#nome').type('pedro silva')
                cy.get('#cpf').type('09922236605')
                cy.get('#telefone').type('3125478963')
                cy.get('#dataNascimento').type('2000-04-07')
                cy.get('#carteirinha').type('968574125')
                cy.get('#senha').type('es254178') 
                cy.get('#btnSend').click()
                cy.get('.swal-title').should('contain', 'Email é obrigatório!') 
                cy.get('.swal-button').click()
            })

            it('validação do campo cpf', () => {
                cy.get('#nome').type('pedro silva')
                cy.get('#email').type('pedross@gmail.com')
                cy.get('#telefone').type('3125478963')
                cy.get('#dataNascimento').type('2000-04-07')
                cy.get('#carteirinha').type('968574125')
                cy.get('#senha').type('es254178') 
                cy.get('#btnSend').click()
                cy.get('.swal-title').should('contain', 'Número de CPF é obrigatório!') 
                cy.get('.swal-button').click()
            })

            it('validação do campo telefone', () => {
                cy.get('#nome').type('pedro silva')
                cy.get('#email').type('pedross@gmail.com')
                cy.get('#cpf').type('09922236605')
                cy.get('#dataNascimento').type('2000-04-07')
                cy.get('#carteirinha').type('968574125')
                cy.get('#senha').type('es254178') 
                cy.get('#btnSend').click()
                cy.get('.swal-title').should('contain', 'Telefone é obrigatório!') 
                cy.get('.swal-button').click()
            })

            it('validação do campo data de nascimento', () => {
                cy.get('#nome').type('pedro silva')
                cy.get('#email').type('pedross@gmail.com')
                cy.get('#telefone').type('3125478963')
                cy.get('#cpf').type('09922236605')
                cy.get('#carteirinha').type('968574125')
                cy.get('#senha').type('es254178') 
                cy.get('#btnSend').click()
            })

            it('validação do campo carteirinha', () => {
                cy.get('#nome').type('pedro silva')
                cy.get('#email').type('pedross@gmail.com')
                cy.get('#telefone').type('3125478963')
                cy.get('#cpf').type('09922236605')
                cy.get('#dataNascimento').type('2000-04-07')
                cy.get('#senha').type('es254178') 
                cy.get('#btnSend').click()
                cy.get('.swal-title').should('contain', 'Número de carteirinha é obrigatório!') 
                cy.get('.swal-button').click()
            })
            
        })
    
})
 
       
