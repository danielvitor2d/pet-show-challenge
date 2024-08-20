# Next Challenge

## Objetivo

Construir um site de gerenciamento de produtos de um petshop, chamado "PetShow".  
O site deve ser entregue até às 23:59 do dia combinado, com um prazo máximo de 5 dias.  
O projeto deve ser hospedado na plataforma Vercel, e o código-fonte deve estar disponível em um repositório.

## Requisitos

**Código**: Deve ser escrito em inglês, e os commits também devem seguir um padrão (imperativo, primeira letra maiúscula).

**Catálogo de Produtos**:  
- A Primeira Tela (Home) deve exibir uma lista dos produtos, sua foto principal, nome, preços, nome das variações do produto, e suas respectivas quantidades em estoque.  
- A Segunda Tela deve ser um formulário de cadastro de um novo produto. O produto deve ter nome, descrição, nome do fornecedor e variações (o produto deve ter uma ou mais variações).

### Variação:
- Código de barras: opcional, texto.  
- SKU: opcional, texto.  
- Nome da variação: nome curto, normalmente é uma característica como peso, cor, ou tamanho.  
- Descrição: opcional, texto.  
- Quantidade em estoque: número.  
- Preço: número (este campo deve ter uma máscara de preço).  
- inPromotion: booleano.  
- Promoção:
  - Novo preço: número.  
  - Data de início: data.  
  - Data de término: data.
- Fotos: o produto pode ter uma ou mais fotos (obrigatório).  
- Foto principal: uma foto.

**Design**:  
A organização e estrutura da interface ficam a critério do desenvolvedor, mas a facilidade de uso e clareza são fatores importantes na avaliação.

**Overdeliver**:
- Você pode desenvolver uma funcionalidade de autocomplete para facilitar o cadastro de produtos (você pode usar esta API para buscar os produtos pelo código de barras: cosmos.bluesoft.com.br).
- Os produtos podem ser editados e excluídos.

## Recursos

Os dados devem ser armazenados em um Firebase criado pelo candidato.  
O banco deve ser o Realtime Database e o armazenamento de fotos no Firestore.
Recomendamos o uso do typescript, tailwindcss e shadcn-ui.