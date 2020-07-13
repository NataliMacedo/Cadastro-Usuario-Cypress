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
                cy.finalizar_cadastro('#nextBtn','Favor anexar os documentos!') 
            })
            
            it('validação do primeiro documento', () => {            
                cy.preencher_campos('#file-upload-btn-2','imagem2.png', fileType, 'input#fotoDocVerso')
                cy.preencher_campos('#file-upload-btn-3','imagem3.png', fileType, 'input#fotoCarteirinha')
                cy.preencher_campos('#file-upload-btn-4','imagem4.png', fileType, 'input#fotoEncaminhamento')
                cy.finalizar_cadastro('#nextBtn','Favor anexar os documentos!') 

            })
                    
            it('validação do segundo documento', () => {
                cy.preencher_campos('#file-upload-btn','imagem1.png', fileType, 'input#fotoDocFrente')
                cy.preencher_campos('#file-upload-btn-3','imagem3.png', fileType, 'input#fotoCarteirinha')
                cy.preencher_campos('#file-upload-btn-4','imagem4.png', fileType, 'input#fotoEncaminhamento')
                cy.finalizar_cadastro('#nextBtn','Favor anexar os documentos!') 

            })

            it('validação do terceiro documento', () => {
                cy.preencher_campos('#file-upload-btn','imagem1.png', fileType, 'input#fotoDocFrente')
                cy.preencher_campos('#file-upload-btn-2','imagem2.png', fileType, 'input#fotoDocVerso')
                cy.preencher_campos('#file-upload-btn-4','imagem4.png', fileType, 'input#fotoEncaminhamento')
                cy.finalizar_cadastro('#nextBtn','Favor anexar os documentos!') 

            })

            it('validação do quarto documento', () => {
                cy.preencher_campos('#file-upload-btn','imagem1.png', fileType, 'input#fotoDocFrente')
                cy.preencher_campos('#file-upload-btn-2','imagem2.png', fileType, 'input#fotoDocVerso')
                cy.preencher_campos('#file-upload-btn-3','imagem3.png', fileType, 'input#fotoCarteirinha')
                cy.finalizar_cadastro('#nextBtn','Favor anexar os documentos!') 

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
                cy.preencher_dados_pessoais('{home}','pedross@gmail.com','09922236605','31900747785','574564578','as12345')
                cy.get('#dataNascimento').type('1995-05-07')
                cy.finalizar_cadastro('#btnSend','Nome é obrigatório!')    
            })

            it('validação do campo email', () => {
                cy.preencher_dados_pessoais('pedro silva','{home}','09922236605','31900747785','574564578','as12345')
                cy.get('#dataNascimento').type('1995-05-07')
                cy.finalizar_cadastro('#btnSend','Email é obrigatório!')
            })

            it('validação do campo cpf', () => {
                cy.preencher_dados_pessoais('pedro silva','pedross@gmail.com','{home}','31900747785','574564578','as12345')
                cy.get('#dataNascimento').type('1995-05-07')
                cy.finalizar_cadastro('#btnSend','Número de CPF é obrigatório!')
            })

            it('validação do campo telefone', () => {
                cy.preencher_dados_pessoais('pedro silva','pedross@gmail.com','09922236605','{home}','574564578','as12345')
                cy.get('#dataNascimento').type('1995-05-07')
                cy.finalizar_cadastro('#btnSend','Telefone é obrigatório!')
            })

            it('validação do campo data de nascimento', () => {
                cy.preencher_dados_pessoais('pedro silva','pedross@gmail.com','09922236605','31900747785','574564578','as12345')
            })

            it('validação do campo carteirinha', () => {
                cy.preencher_dados_pessoais('pedro silva','pedross@gmail.com','09922236605','31900747785','{home}','as12345')
                cy.get('#dataNascimento').type('1995-05-07')
                cy.finalizar_cadastro('#btnSend','Número de carteirinha é obrigatório!')
            })

            describe('validação do campo senha', () => {

                it('valida campo vazio', () => {
                    cy.preencher_dados_pessoais('pedro silva','pedross@gmail.com','09922236605','31900747785','52461389','{home}')
                    cy.get('#dataNascimento').type('1995-05-07')
                    cy.finalizar_cadastro('#btnSend','Senha é obrigatório!')
                })
                
                it('valida entrada com menos de 5 caracteres', () => {
                    cy.preencher_dados_pessoais('pedro silva','pedross@gmail.com','09922236605','31900747785','52461389','e25')
                    cy.get('#dataNascimento').type('1995-05-07')
                    cy.finalizar_cadastro('#btnSend', 'Senha não atende aos critérios!')
                })

                it('valida a necessidade de pelo menos uma letra', () => {
                    cy.preencher_dados_pessoais('pedro silva','pedross@gmail.com','09922236605','31900747785','52461389','142536987')
                    cy.get('#dataNascimento').type('1995-05-07')
                    cy.finalizar_cadastro('#btnSend', 'Senha não atende aos critérios!')
                })

                it('valida a necessidade de pelo menos um número', () => {
                cy.preencher_dados_pessoais('pedro silva','pedross@gmail.com','09922236605','31900747785','52461389','epoytesp')
                cy.get('#dataNascimento').type('1995-05-07')
                cy.finalizar_cadastro('#btnSend', 'Senha não atende aos critérios!')
            }) 
            
        })
    })

    it('validação do cadastro sem preenchimento de campos opcionais', () => {
        cy.preencher_dados_pessoais('pedro silva','pedross@gmail.com','09922236605','31900747785','968574125','as12345')
        cy.get('#dataNascimento').type('1995-05-07')
        cy.finalizar_cadastro('#btnSend','Cadastro realizado com sucesso!')
    })
    
})
 
       
