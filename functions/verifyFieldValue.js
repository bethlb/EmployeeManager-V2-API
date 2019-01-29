// Verify individual field
module.exports = (Page, field, text) => {
        Page
                .verify.value(field, text)
}
