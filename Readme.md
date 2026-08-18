## Iniciar

Para iniciar o software, basta iniciar o dockercompose na raiz do projeto, logo após rodar o comando de migrations;

docker compose build --no-cache;  
docker compose up;  
docker compose exec backend php artisan migrate;  

# Testes
# Rotas da API de Notícias

A API está disponível na porta **80**:

```text
http://localhost
```

## 1. Listar notícias

Retorna uma lista de notícias cadastradas.

```bash
curl http://localhost/api/noticias
```

Também é possível definir a quantidade de registros:

```bash
curl "http://localhost/api/noticias?limit=5"
```

### Filtros

Por título:

```bash
curl "http://localhost/api/noticias?titulo=Brasil"
```

Por descrição:

```bash
curl "http://localhost/api/noticias?descricao=tecnologia"
```

---

## 2. Criar notícia

Cria uma nova notícia.

**Método:** `POST`

```bash
curl -X POST http://localhost/api/noticias \
  -H "Content-Type: application/json" \
  -d "{\"titulo\":\"Nova notícia\",\"descricao\":\"Descrição da notícia\"}"
```

Os campos `titulo` e `descricao` são obrigatórios.

---

## 3. Consultar uma notícia

Retorna uma notícia específica pelo ID.

**Método:** `GET`

```bash
curl http://localhost/api/noticias/1
```

---

## 4. Atualizar notícia

Atualiza uma notícia existente.

**Método:** `PUT`

```bash
curl -X PUT http://localhost/api/noticias/1 \
  -H "Content-Type: application/json" \
  -d "{\"titulo\":\"Título atualizado\",\"descricao\":\"Descrição atualizada\"}"
```

---

## 5. Excluir notícia

Remove uma notícia pelo ID.

**Método:** `DELETE`

```bash
curl -X DELETE http://localhost/api/noticias/1
```

---

## 6. Consultar e limpar cache

Retorna as notícias armazenadas no cache e, em seguida, remove o cache.

**Método:** `GET`

```bash
curl http://localhost/api/noticias/cache
```

A resposta informa que o cache foi limpo:

```json
{
    "noticias": [],
    "cache_limpo": true
}
```

## Resumo

| Método   | Rota                  | Função                   |
| -------- | --------------------- | ------------------------ |
| `GET`    | `/api/noticias`       | Listar notícias          |
| `POST`   | `/api/noticias`       | Criar notícia            |
| `GET`    | `/api/noticias/{id}`  | Consultar notícia        |
| `PUT`    | `/api/noticias/{id}`  | Atualizar notícia        |
| `DELETE` | `/api/noticias/{id}`  | Excluir notícia          |
| `GET`    | `/api/noticias/cache` | Consultar e limpar cache |


# Estrutura de Pastas

A estrutura do projeto é organizada por componentes e funcionalidades.

* `elements/` → componentes básicos e reutilizáveis.

  * `botaoSelecao/` → botão de seleção.
  * `cartao/` → componente de cartão.

* `menu/` → componentes relacionados ao menu.

* `noticias/` → funcionalidades relacionadas às notícias.

  * `criar/` → criar notícias.
  * `editar/` → editar notícias.
  * `listar/` → listar notícias.

### Arquivos

* `.jsx` / `.js` → código dos componentes.
* `.css` → estilos dos componentes.

A ideia é separar cada funcionalidade em sua própria pasta, deixando o projeto organizado e fácil de manter.


## Justificativa da Estrutura

A estrutura de pastas foi organizada separando os componentes e funcionalidades da aplicação. 
Componentes reutilizáveis ficam em `elements`, enquanto funcionalidades específicas, como 
`noticias`, são separadas por responsabilidade, como criar, editar e listar.

Essa organização facilita a manutenção, reutilização dos componentes e localização dos arquivos.

## Padrões de Código

Foi utilizado o **ESLint** para identificar problemas e manter um padrão de código no projeto.

## BDD

### Funcionalidade: Busca de endereço por CEP

**Cenário 1 – Buscar endereço utilizando um CEP válido**

**Dado** que o usuário esteja na tela de consulta de endereço
**E** informe um CEP válido com 8 números
**Quando** clicar no botão “Buscar”
**Então** o sistema deve realizar a consulta do CEP
**E** exibir o endereço correspondente
**E** apresentar as informações de logradouro, bairro, cidade, estado e CEP.

---

**Cenário 2 – Informar um CEP inválido**

**Dado** que o usuário esteja na tela de consulta de endereço
**E** informe um CEP com quantidade diferente de 8 números
**Quando** clicar no botão “Buscar”
**Então** o sistema não deve realizar a consulta
**E** deve exibir a mensagem “Digite um CEP válido com 8 números.”

---

**Cenário 3 – Consultar um CEP inexistente**

**Dado** que o usuário esteja na tela de consulta de endereço
**E** informe um CEP com 8 números que não esteja cadastrado
**Quando** clicar no botão “Buscar”
**Então** o sistema deve realizar a consulta
**E** deve informar que o CEP não foi encontrado.

---

**Cenário 4 – Falha na comunicação com a API**

**Dado** que o usuário esteja na tela de consulta de endereço
**E** informe um CEP válido
**Quando** ocorrer uma falha na comunicação com a API
**Então** o sistema deve informar que não foi possível consultar o CEP
**E** deve orientar o usuário a verificar sua conexão e tentar novamente.

---

**Cenário 5 – Exibir estado de carregamento durante a consulta**

**Dado** que o usuário tenha informado um CEP válido
**Quando** iniciar a consulta
**Então** o sistema deve exibir a mensagem “Consultando endereço...”
**E** o botão de busca deve indicar que a consulta está em andamento
**E** ao finalizar a consulta, o estado de carregamento deve ser encerrado.
