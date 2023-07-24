const pages = {}

pages.base_url = "http://localhost/googleclone/Google-Classroom-Clone-BE/apis/";

pages.page_success = function(){
    const success = document.getElementById("btn-success")
    console.log(success)
    setTimeout(success.addEventListener("click",  window.location.href="../pages/signin.html"))

}
pages.page_signup = function(){
    function isValidEmail(email) {
        const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return email_pattern.test(email);
      }
    function isValidPassword(password) {
        const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return password_pattern.test(password);
      }
    function isValidPhone(number) {
        const number_pattern = /^\+[0-9]+$/;
        return number_pattern.test(number);
      }
    function isNotEmpty(name){
        if (name.trim() !== "") {
            return true
          } else {
            return false
          }
    }
  
    function handleRadioChange(){
        const radio = document.getElementsByName("option")
        for(let i=0;i<2;i++){
            if (radio[i].checked){
            return(radio[i].value)
          }
        }
  
    }

    function move(){
      window.location.href="../pages/signin.html" 
     }
      const btn = document.getElementById("btn-signup")
      let err = document.getElementById("error")

      btn.addEventListener("click",()=>{
        const first_name = document.getElementById("first_name").value
        const last_name = document.getElementById("last_name").value
        const phone_number = document.getElementById("phone_number").value
        const email = document.getElementById("email").value
        const password = document.getElementById("password").value
 
        
      if (isValidEmail(email)){
        err.innerText=""
        if(isValidPassword(password)){
            err.innerText=""
            if(isValidPhone(phone_number)){
                err.innerText=""
                if(isNotEmpty(first_name)){
                    err.innerText=""
                    if(isNotEmpty(last_name)){
                        err.innerText=""
                        if(handleRadioChange()){
                            const user_type = handleRadioChange()
                            console.log(user_type)
                            err.innerText=""
                            data = new FormData()
                            data.append("email",email)
                            data.append("password",password)
                            data.append("first_name",first_name)
                            data.append("last_name",last_name)
                            data.append("phone_number",phone_number)
                            data.append("image_path","")
                            data.append("user_type",user_type)

                                 axios.post(`${this.base_url}signup.php`,data)
                                  .then((response) => {
                                    console.log( response.data);
                                    if(response.data.status =="failed")
                                    err.innerText="Email or phone number already exist"
                                    else{
                                      err.setAttribute("class","success")
                                      err.innerText="created successfully!"
                                      setTimeout(move,2000)
                                       
                                    }
                                    })


                        }else(err.innerText="choose a type")

                    }else err.innerText="last name is empty"
                }else err.innerText="first name is empty"
            }else{
                err.innerText="phone number should be similiar to +96103204070"
            }
        }else{
            err.innerText="passsword should have at least one digit, one lowercase letter, one uppercase letter, and be at least 8 characters long"
        }
      }else{
        err.innerText="email should be similiar to username@example.com"
      }
      })




}
pages.page_signin = function () {

    const btn = document.getElementById("btn-signin")
    let err = document.getElementById("error")

    btn.addEventListener("click", () =>{
        const email = document.getElementById("email").value
        const password = document.getElementById("password").value

        data = new FormData();
        data.append("input",email)
        data.append("password",password)

        axios.post(`${this.base_url}sign_in.php`,data)
        .then((response) => {
         console.log( response.data);
         if(response.data.status=="Email/Phone number and/or password is incorrect" || response.data.status=="Email/Phone number not found")
          err.innerText="incorrect credentials"
          else{
            err.innerText=""
            window.localStorage.setItem(
              'id',response.data.id
            )
            window.localStorage.setItem(
              'user_type_id',response.data.user_type_id
            )
            window.location.href="../pages/index.html"
         }
         })

  

    })
}
pages.page_forgot_password = function(){
  function move(){
    window.location.href="../pages/token.html" 
   }
  const err = document.getElementById("error")
  const btn = document.getElementById("btn-retrieve")
  btn.addEventListener("click",()=>{
    const email = document.getElementById("email").value
    data = new FormData()
    data.append("email",email)
    axios.post(`${this.base_url}forget_password_init.php`,data)
    .then((response)=>{
      if(response.data.message == "no such email")
      err.innerText="invalid email"
      else{
        err.setAttribute("class","success")
        err.innerText=`Password reset token sent to your email`
        setTimeout(move,3000)
     
        console.log(response.data.message)
     
        localStorage.setItem("token",response.data.token)
      }
    })

  })

}
pages.page_token=function(){
  const btn = document.getElementById("submit")
  const err = document.getElementById("error")

  
  btn.addEventListener("click",()=>{
    const code = document.getElementById("token").value
    data = new FormData()
    data.append("code",code)
    axios.post(`${this.base_url}validate_code.php`,data)
    .then((response)=>{
      if(response.data.status=="success")
      err.innerText=response.data.password
      else
      err.innerText="wrong token"
      
    })
  })


}
pages.page_index=function (){
  const menuButton = document.getElementById('menu');
  const sideMenu = document.getElementById('side-menu');
  menuButton.addEventListener('click', () => {
  sideMenu.classList.toggle('active');
});
  document.addEventListener('click', (event) => {
  const targetElement = event.target;
  if (!sideMenu.contains(targetElement) && targetElement !== menuButton) {
    sideMenu.classList.toggle('inactive');
  }
});
}
pages.page_class = function(){
  const menuButton = document.getElementById('menu');
  const sideMenu = document.getElementById('side-menu');
  menuButton.addEventListener('click', () => {
  sideMenu.classList.toggle('active');
});
  document.addEventListener('click', (event) => {
  const targetElement = event.target;
  if (!sideMenu.contains(targetElement) && targetElement !== menuButton) {
    sideMenu.classList.toggle('inactive');
  }
});
function addBorderBottom(element) {
  element.classList.toggle('active');
}
}
pages.loadFor = (page) => {
    eval("pages.page_" + page + "();")
}

//





