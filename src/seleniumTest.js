const { Builder, By, Key, until } = require('selenium-webdriver');

const app = require('./app');
const server = app.listen(8000);


// Teste de sistema 1
async function testeDeRegistro() {
  const driver = await new Builder()
  .withCapabilities({ browserName: 'chrome', chromeOptions: { w3c: false } })
  .forBrowser('chrome').build();

  try {
    await driver.get('http://localhost:8000');
    await driver.findElement(By.className('reg-link')).sendKeys('webdriver', Key.ENTER);
    
    setTimeout(async() => {
      await driver.executeScript("document.querySelector('.login-user').value = 'Paulo Sérgio'");
      await driver.executeScript("document.querySelector('.login-email').value = 'paulo@gmail.com'");
      await driver.executeScript("document.querySelector('.login-pass').value = '123456'");

      setTimeout(async () => {
        await driver.findElement(By.className('login-form')).submit();
        await driver.get('http://localhost:8000/home');
        await driver.wait(until.elementLocated(By.css('li[itemEmail="paulo@gmail.com"]')), 10000);
        
      }, 3000);

    }, 3000);

  } finally {
    setTimeout(async () => {
      //Esperar por 10 segundos para ver o resultado
      await driver.get('http://localhost:8000/');
      await driver.quit();
      
      testeDeLogin();
    }, 10000)
  }
}

// Teste de sistema 2

async function testeDeLogin() {
  const driver = await new Builder()
  .withCapabilities({ browserName: 'chrome', chromeOptions: { w3c: false } })
  .forBrowser('chrome').build();

  try {
    await driver.get('http://localhost:8000');
  
    setTimeout(async () => {
      await driver.executeScript("document.querySelector('.login-email').value = 'paulo@gmail.com'");
      await driver.executeScript("document.querySelector('.login-pass').value = '123456'");

      setTimeout(async () => {
        await driver.findElement(By.className('login-form')).submit();
      }, 3000);
    }, 3000);
  
  } finally {
    setTimeout(async () => {
      await driver.quit();
      server.close();
      process.exit(0);
    }, 10000)
  }
}

(function runTests() {
  testeDeRegistro();
})();
