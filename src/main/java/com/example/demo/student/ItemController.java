package com.example.demo.student;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class ItemController {

    // using service layer, creating service obj
    //private final ItemService itemService;

    @RequestMapping ("/")
    public static List<String> scrape() {
        final String url = "https://www.ebay.com/sch/i.html?_from=R40&_trksid=p2380057.m570.l1313&_nkw=4k+smart+tv&_sacat=0";
        List<String> titleList = new ArrayList<String>();
        List<String> priceItem = new ArrayList<String>();
        //StringBuilder toSend = new StringBuilder();
        try {
            //loading URL in docu, fetching title and print to the console
            final Document document = Jsoup.connect(url).get();
            //selecting the cssQuery in which the title sits
            Elements liList = document.select("li.s-item.s-item__pl-on-bottom.s-item--watch-at-corner");
            //printing only for checking how many items fetched
            System.out.println(liList.size());
            //iterates over all elements in the list
            for (Element e : liList) {
                Elements t = e.select("div.s-item__title");
                String toSend = t.text();
                titleList.add(toSend);
                System.out.println(t.text());
                Elements p = e.select("span.s-item__price");
                // Elements p = e.select("div.s-item__detail.s-item__detail--primary");
                String priceSend = p.text();
                System.out.println(p.text());
                priceItem.add(priceSend);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        System.out.println(titleList.size());
        return titleList;
    }
}
