use citylinks;

insert into cities (name, county) values
    ("Arad", "Arad"),
    ("Timisoara", "Timis"),
    ("Cluj-Napoca", "Cluj"),
    ("Oradea", "Bihor"),
    ("Dej", "Cluj"),
    ("Bucuresti", "Bucuresti");

insert into links (cityId1, cityId2, duration, distance) values 
    (1, 2, 30, 50), 
    (1, 3, 180, 300), 
    (2, 3, 300, 150), 
    (4, 5, 320, 250), 
    (1, 5, 400, 750), 
    (5, 4, 80, 250);