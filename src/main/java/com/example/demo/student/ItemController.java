package com.example.demo.student;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api/v1/item")
public class ItemController {

    // using service layer, creating service obj
    //private final ItemService itemService;

    @RequestMapping("/")
    public static String scrape() {
        final String url = "https://www.ebay.com/sch/i.html?_from=R40&_trksid=p2380057.m570.l1313&_nkw=4k+smart+tv&_sacat=0";
        StringBuilder toSend = new StringBuilder();
        try {
            //loading URL in docu, fetching title and print to the console
            final Document document = Jsoup.connect(url).get();
            Elements liList = document.select("li.s-item.s-item__pl-on-bottom.s-item--watch-at-corner");
            for (Element e : liList) {
                Elements title = e.select("div.s-item__title");

                System.out.println(title.text());
            }


        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return "";
    }
}
