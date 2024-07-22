import * as data from "../helpers/default_data.json"
import * as main_page from "../locators/main_page.json"
import * as recovery_password from "../locators/recovery_password_page.json"
import * as result_page from "../locators/result_page.json"

describe('Ав. Проверка формы логина и пароля', function () {

    beforeEach('Начало теста', function () {
        cy.visit('/'); // Зашел на сайт
        cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)'); // Проверяю цвет кнопки восст. пароль
          });

    afterEach('Конец теста', function () {
        cy.get(result_page.close).should('be.visible'); // Крестик виден пользователю 
        cy.get(result_page.title).should('be.visible'); //Текст виден пользователю
          });  

    it('Верный пароль и верный логин', function () {
        cy.get(main_page.email).type(data.login); // Ввели верный логин
        cy.get(main_page.password).type(data.password); // Ввели верный пароль
        cy.get(main_page.login_button).click(); // Нажал войти

        cy.get(result_page.title).contains('Авторизация прошла успешно'); // Проверка входа
    })

    it('Проверку логики восстановления пароля', function () {
        cy.get(main_page.fogot_pass_btn).click();
        cy.get(recovery_password.email).type(data.login);
        cy.get(recovery_password.send_button).click();
        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail');
    })  

    it('Проверка не правильный пароль', function () {
        cy.get(main_page.email).type(data.login); 
        cy.get(main_page.password).type("123");  
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).contains('Такого логина или пароля нет');
    }) 
    it('Проверка не правильный логин', function () {
        cy.get(main_page.email).type("qwe@mail.ru"); 
        cy.get(main_page.password).type(data.password);
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).contains('Такого логина или пароля нет');
    }) 
    it('Проверка логин без @', function () {
        cy.get(main_page.email).type("qwemail.ru");
        cy.get(main_page.password).type(data.password);
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).contains('Нужно исправить проблему валидации');
    }) 
    it('Проверка на приведение к строчным буквам в логине', function () {
        cy.get(main_page.email).type("GerMan@Dolnikov.ru");
        cy.get(main_page.password).type(data.password);
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).contains('Авторизация прошла успешно');
    })
})
