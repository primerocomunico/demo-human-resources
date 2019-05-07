// FUNCIONES

function getNewUser () {
  /*
  Función para crear un nuevo usuario con el botón add new user
  */
  let newUserName = document.querySelector('#newuser-name').value;
  let newUserSalary = document.querySelector('#newuser-age').value;
  let newUserAge = document.querySelector('#newuser-salary').value;
  const userDataCard = document.querySelectorAll('#user-card')[0];
  userDataCard.innerHTML +=
  `
  <div class="row">
    <div class="col">
      <div class="card">
        <h5 class="card-header" id="user-name"><i class="fas fa-user-tag"></i> ${newUserName}</h5>
        <div class="card-body">
          <h5 class="card-title" id="user-salary"><i class="fas fa-money-check-alt"></i> ${newUserSalary}</h5>
          <p class="card-text" id="user-age"><i class="fas fa-glass-cheers"></i> ${newUserAge}</p>
        </div>
      </div>
    </div>
    <div class="col">
      <a href="#" class="btn btn-primary edit-user-button" data-toggle="modal" data-target="#edituser-modal"><i class="fas fa-user-edit"></i> Edit</a><br>
      <a href="#" class="btn btn-primary delete-user-button"><i class="fas fa-user-slash"></i> Delete</a>
    </div>
  </div>
  `;
  // BIND - eliminar la card de un usuario
  const clickDeleteUserButton = document.querySelectorAll('#user-card > div > div > a.btn.btn-primary.delete-user-button')[0];
  clickDeleteUserButton.addEventListener('click', deleteCard);
  function deleteCard () {
    console.log("deleted");
    userDataCard.innerHTML = `<div></div>`
    return;
  }
  uploadNewUserData(newUserName, newUserSalary, newUserAge);
}

function uploadNewUserData(newUserName, newUserSalary, newUserAge) {
    /*
    Función para hacer una llamada post y publicar el user en la API
    */
    var requester = new XMLHttpRequest();
  requester.onreadystatechange = function () {
      if (this.readyState != 4) {return}
      if (this.status == 200) {
        let objUserData = JSON.parse(this.responseText);
        console.log(objUserData);
      }
  }
  requester.open("POST", "http://dummy.restapiexample.com/api/v1/create", true);
  requester.setRequestHeader('Content-Type', 'application/json');
  requester.send(JSON.stringify({
    "name":`${newUserName}`,
    "salary":`${newUserSalary}`,
    "age":`${newUserAge}`
  }));
  }
  // BIND - ejecutar la acción de crear un nuevo usuario
  const clickNewUserButton = document.querySelector('#newuser-submit-button');
  clickNewUserButton.addEventListener('click', getNewUser);

  function updateUserData(objUserData) {
    /*
    Función para hacer una llamada PUT para actualizar los datos del usuario
    */
    console.log(objUserData);
    let idUser = objUserData["id"];
    console.log(idUser);
    var requester = new XMLHttpRequest();
  requester.onreadystatechange = function () {
      if (this.readyState != 4) {return}
      if (this.status == 200) {
          var data = JSON.parse(this.responseText);
      console.log(data)
      }
  }
  let newUserName = document.querySelector('#edituser-name').value;
  let newUserSalary = document.querySelector('#edituser-age').value;
  let newUserAge = document.querySelector('#edituser-salary').value;
  requester.open("PUT", "http://dummy.restapiexample.com/api/v1/update/" + '"' + idUser + '"', true);
  requester.setRequestHeader('Content-Type', 'application/json');
  requester.send(JSON.stringify({
      "name":`${newUserName}`,
      "salary":`${newUserSalary}`,
      "age":`${newUserAge}`
  }));
  //updateUserCard(newUserName, newUserSalary, newUserAge);
  }

  // BIND - Llama a la función edituser al hacer click en el botón edit
  const clickEditUserButton = document.querySelectorAll('#edituser-submit-button')[0];
  clickEditUserButton.addEventListener('click', updateUserData);

  function updateUserCard(newUserName, newUserSalary, newUserAge) {
    /*
    Editar la card de un usuario registrado
    */
    const userDataCard = document.querySelectorAll('#user-card')[0];
    userDataCard.innerHTML +=
    `
    <div class="row">
      <div class="col">
        <div class="card">
          <h5 class="card-header" id="user-name"><i class="fas fa-user-tag"></i> ${newUserName}</h5>
          <div class="card-body">
            <h5 class="card-title" id="user-salary"><i class="fas fa-money-check-alt"></i> ${newUserSalary}</h5>
            <p class="card-text" id="user-age"><i class="fas fa-glass-cheers"></i> ${newUserAge}</p>
          </div>
        </div>
      </div>
      <div class="col">
        <a href="#" class="btn btn-primary" data-toggle="modal" data-target="#edituser-modal" id="edit-user-button"><i class="fas fa-user-edit"></i> Edit</a><br>
        <a href="#" class="btn btn-primary" id="delete-user-button"><i class="fas fa-user-slash"></i> Delete</a>
      </div>
    </div>
    `;
  }




//
