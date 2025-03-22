Entre na raiz onde existe o Docker file e execute:
- docker build --no-cache -t desaparecidos-pjc .
Depois execute para rodar o container :  
- docker run -p 5173:80 desaparecidos-pjc
Agora só acessar:
- http://localhost:5173
