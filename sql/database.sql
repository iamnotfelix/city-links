create database if not exists citylinks;
use citylinks;

drop table if exists Cities;
drop table if exists Links;


create table Cities
(
    id int primary key auto_increment,
    name longtext not null,
    county longtext not null
);

create table Links
(
    id int primary key auto_increment,
    cityId1 int not null,
    cityId2 int not null,
    duration int not null,
    distance int not null
);

alter table Links add foreign key (cityId1) references Cities(id);
alter table Links add foreign key (cityId2) references Cities(id);