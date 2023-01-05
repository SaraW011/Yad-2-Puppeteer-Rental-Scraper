<template>
    <header class="header">
        <img class="header__image" alt="i2 logo" src="../assets/logo.png" />
        <h1 class="header__title">
            מחירי שכר דירה היום - מתוך אתר יד 2 
        </h1>
    </header>
</template>

<style>
.header {
    width: 100%;
    text-align: center;
    padding-top: 10px;
}

.header__image {
    width: 80px;
}

.header__title {
    margin: 10px auto 5px;
    font-size: 1.4em;
    text-align: center;
    color: #fff;
    line-height: 1.3em;
    font-style: italic;
    max-width: 60%;
    font-weight: lighter;

}

@media screen and (max-width: 540px) {
    .header__title {
        width: 200px;
    }
}

</style>
