let usersData = [];

// Função para fazer uma requisição HTTP GET para a API
function getDataFromApi () {
  fetch("https://localhost:7060/api/Usuario")
    .then((response) => response.json())
    .then((data) => {
      usersData = data; 
      createUsersElements(usersData); 
    })
    .catch((error) => {
      console.error("Ocorreu um erro ao obter os dados da API:", error);
    });
}

// Função para criar os elementos HTML para cada usuário
function createUsersElements (users) {
  const userListDiv = document.getElementById("userList");
  userListDiv.innerHTML = "";

  users.forEach((user) => {
    const userDiv = document.createElement("div");

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.placeholder = "Nome";
    nameInput.value = user.nome;
    nameInput.readOnly = true;
    nameInput.id = `nameInput${user.id}`;
    userDiv.appendChild(nameInput);

    const addressInput = document.createElement("input");
    addressInput.type = "text";
    addressInput.placeholder = "Endereço";
    addressInput.value = user.endereco;
    addressInput.readOnly = true;
    addressInput.id = `addressInput${user.id}`;
    userDiv.appendChild(addressInput);

    const emailInput = document.createElement("input");
    emailInput.type = "text";
    emailInput.placeholder = "E-mail";
    emailInput.value = user.email;
    emailInput.readOnly = true;
    emailInput.id = `emailInput${user.id}`;
    userDiv.appendChild(emailInput);

    const editButton = document.createElement("button");
    editButton.innerText = "Editar";
    editButton.addEventListener("click", () =>
      enableEditMode(nameInput, addressInput, emailInput)
    );
    userDiv.appendChild(editButton);

    const saveButton = document.createElement("button");
    saveButton.innerText = "Salvar";
    saveButton.style.display = "none";
    saveButton.addEventListener("click", () =>
      saveUserData(
        user.id,
        nameInput.value,
        addressInput.value,
        emailInput.value
      )
    );
    userDiv.appendChild(saveButton);

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Deletar";
    deleteButton.addEventListener("click", () => deleteUser(user.id));
    userDiv.appendChild(deleteButton);

    userListDiv.appendChild(userDiv);
  });
}

// Função para habilitar o modo de edição
function enableEditMode (nameInput, addressInput, emailInput) {
  nameInput.readOnly = false;
  addressInput.readOnly = false;
  emailInput.readOnly = false;

  nameInput.placeholder = "";
  addressInput.placeholder = "";
  emailInput.placeholder = "";

  const editButton = nameInput.parentElement.querySelector(
    "button:nth-of-type(1)"
  );
  editButton.style.display = "none";

  const saveButton = nameInput.parentElement.querySelector(
    "button:nth-of-type(2)"
  );
  saveButton.style.display = "block";
}

// Função para desabilitar o modo de edição
function disableEditMode (nameInput, addressInput, emailInput) {
  nameInput.readOnly = true;
  addressInput.readOnly = true;
  emailInput.readOnly = true;

  nameInput.placeholder = "Nome";
  addressInput.placeholder = "Endereço";
  emailInput.placeholder = "E-mail";

  const editButton = nameInput.parentElement.querySelector(
    "button:nth-of-type(1)"
  );
  editButton.style.display = "block";

  const saveButton = nameInput.parentElement.querySelector(
    "button:nth-of-type(2)"
  );
  saveButton.style.display = "none";
}

// Função para enviar os dados editados de um usuário para a API
function saveUserData (userId, newName, newAddress, newEmail) {
  const userDataToUpdate = {
    id: userId,
    nome: newName,
    endereco: newAddress,
    email: newEmail,
  };
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userDataToUpdate),
  };

  // Envia a requisição PUT para a API para atualizar os dados do usuário no servidor
  fetch(`https://localhost:7060/api/Usuario/${userId}`, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Falha ao atualizar os dados do usuário.");
      }
      console.log("Dados do usuário atualizados com sucesso!");
      // Desabilita o modo de edição após a atualização bem-sucedida
      disableEditMode(
        document.getElementById(`nameInput${userId}`),
        document.getElementById(`addressInput${userId}`),
        document.getElementById(`emailInput${userId}`)
      );
      // Atualiza os dados na página após a atualização bem-sucedida
      getDataFromApi();
    })
    .catch((error) => {
      console.error(
        "Ocorreu um erro ao atualizar os dados do usuário:",
        error
      );
    });
}

// Função para enviar a requisição DELETE para a API e deletar um usuário
function deleteUser (userId) {
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };

  // Envia a requisição DELETE para a API para deletar o usuário no servidor
  fetch(`https://localhost:7060/api/Usuario/${userId}`, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Falha ao deletar o usuário.");
      }
      console.log("Usuário deletado com sucesso!");
      // Atualiza os dados na página após a deleção bem-sucedida
      getDataFromApi();
    })
    .catch((error) => {
      console.error("Ocorreu um erro ao deletar o usuário:", error);
    });
}

// Função para adicionar um novo usuário
function addNewUser () {
  const addUserForm = document.getElementById("addUserForm");
  addUserForm.style.display = "block";
}

// Função para cancelar a adição de um novo usuário
function cancelNewUser () {
  const addUserForm = document.getElementById("addUserForm");
  addUserForm.style.display = "none";
  // Limpa os campos de entrada quando o formulário é cancelado
  document.getElementById("newUserName").value = "";
  document.getElementById("newUserAddress").value = "";
  document.getElementById("newUserEmail").value = "";
}

// Função para enviar os dados de um novo usuário para a API
function submitNewUser () {
  const newName = document.getElementById("newUserName").value;
  const newAddress = document.getElementById("newUserAddress").value;
  const newEmail = document.getElementById("newUserEmail").value;


  if (
    newName.trim() !== "" &&
    newAddress.trim() !== "" &&
    newEmail.trim() !== ""
  ) {
    const userDataToAdd = {
      nome: newName,
      endereco: newAddress,
      email: newEmail,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userDataToAdd),
    };

    // Envia a requisição POST para a API para adicionar o novo usuário no servidor
    fetch("https://localhost:7060/api/Usuario", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Falha ao adicionar o novo usuário.");
        }
        console.log("Novo usuário adicionado com sucesso!");

        getDataFromApi();

        document.getElementById("newUserName").value = "";
        document.getElementById("newUserAddress").value = "";
        document.getElementById("newUserEmail").value = "";

        cancelNewUser();
      })
      .catch((error) => {
        console.error(
          "Ocorreu um erro ao adicionar o novo usuário:",
          error
        );
      });
  } else {
    alert("Preencha todos os campos para adicionar o novo usuário.");
  }
}


document
  .getElementById("addUserButton")
  .addEventListener("click", addNewUser);


document
  .getElementById("cancelNewUser")
  .addEventListener("click", cancelNewUser);


document
  .getElementById("submitNewUser")
  .addEventListener("click", submitNewUser);


getDataFromApi();