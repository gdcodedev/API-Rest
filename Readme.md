# Sistema Valide API C# Dotnet 6.0

# Packegs

- Microsoft EntityFreameworkCore 6.0
- Microsoft EntityFrameworkCore Design 6.0
- Iniciar a Migration depois utilizar o Update-Database -Context SistemaTarefasDBContext para a criação do banco de dados.
- CORS habilitado para requisição

  ```
              app.UseCors(c =>
              {
                  c.AllowAnyHeader();
                  c.AllowAnyMethod();
                  c.AllowAnyOrigin();
              });
  ```

![1689815977415](image/Readme/1689815977415.png)


# Frontend 

---

* [X] Adicionado botão adicionar novo usuário
* [X] Adicionado o botão editar usuário
* [X] Listagem de todos os usuários e seus referentes endereços na tela.
* [X] Exclusão de usuário
* [X] Adicionado autorization do Cors no banckend

![1689815942977](image/Readme/1689815942977.png)
