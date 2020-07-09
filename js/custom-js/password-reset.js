const resetPasswordBtn = document.querySelector('#resetPassBtn');

resetPasswordBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const password = document.querySelector('#password').value;

    // const newPassword = { "password": "Qwerty123" };
    const newPassword = { "password": password };

    const params = new URLSearchParams(window.location.search)
    let resetToken;
    for (const param of params) {
        // console.log(param[0])
        resetToken = param[0];
    }
    //return token;
    
    console.log(resetToken);
    // fetch(`https://api.lancers.app/v1/auth/reset-password/${resetToken}`, {
    //     method: "PUT",
    //     headers: {
    //         "Content-type": "application/json; charset=UTF-8",
    //         "User-Agent": "Developers Lancers",
    //     },
    //     // body: JSON.stringify({email})
    //     body: JSON.stringify(newPassword)
    // })
    //     .then( res => res.json() )
    //     // .then(data => console.log(data))
    //     .then((data) => {
    //         // console.log(data);
    //         if (data.status === 'success') {
    //             window.location = 'password-success.html';
    //         //   $('#exampleModal').modal();
    //           // document.querySelector('.loaderV2').style.display = 'none'
    //         // } else {
    //         //   showAlert(data.error)
    //         }
    //       })
    //     .catch(err => console.log(err));

    axios({
        method: 'PUT',
        url: `https://api.lancers.app/v1/auth/reset-password/${resetToken}`,
        data: {
          password: newPassword
        }
      })
      .then((res) => {
        submitButton.innerText = 'Login'
        if(res.data.status === 'success') {        
            console.log(res.data);
            // console.log(res.data.data.token);
            // console.log(res.data.data.user);
        //     localStorage.setItem('tpAuth', JSON.stringify({
        //       token: res.data.data.token,
        //       userId: res.data.data.user
        //    }));
    
          return (window.location.href = "/password-success");
    
        } else {
        //   submitButton.innerText = 'Login';
          showAlert(res.error)
        }
      })
      .catch((err) => {
            //  showAlert(err.message)
            console.log('Error', err.message)
      })
})

