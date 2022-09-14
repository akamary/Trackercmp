package com.example.demo.student;

import javax.persistence.*;
import java.lang.reflect.Constructor;
import java.time.LocalDate;
import java.time.Period;

//map this student class in my d
@Entity
@Table
public class Student {
    @Id
    @SequenceGenerator(
            name = "student_sequence",
            sequenceName = "student_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "student_sequence"
    )
    private Long id;
    private String name;
    private LocalDate date;
    private String email;

    //Transient-> age will be calculated for us
    @Transient
    private Integer age;

    public Student() {
    }

    public Student(Long id, String name, LocalDate date, String email) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.email = email;
        //this.age = age;
    }

    public Student(String name, LocalDate date, String email) {
        this.name = name;
        this.date = date;
        this.email = email;
        //this.age = age;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getAge() {
        return Period.between(this.date, LocalDate.now()).getYears();
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    @Override
    public String toString() {
        return "Student{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", date=" + date +
                ", email='" + email + '\'' +
                ", age=" + age +
                '}';
    }
}
