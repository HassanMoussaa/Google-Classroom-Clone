const pages = {}

pages.base_url = "http://localhost/googleclone/Google-Classroom-Clone-BE/apis/";

pages.page_success = function(){
    const success = document.getElementById("btn-success")
    console.log(success)
    setTimeout(success.addEventListener("click",  window.location.href="../pages/signin.html"))

}

function handleRadioChange() {
  let answer;
  const radio = document.getElementsByName("option");
  for (let i = 0; i < 2; i++) {
    if (radio[i].checked) {
      return radio[i].value;
    }
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
      if(response.data.status=="success"){
      window.localStorage.setItem("user_id",response.data.user_id)
      window.location.href="../pages/new_password.html" 
      }else
      err.innerText="wrong code"
      
    })
  })


}


pages.page_new_password = function() {
  function isValidPassword(password) {
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return password_pattern.test(password);
  }
  const btn = document.getElementById("btn-next");
  const id = window.localStorage.getItem("user_id");
  const err = document.getElementById("error");
  btn.addEventListener("click", () => {
    const password = document.getElementById("password").value;
    const confirm_password = document.getElementById("confirm_password").value;

    if (isValidPassword(password)) {
      if (password === confirm_password) {
        const data = new FormData();
        data.append("user_id", id);
        data.append("new_password", password);
        data.append("confirm_password", confirm_password);
        axios.post(`${this.base_url}password_reset.php`, data)
          .then((response) => {
            if (response.data.status === "success") {
              err.setAttribute("class", "success");
              err.innerText = `${response.data.message}`;
              // Redirect to the sign-in page after success
              setTimeout(() => {
                window.location.href = "../pages/signin.html";
              }, 3000);
            } else {
              err.innerText = `${response.data.message}`;
            }
          })
          .catch((error) => {
            err.innerText = "An error occurred while processing the request.";
            console.error(error);
          });
      } else {
        err.innerText = "Passwords don't match";
      }
    } else {
      err.innerText =
        "Password should have at least one digit, one lowercase letter, one uppercase letter, and be at least 8 characters long";
    }
  });
};












pages.page_signin = function () {
  const btn = document.getElementById("btn-signin");
  let err = document.getElementById("error");

  btn.addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    data = new FormData();
    data.append("input", email);
    data.append("password", password);

    axios.post(`${this.base_url}sign_in.php`, data)
      .then((response) => {
        console.log(response.data);
        if (
          response.data.status ==
            "Email/Phone number and/or password is incorrect" ||
          response.data.status == "Email/Phone number not found"
        ) {
          err.innerText = "Incorrect credentials";
        } else {
          err.innerText = "";

          // Store user_id and user_type_id in local storage
          window.localStorage.setItem("id", response.data.id);
          const userType = response.data.user_type_id; 
          window.localStorage.setItem("user_type_id", userType);
          console.log("User Type: ", userType);
          window.localStorage.setItem(
            'first_name',response.data.first_name
          )
          window.localStorage.setItem(
            'last_name',response.data.last_name
          )
          window.localStorage.setItem(
            'email',email
          )
          window.location.href="../pages/index.html"

          // Redirect to the appropriate index page based on user_type_id
          if (userType === 2) {
            console.log("User Type: ", userType);
            window.location.href = "../pages/index.html";
          } else if (userType === 1) {
            window.location.href = "../pages/teacher_index.html";
          }
        }
      });
  });
};


// student work 
pages.page_index = function () {
  const btn = document.getElementById("profile")
  btn.addEventListener("click",()=>{
    window.location.href="../pages/profile.html"
  })
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
  const user_id = window.localStorage.getItem('id');
  const apiEndpoint = `get_student_classes.php?id=${user_id}`;
  const fullURL = this.base_url + apiEndpoint;

  // Get Classes
  function getClasses() {
    axios.get(fullURL)
      .then((response) => {
        console.log(response);
        console.log(response.data);
        classesArray = response.data;
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
    });
  }
};

