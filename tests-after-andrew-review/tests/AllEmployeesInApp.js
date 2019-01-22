module.exports = {
    beforeEach : browser => {
        browser.url('https://devmountain-qa.github.io/employee-manager/1.1_Version/index.html')
        .waitForElementVisible('.titleBar', 5000)
    },
    after : browser => {
        browser.end()
    },
    'QOBB-56 Check all employee names correct after initial app load': browser => {
        browser.expect.element('.listContainer > li:nth-child(1)').text.to.equal('Bernice Ortiz').before(5000)
        browser.expect.element('.listContainer > li:nth-child(2)').text.to.equal('Marnie Barnett').before(5000)
        browser.expect.element('.listContainer > li:nth-child(3)').text.to.equal('Phillip Weaver').before(5000)
        browser.expect.element('.listContainer > li:nth-child(4)').text.to.equal('Teresa Osborne').before(5000)
        browser.expect.element('.listContainer > li:nth-child(5)').text.to.equal('Dollie Berry').before(5000)
        browser.expect.element('.listContainer > li:nth-child(6)').text.to.equal('Harriett Williamson').before(5000)
        browser.expect.element('.listContainer > li:nth-child(7)').text.to.equal('Ruby Estrada').before(5000)
        browser.expect.element('.listContainer > li:nth-child(8)').text.to.equal('Lou White').before(5000)
        browser.expect.element('.listContainer > li:nth-child(9)').text.to.equal('Eve Sparks').before(5000)
        browser.expect.element('.listContainer > li:nth-child(10)').text.to.equal('Lois Brewer').before(5000)
        }   
    }