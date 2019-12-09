use bamazon;
create table products(
	productId int auto_increment,
    product_name varchar(100) not null unique,
    department_name varchar(100) not null,
    price decimal(10, 4) not null default 0,
    stock_quantity int not null default 0,
    
    primary key (productId)
);