// Check button is disabled
module.exports = (Page, button) => {
        Page
                .expect.element(button).to.have.attribute('disabled')
}
