const form = document.getElementById('register-form')


form.addEventListener('submit',evt=>{
    evt.preventDefault();
    const nick = form.nick.value;
    const password = form.password.value;
    const checkPassword = form.checkPassword.value;
    if(!nick || !password || !checkPassword) return Swal.fire('Complete todos los campos');
    if (password != checkPassword) return Swal.fire('No coinciden los passwords');
    const obj = {
        nick,
        password,
        checkPassword
    };
    fetch('api/sessions/register',{
        method:'POST',
        body:JSON.stringify(obj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(result=>result.json())
    .then(json=>{
        console.log(json)
        if (json.status == "success") {
            location.href = '/'
        } else {
            Swal.fire(json.message);
        }
    });
    
    form.reset();
})