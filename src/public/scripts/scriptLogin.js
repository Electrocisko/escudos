const form = document.getElementById('register-form')


form.addEventListener('submit',evt=>{
    evt.preventDefault();
    const nick = form.nick.value;
    const password = form.password.value;
    if(!nick || !password) alert('Datos incompletos');
    const obj = {
        nick,
        password
    };
    fetch('/api/players/login',{
        method:'POST',
        body:JSON.stringify(obj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(result=>result.json()).then(json=>{
        console.log(json)
        console.log('sessions', req.session.nick)
    });
    form.reset();
})