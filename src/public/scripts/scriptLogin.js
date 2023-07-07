

const form = document.getElementById('register-form')


form.addEventListener('submit',evt=>{
    evt.preventDefault();
    const nick = form.nick.value;
    const password = form.password.value;
    if(!nick || !password) return alert('Datos incompletos');
    const obj = {
        nick,
        password
    };
    fetch('/api/sessions/login',{
        method:'POST',
        body:JSON.stringify(obj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(result=>result.json()).then(data=>{
        console.log(data)
        if (data.status=='error') alert(data.message)
        
        location.href = '/'
        
    });
   
    form.reset();
})