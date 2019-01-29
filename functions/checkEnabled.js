// Check button is enabled
module.exports = (Page, button) => {
        Page
                .expect.element(button).to.not.have.attribute('disabled')
}
