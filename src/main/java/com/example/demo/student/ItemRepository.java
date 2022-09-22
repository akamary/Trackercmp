package com.example.demo.student;

import org.springframework.data.jpa.repository.JpaRepository;

import java.beans.JavaBean;

public interface ItemRepository extends JpaRepository<Item, Long> {
}
