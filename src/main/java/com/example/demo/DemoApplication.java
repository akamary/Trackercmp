package com.example.demo;

//import com.example.demo.student.Student;

import com.example.demo.domain.Product;
import com.example.demo.domain.Role;
import com.example.demo.domain.User;
import com.example.demo.service.IRoleService;
import com.example.demo.service.IService;
import com.example.demo.utils.ConstantUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.ArrayList;
import java.util.List;


@SpringBootApplication

public class DemoApplication implements CommandLineRunner {

	@Autowired
	private IService<User> userService;

	@Autowired
	private IRoleService<Role> roleService;

	@Autowired
	private IService<Product> productService;

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		if (roleService.findAll().isEmpty()) {
			roleService.saveOrUpdate(new Role(ConstantUtils.ADMIN.toString()));
			roleService.saveOrUpdate(new Role(ConstantUtils.USER.toString()));
		}

		if (userService.findAll().isEmpty()) {
			User user1 = new User();
			user1.setEmail("test@user.com");
			user1.setFullname("aviv kamary");
			user1.setUserame("aviv");

			user1.setRole(roleService.findByName(ConstantUtils.USER.toString()));
			user1.setPassword(new BCryptPasswordEncoder().encode("123456"));
			userService.saveOrUpdate(user1);

			User user2 = new User();
			user2.setEmail("test@admin.com");
			user2.setUserame("test");
			user2.setFullname("aviv kamary");
			user2.setRole(roleService.findByName(ConstantUtils.ADMIN.toString()));
			user2.setPassword(new BCryptPasswordEncoder().encode("123456"));
			userService.saveOrUpdate(user2);
		}


			final String url = "https://www.ebay.com/sch/i.html?_from=R40&_trksid=p2380057.m570.l1313&_nkw=4k+smart+tv&_sacat=0";
			// itemList - list of Items entity
			List<Product> productList = new ArrayList<Product>();
			// StringBuilder toSend = new StringBuilder();
			try {
				// loading URL in docu, fetching title and print to the console
				final Document document = Jsoup.connect(url).get();
				// selecting the cssQuery in which the title sits
				Elements liList = document.select("li.s-item.s-item__pl-on-bottom.s-item--watch-at-corner");
				// printing only for checking how many items fetched
				System.out.println(liList.size());

				// iterates over all elements in the list
				for (Element e : liList) {
					Elements t = e.select("div.s-item__title");
					String toSend = t.text();
					System.out.println(t.text());
					// taking the next elem
					Elements p = e.select("span.s-item__price");
					String priceSend = p.text();
					System.out.println(p.text());

					// creating a new item every iteration and saving
					Product product = new Product();
					product.setName(toSend);
					product.setPrice(priceSend);
					productList.add(product);
					productService.saveOrUpdate(product);
				}
			} catch (Exception ex) {
				ex.printStackTrace();
			}

		}
	}


