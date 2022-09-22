package com.example.demo.student;

import javax.persistence.*;
import java.lang.reflect.Constructor;
import java.time.LocalDate;
import java.time.Period;

//map this student class in my d
@Entity
@Table
public class Item{

    @Id
    @SequenceGenerator(
            name = "title_sequence",
            sequenceName = "title_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "title_sequence"
    )
    private Long id;
    private String title;

    public Item() {
    }

    public Item(Long id, String title) {
        this.id = id;
        this.title = title;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Override
    public String toString() {
        return "Item{" +
                "id=" + id +
                ", title='" + title + '\'' +
                '}';
    }
}