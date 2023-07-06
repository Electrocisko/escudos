const form = document.getElementById('register-form')


form.addEventListener('submit',evt=>{
    evt.preventDefault();
    const nick = form.nick.value;
    const password = form.password.value;
    const checkPassword = form.checkPassword.value;
    if(!nick || !password || !checkPassword) alert('Datos incompletos');
    if (password != checkPassword) alert('Password no coinciden');
    const obj = {
        nick,
        password,
        checkPassword
    };
    fetch('api/players',{
        method:'POST',
        body:JSON.stringify(obj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(result=>result.json()).then(json=>console.log(json));
    form.reset();
})