package com.kama.scraper.repository;

import com.kama.scraper.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query("FROM User WHERE email=:email")
    User findByEmail(@Param("email") String email);


    Optional<User> findByUsername(String username);

    Long findIdByUsername(String username);

    String findUsernameById(Long uId);
}