// Verify employee name is not in left hand employee list
module.exports = (Page, employeeElement, employeeName) => {
        Page
                .expect.element(employeeElement).text.to.not.equal(employeeName)
}
