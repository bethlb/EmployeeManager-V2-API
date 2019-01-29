// Set individual field
module.exports = (Page, field, fieldValue) => {
        Page
                .getValue(field, function(result) {
                        for (c in result.value) {
                            Page.setValue(field, "\u0008")
                        }
                    })                
                .setValue(field, fieldValue)
}
