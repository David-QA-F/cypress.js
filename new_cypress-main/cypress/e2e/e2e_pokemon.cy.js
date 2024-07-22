import * as date from "../helpers/pokemon_date.json"
import * as ava from "../locators/ava_page.json"

describe('Длинный ав. для покемонов', function () {
    it('end-2-end на покупку нового аватара для тренера', function () {
        cy.visit("https://pokemonbattle.ru/login"); // Зешел на сайт
        cy.get(':nth-child(1) > .auth__input').type(date.login); // Ввели верный логин
        cy.get('#password').type(date.password); // Ввели верный пароль
        cy.get('.auth__button').click(); // Нажал войти
        cy.get('.header__btns > :nth-child(4)').click(); // Переходим в магазин 
        cy.get(ava.v1).click(); // Выбераем новый аватар 
        cy.get('.pay__payform-v2 > :nth-child(2) > .pay_base-input-v2').type('4444 3333 2222 1111'); // Вводим номер карты
        cy.get(':nth-child(1) > .pay_base-input-v2').type('0632'); // Вводим срок
        cy.get('.pay-inputs-box > :nth-child(2) > .pay_base-input-v2').type('125'); // Вводим код
        cy.get('.pay__input-box-last-of > .pay_base-input-v2').type('aaa') // Вводим имя
        cy.get('.pay-btn').click(); // Нажимаем оплатить
        cy.get('#cardnumber').type('56456'); // Вводим вверный код
        cy.get('.payment__submit-button').click(); // Нажимаем отправить
        cy.get('.payment__font-for-success').contains('Покупка прошла успешно'); // Проверка успешной покупки
        cy.get('.payment__adv').click(); // Возврат обратно
        cy.get('.header__container > .header__id').click(); // Переходим на стр тренера
        cy.wait(5000); // Ждем и смотрим на новую аватарку
        cy.get('.header__container > .top_menu_exit').click(); // Выход
    })
})