// stream page work student 
pages.page_stream = function () {
 
  const urlParams = new URLSearchParams(window.location.search);
  const classId = urlParams.get("class_id");
  window.localStorage.setItem("class_id",`${classId}`)
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



// people section for student 
pages.page_people_student = function () {
  const urlParams = new URLSearchParams(window.location.search);
  const classId = urlParams.get("class_id");

  const apiEndpoint = `get_enrollment?id=${classId}`;
  const fullURL = this.base_url + apiEndpoint;

  axios
    .get(fullURL)
    .then((response) => {
      const classmatesSection = document.getElementById("classmates-section");
      const body = classmatesSection.querySelector(".body");
      body.innerHTML = ""; 

      if (response.data && response.data.enrollments && response.data.enrollments.length > 0) {
        const enrollments = response.data.enrollments;
        enrollments.forEach((enrollment) => {
          const studentDiv = document.createElement("div");
          studentDiv.classList.add("student");

          const profileImg = document.createElement("img");
          profileImg.classList.add("profile_image");
          profileImg.src = "../assets/profile.png";

          const nameSpan = document.createElement("span");
          nameSpan.classList.add("name");
          nameSpan.textContent = `${enrollment.first_name} ${enrollment.last_name}`;

          studentDiv.appendChild(profileImg);
          studentDiv.appendChild(nameSpan);

          body.appendChild(studentDiv);
        });
      } else {
       
        const noStudentsDiv = document.createElement("div");
        noStudentsDiv.textContent = "No students found.";
        body.appendChild(noStudentsDiv);
      }
    })
    .catch((error) => console.error("Error fetching student data:", error));
};


pages.page_classwork = function(){

  document.addEventListener("DOMContentLoaded", getClasses);

   let assignments_array = [];
   const classId=window.localStorage.getItem("class_id")
   console.log(classId)
   const apiEndpoint = `get_assignments.php?id=${classId}`;
   const fullURL = this.base_url + apiEndpoint;

    function getClasses() {
      axios.get(fullURL)
    .then((response) => {
      console.log(response)
      console.log(response.data)
      assignments_array = response.data;
      displayAssignments();
      
     
    })
    .catch((error) => console.error("Error fetching classes:", error));
}


function displayAssignments() {
  const assignments_container = document.getElementById("assignments-container");
  console.log(assignments_container)
  assignments_container.innerHTML = "";

  assignments_array.forEach((assignment_obj) => {
    const assignment_div = document.createElement("div");
    assignment_div.classList.add("assignments_child");

    
    assignment_div.innerHTML = `
            <div class="book-container">
                <img src="../assets/book.svg" alt="" class="google-container">
            </div>
            <p>${assignment_obj.title}</p>
            <span class="date">${assignment_obj.due_date}</span>
    `;
    
     assignment_div.addEventListener("click", () => {
      navigateToViewAssignment(assignment_obj); 
    });


    assignments_container.appendChild(assignment_div);
  })

  function navigateToViewAssignment(assignment) {
  
  const viewAssignmentPageUrl = `view_assignment.html?id=${assignment.id}&title=${encodeURIComponent(assignment.title)}&due_date=${encodeURIComponent(assignment.due_date)}`;

  window.location.href = viewAssignmentPageUrl;
}







}
}


















// teacher index file work 

pages.page_teacher_index = function () {
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
  const user_id = window.localStorage.getItem('id');
  const class_name = window.localStorage.getItem('name');
  const apiEndpoint = `get_teacher_classes.php?id=${user_id}`;
  const fullURL = this.base_url + apiEndpoint;

  // Get Classes
  function getClasses() {
    axios.get(fullURL)
      .then((response) => {
        console.log(response.data);
        classesArray = response.data;
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
      const class_name = classObj.name;
      localStorage.setItem("className", class_name);
      classDiv.addEventListener("click", () => {
        
        const streamPageURL = `teacher_stream.html?class_id=${classObj.id}`;
       
        window.location.href = streamPageURL;
      });

      classContainer.appendChild(classDiv);
    })
  }

   //work for add class by teacher
document.addEventListener("DOMContentLoaded", () => {
  const popupFormContainer = document.getElementById('popup-form-container');
  const addClassForm = document.getElementById('add-class-form');
  const addButton = document.querySelector('.add-container img');
  const cancelButton = document.getElementById('cancel-btn');

  addButton.addEventListener('click', () => {
    popupFormContainer.style.display = 'block';
  });

  cancelButton.addEventListener('click', () => {
    popupFormContainer.style.display = 'none';
  });

 

  addClassForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('class-name').value;
    const subject = document.getElementById('class-subject').value;
    const section = document.getElementById('class-section').value;
    const room = document.getElementById('class-room').value;

    const user_id = window.localStorage.getItem('id');
    
    const apiEndpoint = 'add_class.php';
    const fullURL = this.base_url + apiEndpoint;
    const requestData = {
      name,
      section,
      subject,
      room,
      user_id,
    };

    axios.post(fullURL, requestData)
      .then((response) => {
        if (response.data.status === 'success') {
          console.log('Class added successfully');
          getClasses();
          document.getElementById('popup-form-container').style.display = 'none';
        } else {
          console.error('Class addition failed:', response.data.message);
        }
      })
      .catch((error) => {
        console.error('Error adding class:', error);
        console.error('An error occurred while adding the class. Please try again.');
        console.log(error.response.data);
      });
  });
});

}





