const forgotPasswordForm = document.querySelector('#forgot-password');

forgotPasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = forgotPasswordForm.querySelector('input').value;

    const emailInput = {"email": email};

    // const email = { "email": "johndoe@supreme-concepts.com" }

    fetch('https://api.lancers.app/v1/auth/forgot-password', {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "User-Agent": "Developers Lancers",
        },
        // body: JSON.stringify({email})
        body: JSON.stringify(emailInput)
    })
        .then(res => res.json() )
        // .then(data => console.log(data))
        .then((data) => {
            console.log(data);
            if(data.status === 'success') {
              $("#forgot-password")[0].reset();
              $('#exampleModal').modal();
            } else {
              showAlert(data.error)
            }
          })
        .catch(err => console.log(err));
})
