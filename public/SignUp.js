$(document).ready(function() {
    let btn= $('#btn');
    let inp=$('#name');
    let cp=$('#company');
    let email=$('#email');
    let tz=$('#timezone');
    btn.click(function () {
        saveEmployee(inp.val(),email.val(),cp.val(),tz.val())
    })
});
function saveEmployee(name,email,company,timezone) {
    $.ajax({
        url: '/api/users/register',
        method: 'post',
        data: {
            name:name,
            email:email,
            company: company,
            timezone:timezone
        },
        success: function() {


        }
    })
}
