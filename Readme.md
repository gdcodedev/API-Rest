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

![image](https://github.com/gdcodedev/API-Rest/assets/65917790/b28e6f39-bff6-4fe3-804d-c83b0b7ce6bf)



# Frontend 

---

* [X] Adicionado botão adicionar novo usuário
* [X] Adicionado o botão editar usuário
* [X] Listagem de todos os usuários e seus referentes endereços na tela.
* [X] Exclusão de usuário
* [X] Adicionado autorization do Cors no banckend
![image](https://github.com/gdcodedev/API-Rest/assets/65917790/9a54fcc4-319a-4ba6-ab3c-7119e3b2881a)

