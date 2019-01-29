// Verify all form values
module.exports = (Page, employee) => {
        Page
                .verify.value('@nameEntry', employee.name)
                .verify.value('@phoneEntry', employee.phone)
                .verify.value('@emailEntry', employee.email)
                .verify.value('@titleEntry', employee.title)
}
