# Projeto para o seletivo SEPLAG fornt end 2025 pleno

Este repositório contém uma aplicação **Single Page Application (SPA)** desenvolvida para o teste prático de Desenvolvedor Front-end, consumindo a API pública da Polícia Judiciária Civil de Mato Grosso.

## 👤 Informações do Candidato

- **Nome completo:** Lucas Henrique Tasca de Araujo  
- **Número da inscrição:** 8313

## 🚀 Como Executar o Projeto

Siga os passos abaixo para executar o projeto localmente utilizando Docker:

1. Acesse o diretório raiz onde se encontra o `Dockerfile`:

```bash
docker build --no-cache -t desaparecidos-pjc .
```

2. Após a build da imagem, execute o container:

```bash
docker run -p 5173:80 desaparecidos-pjc
```

3. Agora, acesse a aplicação no seu navegador através do endereço:

```
http://localhost:5173
```


### ❗ Observações Importantes

- O objeto de resposta da API  da requisição get https://abitus-api.geia.vip/v1/pessoas/aberto/filtro **não possui uma informação explícita** que indique se uma pessoa está **desaparecida** ou **localizada**, apenas se passar como sobrecarga na requisição.
- Como solução, a aplicação considera critérios como a presença ou ausência de campos (como `dataLocalizacao` ou `status`) para inferir esse status — o que pode não ser 100% preciso.
- Por se tratar de dados públicos e sensíveis, a aplicação também se preocupa com a forma como apresenta essas informações, priorizando clareza e respeito às pessoas envolvidas.

---

Feito com 💙 para fins de avaliação técnica.
