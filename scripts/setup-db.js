const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Проверяем и создаем директорию scripts, если её нет
const scriptsDir = path.join(__dirname);
if (!fs.existsSync(scriptsDir)) {
  fs.mkdirSync(scriptsDir, { recursive: true });
}

try {
  console.log('Создание и настройка базы данных...');
  
  // Запускаем миграцию
  execSync('npx tsx lib/db/migrate.ts', { stdio: 'inherit' });
  
  console.log('Настройка базы данных завершена успешно!');
} catch (error) {
  console.error('Ошибка при настройке базы данных:', error);
  process.exit(1);
}
