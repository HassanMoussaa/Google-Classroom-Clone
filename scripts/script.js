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
        let answer
        const radio = document.getElementsByName("option")
        for(let i=0;i<2;i++){
            if (radio[i].checked){
            return(radio[i].value)
        }
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
                                        window.location.href="../pages/created_successfully.html"
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

pages.page_forgot_password = function(){
  function move(){
    window.location.href="../pages/code.html" 
   }
  const err = document.getElementById("error")
  const btn = document.getElementById("btn-retrieve")
  btn.addEventListener("click",()=>{
    const email = document.getElementById("email").value
    data = {"email":`${email}`}
    // data.append("email",email)
    axios.post(`${this.base_url}forget_password_init.php`,data)
    .then((response)=>{
      if(response.data.message == "no such email")
      err.innerText="invalid email"
      else{
        err.setAttribute("class","success")
        err.innerText=`Password reset code sent to your email`
        setTimeout(move,3000)
     
        console.log(response.data.message)
     
        
      }
    })

  })

}



pages.page_code=function(){
  const btn = document.getElementById("submit")
  const err = document.getElementById("error")

  
  btn.addEventListener("click",()=>{
    const code = document.getElementById("code").value
    data = {"code":`${code}`}
    // data.append("code",code)
    axios.post(`${this.base_url}validate_code.php`,data)
    .then((response)=>{
      if(response.data.status=="success")
      err.innerText=response.data.password
      else
      err.innerText="wrong code"
      
    })
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




document.addEventListener("DOMContentLoaded", getClasses);

   let classesArray = [];
   const user_id=window.localStorage.getItem('id')
   const apiEndpoint = `get_student_classes.php?id=${user_id}`;
   const fullURL = this.base_url + apiEndpoint;

    // Get Classes
    function getClasses() {
      
      axios.get(fullURL)
    .then((response) => {
      console.log(response)
      console.log(response.data)
      classesArray = response.data.classes;
      displayClasses();
      
     
    })
    .catch((error) => console.error("Error fetching classes:", error));
}


function displayClasses() {
  const classContainer = document.querySelector(".classes-container");
  classContainer.innerHTML = "";

  classesArray.forEach((classObj) => {
    const classDiv = document.createElement("div");
    classDiv.classList.add("class");

    
    classDiv.innerHTML = `
    <div class="class-header"> 
      <img class="image-overlay" src="../assets/flowers.jpg" alt="" />
      <div class="text-overlay">
        <p class="title">${classObj.name}</p>
        <p class="section">${classObj.section}</p>
        <p class="subject">${classObj.subject}</p>
        <p class="room">${classObj.room}</p>
      </div>
      </div>
    `;



    classDiv.addEventListener("click", () => {
      // the URL for the stream page, passing the class ID as a parameter
      const streamPageURL = `stream.html?class_id=${classObj.id}`;
      
      //  to the stream page
      window.location.href = streamPageURL;
    });
    
    classContainer.appendChild(classDiv);
  })

}


}

// stream page work
pages.page_stream = function () {
 
  const urlParams = new URLSearchParams(window.location.search);
  const classId = urlParams.get("class_id");
  console.log(classId)

  const apiEndpoint = `get_thread.php?id=${classId}`;
  const fullURL = this.base_url + apiEndpoint;

 
  axios
    .get(fullURL)
    .then((response) => {
      console.log(response);
      const streamDataArray = response.data;
       console.log(streamDataArray)
      displayStreamData(streamDataArray);
    })
    .catch((error) => console.error("Error fetching stream data:", error));
};

function displayStreamData(streamDataArray) {
  const streamContainer = document.getElementById("stream-container");
  streamContainer.innerHTML = "";

  streamDataArray.forEach((streamData) => {
    // Create elements to display the stream data
    const streamDiv = document.createElement("div");
    streamDiv.classList.add("stream-item");

    const postTitle = document.createElement("h2");
    postTitle.textContent = streamData.Post;

    const postAuthor = document.createElement("p");
    postAuthor.textContent = `${streamData.first_name} ${streamData.last_name}`;

    const postPublished = document.createElement("p");
    postPublished.textContent = `Published: ${streamData.Published}`;

    streamDiv.appendChild(postTitle);
    streamDiv.appendChild(postAuthor);
    streamDiv.appendChild(postPublished);

    streamContainer.appendChild(streamDiv);
  });
}








pages.loadFor = (page) => {
    eval("pages.page_" + page + "();")
}







