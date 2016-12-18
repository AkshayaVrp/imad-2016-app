
function userSignUp() {

    
    //var register = document.getElementById('register_btn');
    //console.log(register);
    //register.onclick = function () {
        // Create a request object
        var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200) {
                  alert('User created successfully');
                  //register.value = 'Registered!';
              } else {
                  alert('Could not register the user');
                  //register.value = 'Register';
              }
          }
        };
        
        // Make the request
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
         if (username == '' || password == '') {
        // Inform the user on the screen through some message or give him a alert message
        alert("Username/Password field can't be left empty");
        return;
        }
        console.log(username);
        console.log(password);
        request.open('POST', '/create-user', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({username: username, password: password}));  
        //register.value = 'Registering...';
    
    //};
}


function userLogin(){


	// Submit username/password to login
    //var submit = document.getElementById('login_btn');
    //cons
    //submit.onclick = function () {
        // Create a request object
        var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200) {
                  //submit.value = 'Sucess!';
                  loadLogin();
              } else if (request.status === 403) {
                  //submit.value = 'Invalid credentials. Try again?';
                  alert('Invalid credentials. Try again?');
              } else if (request.status === 500) {
                  //alert('Something went wrong on the server');
                  //submit.value = 'Login';
              } else {
                  //alert('Something went wrong on the server');
                  //submit.value = 'Login';
              }
              loadLogin();
              
          }  
          // Not done yet
        };
        
        // Make the request
        var username = document.getElementById('logusername').value;
        var password = document.getElementById('logpassword').value;
         if (username == '' || password == '') {
        // Inform the user on the screen through some message or give him a alert message
        alert("Username/Password field can't be left empty");
        return;
        }
        console.log(username);
        console.log(password);
        request.open('POST', '/login', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({username: username, password: password}));  
        //submit.value = 'Logging in...';
        
    //};


}


function escapeHTML (text)
{
    var $text = document.createTextNode(text);
    var $div = document.createElement('div');
    $div.appendChild($text);
    return $div.innerHTML;
}


function loadLogin () {
    // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                loadLoggedInUser(this.responseText);
            } else {
                console.log("loadLogin failed")//loadLoginForm();
            }
        }
    };
    
    request.open('GET', '/check-login', true);
    request.send(null);
}

function loadLoggedInUser (username) {
    var loginArea = document.getElementById('login_area');
    loginArea.innerHTML = `
        <h3> Hi <i>${escapeHTML(username)}</i></h3>
        <h4>Publish your Article or comment on exisiting articles</h4>
         <a href="/publish-article"><button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--primary" type="submit">
                            Publish Article
         </button></a>
        <a href="/logout"><button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" type="submit">
                            Logout
         </button></a>
        
    `;
}



function loadArticles () {
        // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            var articles = document.getElementById('articles');
            if (request.status === 200) {
                var content = '<ul class="demo-list-three mdl-list" style="width: 650px">';
                var articleData = JSON.parse(this.responseText);
                for (var i=0; i< articleData.length; i++) {
                    // content += `<li>
                    // <a href="/articles/${articleData[i].title}">${articleData[i].heading}</a>
                    // Published on:
                    // ${articleData[i].date.split('T')[0]} Author:${articleData[i].author}</li>`;


                    content += `
                     <li class="mdl-list__item mdl-list__item--three-line">
                      <span class="mdl-list__item-primary-content">
                          <i class="material-icons mdl-list__item">person</i>
                          <span><a href="/articles/${articleData[i].title}">${escapeHTML(articleData[i].heading)}</a></span>
                        <span class="mdl-list__item-text-body">
                        Published on:
                          ${escapeHTML(articleData[i].date.split('T')[0])} Author:${escapeHTML(articleData[i].author)}
                        </span>
                      </span>
                    <span class="mdl-list__item-secondary-content">
                      <a class="mdl-list__item-secondary-action" href="#"><i class="material-icons">star</i></a>
                    </span>
                  </li>
                    `
                }
                content += "</ul>";
                articles.innerHTML = content;
            } else {
                articles.innerHTML('Sorry! Could not load all articles!');
            }
        }
    };
    
    request.open('GET', '/get-articles', true);
    request.send(null);
}






loadLogin();

loadArticles();





// The first thing to do is to check if the user is logged in!





//loadLoginForm();