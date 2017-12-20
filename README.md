#Wiki Data Analysis
1. This is a MVC SPA using express and MongoDB to analysis the revisions of Wikipedia
articles using RESTful service.

  | Dependence    |Version  |
  |:---------------:|:-----:|
  | Node.js       | v7.8.0 |
  | npm           | v4.2.0 |
  | MongoDB       | v3.4.9 |

2. A part of the revisons data is store at the ```/revisions``` folder.
3. For other data, this app access the RESTful service of Wiki and change the update,
then download.
4. This app presents the figure of wiki reivision statistic.
## Backgroud
1. There are four types of user to donate the Wiki revisions: admin, bot, regular, and anonymous.
2. The admin names and bot names are store in .txt file.
3. For over all statistics, this app provides:
    ```
     1.The article with the most number of revisions:
         
     2.The article with the least number of revisions:
     
     3.The article edited by largest group of registered users:
     
     4.The article edited by smallest group of registered users:
     
     5.The article with the shortest history:
    
     6.The article with the longest history:
     
     7. A bar chart shows the distribution of 4 types users by year.
     
     8. A pie chart shows the distribution of 4 types users.
     
    ```
<img src="./ReadmeImg/overall-1.bmp" /><br/>
<img src="./ReadmeImg/overall-2.bmp" /><br/>

4. For individual article statistics, this app provides: 
    ```
    1. A search bar to get the title of the article.
    
    2. A select list to show the TOP 5 contribute users of this article.
    
    3. Access the RESTful service of Wiki to update the database.
    
    4. A bar chart shows the distribution of 4 types users by year of this article.
    
    5. A bar chart shows the distribution of selected users by year of this article.
    
    6.  A pie chart shows the distribution of 4 types users of this article.
    ``` 
 <img src="./ReadmeImg/ind-1.bmp" /><br/>
 <img src="./ReadmeImg/ind-2.bmp" /><br/>
 <img src="./ReadmeImg/ind-3.bmp" /><br/>
 
5. Revisions data can be found at: [revisions](https://drive.google.com/open?id=17-KZoFKM1fpWOkLw80NZejn2rXtu3Og_)
     