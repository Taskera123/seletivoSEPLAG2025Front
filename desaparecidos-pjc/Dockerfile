# Etapa única: nginx com build já feito

FROM nginx:alpine

# Copia o build local para o nginx
COPY dist /usr/share/nginx/html

# Substitui config padrão do nginx
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