// stream page teacher student

pages.page_teacher_stream = function () {
  const urlParams = new URLSearchParams(window.location.search);
  const classId = urlParams.get("class_id");
  const className = urlParams.get("className");
  console.log(classId);
  console.log(className);
  const apiEndpoint = `get_thread.php?id=${classId}`;
  const fullURL = this.base_url + apiEndpoint;

  // Function to fetch and display the stream data
  function refreshStreamData() {
    axios
      .get(fullURL)
      .then((response) => {
        console.log(response);
        const streamDataArray = response.data;
        console.log(streamDataArray);
        displayStreamData(streamDataArray);
      })
      .catch((error) => console.error("Error fetching stream data:", error));
  }

  // Function to display the stream data
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

 document.addEventListener("DOMContentLoaded", refreshStreamData());
    const announcementForm = document.getElementById("announcement-form");

    announcementForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const textAria = document.getElementById("announcement-content").value;
      const user_id = window.localStorage.getItem("user_id");
      const class_id = window.localStorage.getItem("class_id");
      const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
      const apiUrl = 'http://example.com/api/add_announcement.php';
      const fullURL = proxyUrl + apiUrl;
      console.log(textAria, user_id, class_id)
      const requestData = {
      textAria,
      classId,
      user_id,
    };
    
    axios
      .post(fullURL, requestData)
      .then((response) => {
      
        console.log("Announcement added successfully:", response.data);

        
        announcementForm.reset();

      
        refreshStreamData();
      })
      .catch((error) => {
       
        console.error("Error adding announcement:", error);
      });
  });
};















//script for profile :
pages.page_profile = function() {
  const container = document.getElementById("profile_container");

  
  const greetDiv = document.createElement("div");
  greetDiv.className = "greet";
  greetDiv.innerHTML = `
    <p>Welcome <span>${window.localStorage.getItem("first_name")} ${window.localStorage.getItem("last_name")}</span></p>
  `;

  const emailDiv = document.createElement("div");
  emailDiv.className = "email";
  emailDiv.innerHTML = `
    <p>Your email is <span>${window.localStorage.getItem("email")}</span></p>
    <p>Your first name is <span>${window.localStorage.getItem("first_name")}</span></p>
    <p>Your last name is <span>${window.localStorage.getItem("last_name")}</span></p>
  `;

  const editButton = document.createElement("button");
  editButton.className = "edit";
  editButton.textContent = "Edit";

  
  container.innerHTML = ""; 
  container.appendChild(greetDiv);
  container.appendChild(document.createElement("br"));
  container.appendChild(emailDiv);
  container.appendChild(document.createElement("br"));
  container.appendChild(editButton);

  editButton.addEventListener("click", () => {
    window.location.href = "edit_profile.html";
  });
};


//for editing profile :

pages.page_edit_profile = function () {
  document.addEventListener("DOMContentLoaded", () => {
    const editProfileForm = document.getElementById("edit-profile-form");

    editProfileForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const firstName = document.getElementById("first-name").value;
      const lastName = document.getElementById("last-name").value;
      const phoneNumber = document.getElementById("phone-number").value;

      const requestData = {
        id: window.localStorage.getItem("id"),
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        image_path: "", 
      };

      const apiEndpoint = "update_user.php";
      const fullURL = "http://localhost/Google-Classroom-Clone-BE/" + apiEndpoint;

      axios
        .post(fullURL, requestData)
        .then((response) => {
          if (response.data.status === "success") {
            console.log("Profile updated successfully");

            
            window.localStorage.setItem("email", email);
            window.localStorage.setItem("first_name", firstName);
            window.localStorage.setItem("last_name", lastName);
            
          } else {
            console.error("Profile update failed:", response.data.message);
          }
        })
        .catch((error) => {
          console.error("Error updating profile:", error);
          console.error(
            "An error occurred while updating the profile. Please try again!!"
          );
        });
    });
  });
};






pages.loadFor = (page) => {
    eval("pages.page_" + page + "();")
}









