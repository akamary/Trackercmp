package com.example.demo.student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;

// all of the resources of the api layer
//the api layer communicates with the service layer, and the service layer to the data layer and then all the way back
@RestController
@RequestMapping(path = "api/v1/student")
public class StudentController {

    private final StudentService studentService;

    @Autowired
    public StudentController(StudentService studentService){
        this.studentService = studentService;
    }

    //Rest endpoints, the class converted into array of objects
    @GetMapping
    public List<Student> getStudents(){
        return studentService.getStudents();
    }
}
