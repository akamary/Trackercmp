package com.example.demo.student;


import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;

@Configuration
public class StudentConfig {

    @Bean
    CommandLineRunner commandLineRunner(StudentRepository repository) {
        return args -> {
                    Student vladi = new Student(
                            "Vladi",
                            LocalDate.of(2000, Month.JANUARY, 5),
                            "vladibel@gmail.com"
            );
            Student aviv = new Student(
                    "Aviv",
                    LocalDate.of(1994, Month.NOVEMBER, 26),
                    "kamaryaviv@gmail.com"
            );

            //invoke my repo
            repository.saveAll(
                    List.of(vladi, aviv)
            );
        };
    }
}
