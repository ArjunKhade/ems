package com.app.init;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import com.app.dao.RoleRepository;
import com.app.pojos.Role;
import com.app.pojos.UserRole;

@Component
public class RoleInitializer implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepo;

    @Override
    public void run(String... args) {
        if (roleRepo.findByRole(UserRole.ROLE_ADMIN).isEmpty()) {
            roleRepo.save(new Role(UserRole.ROLE_ADMIN));
        }

        if (roleRepo.findByRole(UserRole.ROLE_CUSTOMER).isEmpty()) {
            roleRepo.save(new Role(UserRole.ROLE_CUSTOMER));
        }
    }
}
