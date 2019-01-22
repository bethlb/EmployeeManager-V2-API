module.exports = {
    beforeEach : browser => {
        browser.url('https://devmountain-qa.github.io/employee-manager/1.1_Version/index.html')
        .waitForElementVisible('.titleBar', 5000)
    },      
    after : browser => {
        browser.end()
    },

    'QOBB-59 No Save': browser => {
        // browser.getText('li[name="employee1"]', function(result) {
        // console.log(result.value);
        // });        
        
        // Click on employee and enter new values for all fields, but do not Save
        browser.click('li[name="employee1"]')
        browser.clearValue('input[name="nameEntry"]')
        browser.setValue('input[name="nameEntry"]','Homer Simpson')
        browser.clearValue('input[name="phoneEntry"]')
        browser.setValue('input[name="phoneEntry"]','1234567890')
        browser.clearValue('input[name="titleEntry"]')
        browser.setValue('input[name="titleEntry"]','Manager')
        // Expect name on left hand selection list to be original employee name
        browser.expect.element('li[name="employee1"]').text.to.equal('Bernice Ortiz')
        // Click on another employee name and verify name on left is still original employee name
        browser.click('li[name="employee2"]')
        browser.expect.element('li[name="employee1"]').text.to.equal('Bernice Ortiz')
        browser.click('li[name="employee1"]')
        browser.verify.value('input[name="nameEntry"]','Bernice Ortiz')
        browser.verify.value('input[name="phoneEntry"]','4824931093')
        browser.verify.value('input[name="titleEntry"]','CEO') 
    },  

    'QOBB-59 Single Save': browser => {
        // Click on employee and set new values for all fields; then Save

        // Note: Initially tried clearing all 3 values and then setting all 3 values; but values were
        // not getting set correctly.  Worked around by clearing, then setting values for each field 
        // individually.  Seems to be a nightwatch problem.
        
        browser.click('li[name="employee2"]')
        browser.clearValue('input[name="nameEntry"]')
        browser.setValue('input[name="nameEntry"]','Homer Simpson')
        browser.clearValue('input[name="phoneEntry"]')
        browser.setValue('input[name="phoneEntry"]','1234567890')
        browser.clearValue('input[name="titleEntry"]') 
        browser.setValue('input[name="titleEntry"]','Manager')
        browser.click('#saveBtn')
        // Verify the name on the selection list is updated and all new field values have been set
        browser.expect.element('li[name="employee2"]').text.to.equal('Homer Simpson')
        browser.verify.value('input[name="nameEntry"]','Homer Simpson')
        browser.verify.value('input[name="phoneEntry"]','1234567890')
        browser.verify.value('input[name="titleEntry"]','Manager')           
        // Edit all fields again but do not click Save
        browser.click('li[name="employee2"]')
        browser.clearValue('input[name="nameEntry"]')
        browser.setValue('input[name="nameEntry"]','Marge Simpson')
        browser.clearValue('input[name="phoneEntry"]')
        browser.setValue('input[name="phoneEntry"]','2323232323')
        browser.clearValue('input[name="titleEntry"]') 
        browser.setValue('input[name="titleEntry"]','CFO')
        // Verify the Save and Cancel buttons go Active
        browser.expect.element('#saveBtn').to.not.have.attribute('disabled')
        browser.expect.element('button[name="cancel"]').to.not.have.attribute('disabled')
        // Click on a different employee; then click on the first employee again; Verify fields have saved 
        // values; not the recently added values that weren't saved.
        browser.click('li[name="employee3"]')
        browser.click('li[name="employee2"]')
      },
      
      'QOBB-59 Double Save': browser => {
        // Click on employee and set new values for all fields; then Save
        browser.click('li[name="employee4"]')
        browser.clearValue('input[name="nameEntry"]')
        browser.setValue('input[name="nameEntry"]','Homer Simpson')
        browser.clearValue('input[name="phoneEntry"]')
        browser.setValue('input[name="phoneEntry"]','1234567890')
        browser.clearValue('input[name="titleEntry"]') 
        browser.setValue('input[name="titleEntry"]','Manager')
        browser.click('#saveBtn')
        // Edit all fields again, Verify the Save and Cancel buttons go Active; Click Save
        browser.click('li[name="employee4"]')
        browser.clearValue('input[name="nameEntry"]')
        browser.setValue('input[name="nameEntry"]','Marge Simpson')
        browser.clearValue('input[name="phoneEntry"]')
        browser.setValue('input[name="phoneEntry"]','2323232323')
        browser.clearValue('input[name="titleEntry"]') 
        browser.setValue('input[name="titleEntry"]','CFO')
        browser.pause(5000)
        browser.expect.element('#saveBtn').to.not.have.attribute('disabled')
        browser.expect.element('button[name="cancel"]').to.not.have.attribute('disabled')
        browser.click('#saveBtn')
        // Click on a different employee; then click on the original employee again; verify fields have second 
        // saved values   
        browser.click('li[name="employee5"]')
        browser.click('li[name="employee4"]')
        browser.verify.value('input[name="nameEntry"]','Marge Simpson')
        browser.verify.value('input[name="phoneEntry"]','2323232323')
        browser.verify.value('input[name="titleEntry"]','CFO')   

      },

      // This automation fails; times out waiting for visible element after re-opening?
  'QOBB-59 Saved values persist after exit and re-enter application': browser => {
      browser.pause(1000)
        browser.refresh()
        
        // Already in the beforeEach
        // browser.url('https://devmountain-qa.github.io/employee-manager/1.0_Version/index.html')
        // browser.waitForElementVisible('.titleBar', 5000)

        browser.click('li[name="employee-4"]')
        browser.verify.value('input[name="nameEntry"]','Marge Simpson')
        browser.verify.value('input[name="phoneEntry"]','2323232323')
        browser.verify.value('input[name="titleEntry"]','CFO')   
      }, 


    }
