const pages = {}

pages.base_url = "http://localhost/googleclone/Google-Classroom-Clone-BE/";


pages.getAPI = async (url) =>{
    try{
        return await axios(url)
    }catch(error){
        pages.print_message("Error from GET API: " + error)
    }
}

pages.postAPI = async (api_url, api_data) => {
    try{
        return await axios.post(
            api_url,
            api_data
        );
    }catch(error){
        pages.print_message("Error from Linking (POST)" + error)
    }
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
        let answer
        const radio = document.getElementsByName("option")
        for(let i=0;i<2;i++){
            if (radio[i].checked)
            return(radio[i].value)
        }
  
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
        console.log(handleRadioChange());
        err.innerText=""
        if(isValidPassword(password)){
            err.innerText=""
            if(isValidPhone(phone_number)){
                err.innerText=""
                if(isNotEmpty(first_name)){
                    err.innerText=""
                    if(isNotEmpty(last_name)){
                        err.innerText=""
                        data = new FormData
                        data.append("email",email)
                        data.append("password",password)
                        data.append("first_name",first_name)
                        data.append("last_name",last_name)
                        data.append("phone_number",phone_number)









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

        


    })
}
pages.loadFor = (page) => {
    eval("pages.page_" + page + "();")
}






