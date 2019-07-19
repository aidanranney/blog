---
title: "Generating a grid of products with Bootstrap and PHP"
date: "2019-07-12"
---

For an online store front, displaying featured products in a grid provides an attractive way to customize the look and feel of your collections. For this first-year final project [an e-commerce site built from scratch, utilizing a LAMP stack], we displayed our products filtered by category and invited users to explore further details. This included the ability to preview products [music records] in a modal window using a Spotify link. The ability to easily add the product to the shopping cart was also a must.

Bootstrap has an auto-layout feature which paired very nicely with our PHP. Any records of products in the database [MySQL] are looped over and placed into `<div>` elements which Bootstrap formats into rows and columns. We can adjust the number of columns and their sizing with the column `<div>'s` class name:

    // Populate home page with records
    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_array($result)) {
            echo "
                //Small size column, up to four items in the row
                <div class='col-sm-3'>
                    <article class='col-item'>
                        ***Product Goes Here***
                    </article>
                </div>
            ";
        }
    } else {
    echo "No records match that genre";
    }

To illustrate some of what went into an item:

    //Individual product
    <article class='col-item'>
        <div class='albumArtwork'>
            <img src='" . $row['albumArtwork'] . "' 
            alt='Product Image' height=200 width=200>
            <div class='item-buttons'>
                <div class='animated fadeInDown'>
                    *** More Details Button ***

                    *** Add to Cart Button ***
                </div>
            </div>
        </div>

        //Basic information, including price, displayed 
        below the album artwork
        <div class='info'>
            <div class='price-details col-sm-10'>
                <div class='details'>  
                    ". $row['quality'] . "
                </div>
                <div style='font-size:16pt'>
                    " . $row['albumTitle'] . "
                </div>
                <b>" . $row['artist'] . "</b>
                <br>
                <span class='price-new'>
                " . "$" . $row['PRICE'] ."
                </span>
                <br>
                <br>
            </div>
        </div>
    </article>

To check out the full source code, visit the [Github repo](https://github.com/aidanranney/e-commerce-project.git), which also includes the script for our MySQL database.