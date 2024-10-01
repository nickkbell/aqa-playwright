FROM mcr.microsoft.com/playwright:v1.46.0-noble

# Устанавливаем рабочую директорию
WORKDIR /app

COPY package.json package-lock.json ./

# Устанавливаем зависимости
RUN npm install

COPY . .

CMD ["npx", "playwright", "test"]