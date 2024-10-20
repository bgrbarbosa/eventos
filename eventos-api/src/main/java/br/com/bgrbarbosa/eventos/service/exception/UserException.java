package br.com.bgrbarbosa.eventos.service.exception;

public class UserException extends RuntimeException {

    public UserException(String login ){
        super("Usuário já cadastrado para o login " + login);
    }
}
