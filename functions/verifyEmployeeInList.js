// Verify employee name is in left hand employee list
module.exports = (Page, employeeElement, employeeName) => {
        Page
                .expect.element(employeeElement).text.to.equal(employeeName)
}
