
# Local BookStrore - A Library Management App

This app is not only a management app but also a tool for the users or reader to find books from the library.

This app has two views

    1. User View
    2. Admin View


## User View 
The user view or rather the mobile app. The app is created using React Native. The concept is such that, 
whenever any new user have enrolled to the Library , he/she will be alloted a unique ID, here I have used 
the Adhaar no as the ID and for document verification.

The user can login from the userid and password given by the Library admin staff.

//images of the front page..

Now from the app, he/she can track himself/herself for the book they have taken. 
There are multiple sections in the app Let's see what are those :

User can see what they are currently reading (the book they have issued)

<img src="https://github.com/Logan2406/LocalBookStore/blob/main/BookstorePics/homepage.gif"/>

User can view their read books and also can keep a tarck when they have to given the penalty,
for not submitting the book on time.

They can see all the Authors and the books that are kept in the library.

<img src="https://github.com/Logan2406/LocalBookStore/blob/main/BookstorePics/authors.gif"/>

Another section is there where users can search for their books according to their choices
There are different genres provided and hence user can search through that.

<img src="https://github.com/Logan2406/LocalBookStore/blob/main/BookstorePics/books_home.gif"/>


<img src="https://github.com/Logan2406/LocalBookStore/blob/main/BookstorePics/search_book.gif"/>

On the particular genres there are two language options are given - 

    1. English
    2. Bengali

<img src="https://github.com/Logan2406/LocalBookStore/blob/main/BookstorePics/book_info.gif"/>


The last is the user section. Here user will get the details regarding their address, phone numbers,
past issues and penalties.


<img src="https://github.com/Logan2406/LocalBookStore/blob/main/BookstorePics/profile_home.gif"/>


There is a wishlist section, for the users who want to read the book later on they can put the particular book in wishlist section. 
In the book info page the option is alrady there.


<img src="https://github.com/Logan2406/LocalBookStore/blob/main/BookstorePics/wishlist.gif"/>

User can also provide the reviews that he/she had read. 

<img src="https://github.com/Logan2406/LocalBookStore/blob/main/BookstorePics/my_review.gif">

<img src="https://github.com/Logan2406/LocalBookStore/blob/main/BookstorePics/add_review.gif">




## Admin View 

Admin has the prividges to access the details of the users, create user, edit books add new books
and authors. All the management power is in the hand of the admin

Let's see the sections that are being provided for the Admin

Admin has the authority to see the details of the book, add new books and edit books.

<img src="https://github.com/Logan2406/LocalBookStore/blob/main/BookstorePics/admin_allbooks.gif"/>

<img src="https://github.com/Logan2406/LocalBookStore/blob/main/BookstorePics/admin_bookInfo.gif">

<img src="https://github.com/Logan2406/LocalBookStore/blob/main/BookstorePics/admin_add_book.gif"/>

<img src="https://github.com/Logan2406/LocalBookStore/blob/main/BookstorePics/admin_bookreview.gif"/>


Admin has the authority to see the details of the author, add new author if he has any book in the library 
and edit the details of the author

<img src="https://github.com/Logan2406/LocalBookStore/blob/main/BookstorePics/admin_allauthors.gif"/>

<img src="https://github.com/Logan2406/LocalBookStore/blob/main/BookstorePics/admin_addauthor.JPG"/>




Admin also can edit the details fo the user, create new users

<img src="https://github.com/Logan2406/LocalBookStore/blob/main/BookstorePics/admin_add_user.JPG"/>

<img src="https://github.com/Logan2406/LocalBookStore/blob/main/BookstorePics/admin_all_users.JPG"/>



Only admin has the right to issue and return the book.

<img src="https://github.com/Logan2406/LocalBookStore/blob/main/BookstorePics/admin_issuedbook.JPG"/>

Admin can keep a track on the derfaultis also, and hence they will be applicable for the penalty

<img src="https://github.com/Logan2406/LocalBookStore/blob/main/BookstorePics/admin_bookhistory.gif"/>

Admin can see all reviews given by the users for the books

<img src="https://github.com/Logan2406/LocalBookStore/blob/main/BookstorePics/admin_allreviews.JPG"/>


















## Tech Stack

**Client:** React, React Native, Electron

**Server:** Node, Express

**Database:** MySQL
