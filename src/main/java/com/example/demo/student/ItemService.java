package com.example.demo.student;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

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
        //List<String> titleList = new ArrayList<String>();
        //List<String> priceItem = new ArrayList<String>();
        List<Item> itemList = new ArrayList<Item>();
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
                //titleList.add(toSend);
                System.out.println(t.text());
                Elements p = e.select("span.s-item__price");
                // Elements p = e.select("div.s-item__detail.s-item__detail--primary");
                String priceSend = p.text();
                System.out.println(p.text());
                //priceItem.add(priceSend);

                Item item = new Item();
                item.setTitle(toSend);
                item.setPrice(priceSend);
                itemList.add(item);
                itemRepository.save(item);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        /*for (int i=0; i< titleList.size()-1; i++) {
            Item item = new Item();
            item.setTitle(titleList.toString());
            item.setPrice(priceItem.toString());
            itemList.add(item);

        }*/
        System.out.println(itemList.size());
        return itemList;
        //return List.of(titleList,priceItem);

    }
}
