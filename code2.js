function uploadNewUserData() {
	/*
	Función para hacer una llamada post y publicar el user en la API
	*/
	let newUserName = document.querySelector('#newuser-name').value;
	let newUserSalary = document.querySelector('#newuser-age').value;
	let newUserAge = document.querySelector('#newuser-salary').value;
	var requester = new XMLHttpRequest();
	requester.onreadystatechange = function () {
		if (this.readyState != 4) {
			return
		}
		if (this.status == 200) {
			var objUserData = JSON.parse(this.responseText);
			getNewUser(objUserData);

		}
	}
	requester.open("POST", "http://dummy.restapiexample.com/api/v1/create", true);
	requester.setRequestHeader('Content-Type', 'application/json');
	requester.send(JSON.stringify({
		"name": `${newUserName}`,
		"salary": `${newUserSalary}`,
		"age": `${newUserAge}`
	}));
}
const clickNewUserButton = document.querySelector('#newuser-submit-button');
clickNewUserButton.addEventListener('click', uploadNewUserData);

function getNewUser(objUserData) {
	console.log(objUserData);
	/*
	Función para crear un nuevo usuario con el botón add new user
	*/
	const userDataCard = document.querySelectorAll('body > div > div.user-card')[0];
	userDataCard.innerHTML +=
		`
    <div class="row justify-content-md-center card-user">
      <div class="col col-lg-4">
        <div class="card">
          <h5 class="card-header" id="user-name"><i class="fas fa-user-tag"></i> USERNAME: ${objUserData["name"]}</h5>
          <div class="card-body">
            <h5 class="card-title" id="user-salary"><i class="fas fa-money-check-alt"></i> Salary: ${objUserData["salary"]} euros</h5>
            <p class="card-text" id="user-age"><i class="fas fa-glass-cheers"></i> Age: ${objUserData["age"]}</p>
            <p class="card-text" id="user-id"><i class="fas fa-passport"></i> ID: ${objUserData["id"]}</p>
          </div>
        </div>
      </div>
      <div class="col-md-auto align-buttons">
        <a href="#" class="btn btn-primary edit-user-button" data-toggle="modal" data-target="#edituser-modal"><i class="fas fa-user-edit"></i> Edit</a><br>
        <a href="#" class="btn btn-primary" data-toggle="modal" data-target="#deleteuser-modal"><i class="fas fa-user-slash"></i> Delete</a>
      </div>
    </div>
    `;
    // BIND - eliminar la card de un usuario
    const clickDeleteUserButton = document.querySelectorAll('body > div > div.user-card > div > div.col-md-auto.align-buttons > a.btn.btn-primary.delete-btn.delete-user-button')[0];
    clickDeleteUserButton.addEventListener('click', function() {userDataCard.remove()});
}

function updateUserData(userId) {
	/*
	Función para hacer una llamada PUT para actualizar los datos del usuario
	*/
	let newUserName = document.querySelector('#edituser-name').value;
	let newUserSalary = document.querySelector('#edituser-age').value;
	let newUserAge = document.querySelector('#edituser-salary').value;
	userId = document.querySelector('#edituser-id').value;
	console.log(userId);
	var requester = new XMLHttpRequest();
	requester.onreadystatechange = function () {
		if (this.readyState != 4) {
			return
		}
		if (this.status == 200) {
			var data = JSON.parse(this.responseText);
			console.log(data)
			updateUserCard(newUserName, newUserSalary, newUserAge, userId);
		}
	}
	requester.open("PUT", "http://dummy.restapiexample.com/api/v1/update/" + userId, true);
	requester.setRequestHeader('Content-Type', 'application/json');
	requester.send(JSON.stringify({
		"name": `${newUserName}`,
		"salary": `${newUserSalary}`,
		"age": `${newUserAge}`
	}));
}
// BIND - Al hacer click en el botón del modal se actualiza la info
const clickEditUserButton = document.querySelectorAll('#edituser-submit-button')[0];
clickEditUserButton.addEventListener('click', updateUserData);

function updateUserCard(newUserName, newUserSalary, newUserAge, userId) {
	/*
	Editar la card de un usuario registrado
	*/
	const userDataCard = document.querySelectorAll('body > div > div.user-card')[0];
	userDataCard.innerHTML +=
		`
  <div class="row justify-content-md-center card-user">
    <div class="col col-lg-4">
      <div class="card">
        <h5 class="card-header" id="user-name"><i class="fas fa-user-tag"></i> USERNAME: ${newUserName}</h5>
        <div class="card-body">
          <h5 class="card-title" id="user-salary"><i class="fas fa-money-check-alt"></i> Salary: ${newUserSalary} euros</h5>
          <p class="card-text" id="user-age"><i class="fas fa-glass-cheers"></i> Age: ${newUserAge}</p>
          <p class="card-text" id="user-id"><i class="fas fa-passport"></i> ID: ${userId}</p>
        </div>
      </div>
    </div>
    <div class="col-md-auto align-buttons">
      <a href="#" class="btn btn-primary" data-toggle="modal" data-target="#edituser-modal" id="edit-user-button"><i class="fas fa-user-edit"></i> Edit</a><br>
      <a href="#" class="btn btn-primary" data-toggle="modal" data-target="#deleteuser-modal"><i class="fas fa-user-slash"></i> Delete</a>
    </div>
  </div>
  `;
}

function deleteUserData(userId) {
	/*
	Función para eliminar el usuario en la API
	*/
	userId = document.querySelector('#deleteuser-id').value;
	console.log(userId);
	var requester = new XMLHttpRequest();
	requester.onreadystatechange = function () {
		if (this.readyState != 4) {
			return
		}
		if (this.status == 200) {
			var data = JSON.parse(this.responseText);
			const deleteAlertPos = document.querySelectorAll('body > div > div.user-card')[0];
			const deleteAlertCont = `<div class="alert alert-danger" role="alert" id="delete-alert">${data["success"]["text"]}</div>`;
			const position = "afterend";
			deleteAlertPos.insertAdjacentHTML(position, deleteAlertCont);
			setTimeout(function () {
				document.querySelector('#delete-alert').remove();
			}, 3000);
		}
	}
	requester.open("DELETE", "http://dummy.restapiexample.com/api/v1/delete/" + userId, true);
	requester.send();
}
// BIND - Se ejecuta al realizar click en el formulario modal delete
const deleteButton = document.querySelector('#deleteuser-button');
deleteButton.addEventListener('click', deleteUserData);



// Lo que nos falta identificar el id para subirlo a la api
// Hacer que el sistema reconozca código html que es inyectado vía js
// Que reaccione ante los botones y que sepa que hay un elemento nuevo creado
// Existe la manera de trabajar con selectores dinámicos?
