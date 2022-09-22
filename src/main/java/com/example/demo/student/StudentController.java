package com.example.demo.student;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;

// all of the resources of the api layer
//the api layer communicates with the service layer, and the service layer to the data layer and then all the way back
@RestController
@RequestMapping(path = "api/v1/student")
public class StudentController {

    // using service layer, creating service obj
    private final StudentService studentService;

    // annotating that everything we pass into it, should be injected to the constructed through service obj
    // then, we have to say Service class has to be a spring bean
    @Autowired
    public StudentController(StudentService studentService){
        this.studentService = studentService;
    }


    //Rest endpoints, the class converted into array of objects
    @GetMapping
    public List<Student> getStudents(){
        return studentService.getStudents();
    }

    @PostMapping
    public void registerNewStudent(@RequestBody Student student){
        studentService.addNewStudent(student);
    }

    @DeleteMapping(path = "{studentId}")
    public void deleteStudent(@PathVariable("studentId")Long studentId){
        studentService.deleteStudent(studentId);
    }

    @PutMapping(path = "{studentId}")
    public void updateStudent(
            @PathVariable("studentId") Long studentId,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String email) {
        studentService.updateStudent(studentId, name, email);
    }
}