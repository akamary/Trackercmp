package com.example.demo.student;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.List;

@Service
public class ItemService {

    private final ItemRepository itemRepository;

    public ItemService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    public List<Item> scrape() {

        final String url = "https://www.ebay.com/sch/i.html?_from=R40&_trksid=p2380057.m570.l1313&_nkw=4k+smart+tv&_sacat=0";
        // itemList - list of Items entity
        List<Item> itemList = new ArrayList<Item>();
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
                Item item = new Item();
                item.setTitle(toSend);
                item.setPrice(priceSend);
                itemList.add(item);
                itemRepository.save(item);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }

        // checking..
        System.out.println(itemList.size());
        return itemList;
    }
}
