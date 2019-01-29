module.exports = (Page, text) => {
        Page
                .useXpath()
                .click(`//*[text()="${text}"]`)
                .useCss()
                .pause(2500)
}

