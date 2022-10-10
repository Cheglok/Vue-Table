<template>
    <footer class="main-footer">
        <div class="container">
            <p class="main-footer__text">Использовался Vue3 options Api, ванильный CSS, flexbox, fontawesome, nodeJs, express, axios, MySQL, минимальная адаптивность с медиа-запросами</p>
            <p class="main-footer__text">запуск сервера из папки backend "node index"</p>
            <p class="main-footer__text">Дамп базы данных в папке dump. Настройки БД в backend/config/database.js</p>
        </div>
    </footer>
</template>

<style scoped>
    footer {
        background-color: rgb(71, 131, 131);
        padding: 2rem;
    }
    .main-footer__text {
        color: white;
        font-size: 2rem;
    }
</style>