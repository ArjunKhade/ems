package com.app.config;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import org.springframework.context.annotation.Configuration;

@OpenAPIDefinition(
    info = @Info(title = "My API", version = "1.0"),
    security = @SecurityRequirement(name = "bearerAuth")
)
@SecurityScheme(
    name = "bearerAuth",
    type = SecuritySchemeType.HTTP,
    bearerFormat = "JWT",
    scheme = "bearer"
)
@Configuration
public class SwaggerConfig {}



//package com.app.config;
//
//import org.springdoc.core.models.GroupedOpenApi;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
//
//@Configuration
//public class SwaggerConfig {
//
//	@Bean
//    public WebSecurityCustomizer webSecurityCustomizer() {
//        return (web) -> web.ignoring()
////        		.requestMatchers("/swagger-ui/**", "/v3/api-docs*/**", "/api/employees",  "/api/employees/**", "/addUser", "/loginUser", "permitAll()");
//          .requestMatchers("/swagger-ui/**", "/v3/api-docs*/**", "/addUser", "/loginUser", "permitAll()");
//    }
//	
//	@Bean
//    public GroupedOpenApi publicApi() {
//        return GroupedOpenApi.builder()
//            .group("public")
//            .pathsToMatch("/**")
//            .build();
//    }
//
//}



//package com.app.config;
//import java.util.List;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//import io.swagger.v3.oas.annotations.OpenAPIDefinition;
//import io.swagger.v3.oas.models.Components;
//import io.swagger.v3.oas.models.OpenAPI;
//import io.swagger.v3.oas.models.info.Info;
//import io.swagger.v3.oas.models.security.SecurityRequirement;
//import io.swagger.v3.oas.models.security.SecurityScheme;
//import io.swagger.v3.oas.models.servers.Server;
//
//@OpenAPIDefinition
//@Configuration
//public class SwaggerConfig  implements WebMvcConfigurer {
//    @Bean
//    public OpenAPI customOpenAPI() {
//        return new OpenAPI()
//                .servers(List.of(
//                                new Server().url("http://localhost:8081/api/v1/").description("Local server")
//                        ))
//                .info(new Info()
//                        .title("API")
//                        .version("1.0")
//                        .description("API documentation"))
//                .components(new Components()
//                        .addSecuritySchemes("bearerAuth",
//                                new SecurityScheme()
//                                        .type(SecurityScheme.Type.HTTP)
//                                        .scheme("bearer")
//                                        .bearerFormat("JWT")))
//                .addSecurityItem(new SecurityRequirement().addList("bearerAuth"));
//    }
//}


//package com.app.config;
//
//import org.springdoc.core.models.GroupedOpenApi;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
//
//@Configuration
//public class SwaggerConfig {
//
//	@Bean
//    public WebSecurityCustomizer webSecurityCustomizer() {
//        return (web) -> web.ignoring()
////        		.requestMatchers("/swagger-ui/**", "/v3/api-docs*/**", "/api/employees",  "/api/employees/**", "/addUser", "/loginUser", "permitAll()");
//          .requestMatchers("/swagger-ui/**", "/v3/api-docs*/**", "/addUser", "/loginUser", "permitAll()");
//    }
//	
//	@Bean
//    public GroupedOpenApi publicApi() {
//        return GroupedOpenApi.builder()
//            .group("public")
//            .pathsToMatch("/**")
//            .build();
//    }
//
//}


