USE bamazon;

DROP TABLE if exists products;

CREATE TABLE products(
	item_id int auto_increment,
    product_name varchar(200) not null,
    department_name varchar(200) not null,
    price decimal(10,2) not null,
    stock_quantity int not null,
    primary key(item_id)
);

insert into products(product_name,department_name,price,stock_quantity)
 values ('handbag','clothing',20.00,42),
		('aspirin','medicine',15,100),
        ('lamp','home',150,5),
		('toilet paper','paper',10,400),
        ('carpet','home',50,50),
        ('bedding','home',100,33),
        ('dog food','pets',15,45),
        ('dog toy','pets',5.50,20),
        ('cat costume','pets',9.39,2),
        ('banana','food',1,200);
        
select * from products;




