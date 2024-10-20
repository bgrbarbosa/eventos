package br.com.bgrbarbosa.eventos.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableResourceServer
public class ResourceServerConfig extends ResourceServerConfigurerAdapter {

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                // Permitir POST e PUT em /convidado
                .antMatchers(HttpMethod.GET, "/convidado").permitAll()
                .antMatchers(HttpMethod.GET, "/convidado/{id}").permitAll()
                .antMatchers(HttpMethod.GET, "/convidado/cpf/{cpf}").permitAll()
                .antMatchers(HttpMethod.POST, "/convidado").permitAll()
                .antMatchers(HttpMethod.PUT, "/convidado").permitAll()
                .antMatchers(HttpMethod.DELETE, "/convidado/{id}").authenticated()

                // Permitir GET em /evento
                .antMatchers(HttpMethod.GET, "/evento").permitAll()
                .antMatchers(HttpMethod.GET, "/evento/{id}").permitAll()
                .antMatchers(HttpMethod.POST, "/evento").authenticated()
                .antMatchers(HttpMethod.PUT, "/evento").authenticated()
                .antMatchers(HttpMethod.DELETE, "/evento/{id}").authenticated()

                // Permitir GET em /user
                .antMatchers(HttpMethod.GET, "/user").authenticated()
                .antMatchers(HttpMethod.GET, "/user/{id}").authenticated()
                .antMatchers(HttpMethod.POST, "/user").authenticated()
                .antMatchers(HttpMethod.PUT, "/user").authenticated()
                .antMatchers(HttpMethod.DELETE, "/user/{id}").authenticated()

                // Permitir urls em /oauth/token
                .antMatchers(HttpMethod.POST, "/oauth/token").permitAll()

                // Negar qualquer outra solicitação
                .anyRequest().denyAll();
    }
}
