let btnAction = document.getElementById('btn-login');
let mail=document.getElementById('email');
let pass=document.getElementById('pass');

btnAction.addEventListener('click', ()=>{
    /*let data = new FormData();
    data.append('mail', mail.value);
    data.append('pass', pass.value);*/
    console.log('Request to the API');
    fetch('http://localhost:666/login', {
        method: 'POST',
        body: `{"mail": "${mail.value}", "pass": "${pass.value}"}`,
        headers: {
            'Content-Type': "application/json"
        }
    }).then((res)=>{
        console.log(res);
        if(res.status==200){
            res.json().then((data)=>{
                localStorage.setItem('user', data);
                localStorage.setItem('name', data.name);
                console.log(data);
            })
            
            location.href= "./home.html";
        }else{
            alert('Email or password not valid');
        }
    })
});